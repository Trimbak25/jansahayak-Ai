import React from 'react';
import { User, ShieldCheck, Volume2 } from 'lucide-react';

const ChatBubble = ({ message, onSpeak }) => {
  const isUser = message.sender === 'user';
  return (
    <div className={`chat-bubble-row ${isUser ? 'chat-bubble-row--user' : 'chat-bubble-row--assistant'}`}>
      {!isUser && (
        <div className="avatar avatar--assistant" aria-label="JanSahayak AI">
          <ShieldCheck className="avatar-icon" />
        </div>
      )}
      <div className={`bubble ${isUser ? 'bubble--user' : 'bubble--assistant'}`}>
        {message.isTyping ? (
          <div className="typing-indicator" aria-label="Thinking">
            <span /><span /><span />
          </div>
        ) : (
          <>
            <p className="bubble-text">{message.text}</p>
            {!isUser && onSpeak && (
              <button className="speak-btn" onClick={() => onSpeak(message.text)} aria-label="Read aloud">
                <Volume2 size={12} /> <span>Listen</span>
              </button>
            )}
          </>
        )}
      </div>
      {isUser && (
        <div className="avatar avatar--user" aria-label="You">
          <User className="avatar-icon" />
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
