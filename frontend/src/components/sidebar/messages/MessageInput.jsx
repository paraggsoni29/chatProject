import React, { useState } from 'react';
import { BsSend } from 'react-icons/bs';
import useSendMessage from '../../../hooks/useSendMessage';

const MessageInput = () => {
  const [message, setMessage] = useState('');
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!message.trim()) return; // Prevent sending empty messages

    await sendMessage(message);
    setMessage(''); // Clear the input field after sending the message
  };

  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
      <div className='w-full relative'>
        <input
          type='text'
          className='border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white'
          placeholder='Send a message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading} // Disable input while loading
        />
        <button
          type='submit'
          className='absolute inset-y-3 end-0 flex item-center pe-3.5 text-white'
          disabled={loading} // Disable button while loading
        >
          {loading ? <div className='loading loading-spinner'></div> : <BsSend />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
