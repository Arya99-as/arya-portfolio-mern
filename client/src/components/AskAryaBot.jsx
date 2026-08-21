import React, { useState, useEffect, useRef } from 'react';
import { botKnowledgeBase } from '../data/botKnowledgeBase';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';

const quickChips = [
  { label: 'Skills', prompt: "Tell me about Arya's skills" },
  { label: 'Projects', prompt: 'What projects has Arya built?' },
  { label: 'Experience', prompt: "What is Arya's experience?" },
  { label: 'Positions', prompt: 'What leadership roles does he hold?' },
  { label: 'Contact', prompt: 'How can I contact Arya?' }
];

export function AskAryaBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! I am ask-arya.sh, Arya's MERN portfolio terminal assistant.\nType a question or pick a chip below to learn about skills, MERN projects, experience, or contact details!"
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const chatBodyRef = useRef(null);
  const { isMuted, isSpeaking, speak, toggleMute } = useSpeechSynthesis();

  const toggleChat = () => setIsOpen((prev) => !prev);
  const closeChat = () => setIsOpen(false);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const handleQuery = (queryText) => {
    if (!queryText.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: queryText
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');

    const queryLower = queryText.toLowerCase();
    let matchedItem = null;
    let maxMatchCount = 0;

    botKnowledgeBase.forEach((item) => {
      let count = 0;
      item.keywords.forEach((kw) => {
        if (queryLower.includes(kw)) count++;
      });
      if (count > maxMatchCount) {
        maxMatchCount = count;
        matchedItem = item;
      }
    });

    setTimeout(() => {
      let botMsgText = '';
      let actionText = null;
      let actionTarget = null;

      if (matchedItem && maxMatchCount > 0) {
        botMsgText = matchedItem.reply;
        actionText = matchedItem.actionText;
        actionTarget = matchedItem.actionTarget;
      } else {
        botMsgText = "I don't have exact details on that prompt. You can ask about Arya's skills, MERN projects, experience, positions of responsibility, education, awards, or contact information!";
      }

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botMsgText,
        actionText,
        actionTarget
      };

      setMessages((prev) => [...prev, botMsg]);
      speak(botMsgText);
    }, 400);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleQuery(inputVal);
  };

  return (
    <>
      <button
        className="chat-widget-toggle"
        id="chat-widget-toggle"
        aria-label="Open ask-arya.sh AI assistant chatbot"
        aria-expanded={isOpen}
        aria-controls="chat-widget-panel"
        onClick={toggleChat}
      >
        <span className="chat-toggle-icon">⚡</span>
        <span className="chat-toggle-text">ask-arya.sh</span>
      </button>

      <div className={`chat-widget-panel ${isOpen ? 'open' : ''}`} id="chat-widget-panel" role="dialog" aria-label="ask-arya.sh Terminal Assistant">
        <div className="chat-header">
          <div className="chat-header-left">
            <div className="window-dots">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <span className="chat-title">ask-arya.sh</span>
            {isSpeaking && (
              <span className="speaking-indicator" id="speaking-indicator" style={{ display: 'flex' }}>
                <span>🔊</span> <span>Speaking...</span>
              </span>
            )}
          </div>
          <div className="chat-controls">
            <button className="chat-btn-icon" id="chat-voice-toggle" aria-label="Toggle voice output" onClick={toggleMute}>
              {isMuted ? '🔇' : '🔊'}
            </button>
            <button className="chat-btn-icon" id="chat-close-btn" aria-label="Close assistant panel" onClick={closeChat}>
              &times;
            </button>
          </div>
        </div>

        <div className="chat-body" id="chat-messages" ref={chatBodyRef}>
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-msg ${msg.sender === 'user' ? 'user-msg' : 'bot-msg'}`}>
              {msg.sender === 'user' ? (
                <span>
                  <span className="msg-prompt">$</span> {msg.text}
                </span>
              ) : (
                <div>
                  <span className="msg-prompt-bot">[ask-arya.sh]</span>
                  <div className="bot-msg-text">{msg.text}</div>
                  {msg.actionTarget && (
                    <div className="bot-action-wrapper">
                      <a href={msg.actionTarget} className="bot-action-btn" onClick={closeChat}>
                        <span>{msg.actionText || 'Jump to section →'}</span>
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="chat-quick-chips">
          {quickChips.map((chip) => (
            <button key={chip.label} className="chip-btn" onClick={() => handleQuery(chip.prompt)}>
              {chip.label}
            </button>
          ))}
        </div>

        <div className="chat-input-area">
          <form className="chat-input-form" id="chat-form" onSubmit={handleFormSubmit}>
            <span className="chat-prompt-prefix">$</span>
            <input
              type="text"
              className="chat-input"
              id="chat-input"
              placeholder="Type a question (e.g. skills, projects)..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              autoComplete="off"
            />
            <button type="submit" className="chat-submit-btn" aria-label="Send query">↵</button>
          </form>
        </div>
      </div>
    </>
  );
}
