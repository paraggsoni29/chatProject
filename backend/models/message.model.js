import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId, // Correct reference to ObjectId
        ref: 'User',
        required: true
    },
    receiverId: { // Fixed typo from 'reciverId' to 'receiverId'
        type: mongoose.Schema.Types.ObjectId, // Correct reference to ObjectId
        ref: 'User',
        required: true
    },
    message: {
        type: String, 
        required: true
    },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const Message = mongoose.model("Message", messageSchema);

export default Message;


