import React from 'react';
import Conversation from './Conversation'; // Correct component name
import useGetConversations from '../../hooks/useGetConversations';
import { getRandomEmoji } from '../../../utils/emoji';

const Conversations = () => { // Fixed typo in component name
  const { loading, conversations } = useGetConversations();

  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {conversations.map((conversation, idx) => ( // Fixed typo in variable name
        <Conversation // Corrected component name
          key={conversation._id}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
          conversation={conversation} // Added missing prop
        />
      ))}
      {loading && <span className='loading loading-spinner mx-auto'></span>} {/* Moved loading state to the end */}
    </div>
  );
}

export default Conversations; // Fixed typo in component name
