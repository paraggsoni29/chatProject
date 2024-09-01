import React, { useEffect } from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import { TiMessages } from 'react-icons/ti';
import useConversation from '/src/zustand/useConversation';
import { useAuthContext } from '../../../context/AuthContext';

const MessageContainer = () => {
  // const noChatSelected = true; // This controls whether a chat is selected or not
  const {selectedConversation ,setSelectedConversation}=useConversation()

  useEffect(() => {

  return () => setSelectedConversation(null);
  },[setSelectedConversation])

  return (
    <div className="md:min-w-[450px] flex flex-col h-full">
      {!selectedConversation ? (
        <NoChatSelected /> // Render the "NoChatSelected" component if no chat is selected
      ) : (
        <>
          {/* Header */}
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To</span>{' '}
            <span className="text-gray-900 font-bold">{selectedConversation.fullName}</span>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-auto">
            <Messages />
          </div>

          {/* Message Input */}
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

// The NoChatSelected component
const NoChatSelected = () => {
  const {authUser} = useAuthContext()
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 🙂 {authUser.fullName}  </p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
