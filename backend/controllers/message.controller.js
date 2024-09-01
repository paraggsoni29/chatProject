import mongoose from 'mongoose';
import Conversation from '../models/converstationModel.js';
import Message from '../models/message.model.js';
import { populate } from 'dotenv';
import { getReceiverSocketId } from '../socket/socket.js';
import { io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params; // Extract receiverId from URL parameters
    const senderId = req.user._id; // Get senderId from authenticated user

    // Validate the receiverId
    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ error: 'Invalid receiver ID format' });
    }

    // Convert senderId and receiverId to ObjectId
    const senderObjectId = new mongoose.Types.ObjectId(senderId);
    const receiverObjectId = new mongoose.Types.ObjectId(receiverId);

    // Check if a conversation between the two users exists
    let conversation = await Conversation.findOne({
      participants: { $all: [senderObjectId, receiverObjectId] }
    });

    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderObjectId, receiverObjectId]
      });
    }

    // Create the new message
    const newMessage = new Message({
      senderId: senderObjectId,
      receiverId: receiverObjectId,
      message,
    });

    // Save the message and add its reference to the conversation
    conversation.messages.push(newMessage._id);

    // Save both the conversation and the new message in parallel
    await Promise.all([conversation.save(), newMessage.save()]);
     
   //socket io functionality  will go here
    const receiverSocketId = getReceiverSocketId(receiverId);
     if(receiverSocketId){
      //io.to(socket_id) .emit() used to send events to specific client 
      io.to(receiverSocketId).emit("newMessage",newMessage)
     }
  


    // Respond with the new message
    res.status(201).json(newMessage);

  } catch (error) {
    console.error("Error in sendMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req,res) =>{
try {
  

  const{id:userToChatId} = req.params
  const senderId = req.user._id;

  const conversation = await Conversation.findOne({
    participants:{$all :[senderId,userToChatId]}
  }).populate("messages");//NOT REFFRENCE BUT ACTUAL MESSAGES 

  if(!conversation) return res.status(200).json([]);

  const messages = conversation.messages;

  res.status(200).json(conversation.messages)

} catch (error) {
  console.error("Error in getMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
}

}