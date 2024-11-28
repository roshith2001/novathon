import React, { useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';

const ChatField = ({ message }) => {
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <div>
        <ChatBubble key={message.id} message={message} />
      <div ref={chatBottomRef} />
    </div>
  );
};

export default ChatField;
