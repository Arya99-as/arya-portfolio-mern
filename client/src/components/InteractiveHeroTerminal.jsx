import React, { useState, useEffect, useRef } from 'react';

const initialOutput = [
  { type: 'cmd', text: 'aryasutar@portfolio:~$ ./initialize_profile' },
  { type: 'info', text: 'Initializing Arya A. Sutar...' },
  { type: 'success', text: '[OK] Software Engineer' },
  { type: 'success', text: '[OK] B.Tech Computer Science Engineering' },
  { type: 'success', text: '[OK] Full-Stack Development' },
  { type: 'success', text: '[OK] AI / Computer Vision' },
  { type: 'success', text: '[OK] Cybersecurity' },
  { type: 'success', text: '[OK] Technical Leadership' },
  { type: 'cmd', text: 'system.status()' },
  { type: 'status', text: 'SYSTEM STATUS: ONLINE' },
  { type: 'status', text: 'SECURITY STATUS: ACTIVE' },
  { type: 'status', text: 'NETWORK STATUS: SECURE' },
  { type: 'cmd', text: 'about --user' },
  { type: 'text', text: 'Arya A. Sutar is a Computer Science Engineering student focused on building full-stack platforms, applying computer vision models, and creating practical AI-powered systems.' },
  { type: 'cmd', text: 'skills --list' },
  { type: 'list', text: 'Python\nJava\nC++\nReact\nJavaScript\nAI / ML\nComputer Vision\nCybersecurity\nFull-Stack Development' }
];

export function InteractiveHeroTerminal({ isOpen, onClose }) {
  const [displayedLogs, setDisplayedLogs] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  // Trigger typing initialization sequence when terminal opens
  useEffect(() => {
    if (!isOpen) return;

    let isCancelled = false;
    setDisplayedLogs([]);
    setIsTyping(true);

    const typeLogs = async () => {
      for (let i = 0; i < initialOutput.length; i++) {
        if (isCancelled) break;
        await new Promise((res) => setTimeout(res, i === 0 ? 150 : 80));
        if (isCancelled) break;
        setDisplayedLogs((prev) => [...prev, initialOutput[i]]);
      }
      if (!isCancelled) {
        setIsTyping(false);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    };

    typeLogs();

    return () => {
      isCancelled = true;
    };
  }, [isOpen]);

  // Auto-scroll terminal to bottom as new content prints
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [displayedLogs, isTyping]);

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = inputValue.trim();
    if (!cmd) return;

    // Add command to history
    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    const userLine = { type: 'user-cmd', text: `> ${cmd}` };
    let responseLines = [];

    const lower = cmd.toLowerCase();

    switch (lower) {
      case 'help':
        responseLines = [
          { type: 'info', text: 'Available commands:' },
          { type: 'list', text: '  about      - Display background & bio summary\n  skills     - List technical skills & tech stack\n  projects   - Show compact list of featured projects\n  contact    - Display email & social links\n  clear      - Clear terminal screen' }
        ];
        break;

      case 'about':
        responseLines = [
          { type: 'text', text: 'Arya A. Sutar is a B.Tech Computer Science Engineering student (2023–2027) focused on building full-stack web platforms, applying computer vision models, and creating practical AI-powered systems.' }
        ];
        break;

      case 'skills':
        responseLines = [
          { type: 'info', text: 'Technical Skills & Focus Areas:' },
          { type: 'list', text: 'Python • Java • C++ • React • JavaScript • Node.js • Express • MongoDB\nAI / ML • Computer Vision (OpenCV/YOLO) • OCR • Cybersecurity • Full-Stack Dev' }
        ];
        break;

      case 'projects':
        responseLines = [
          { type: 'info', text: 'Featured Projects:' },
          { type: 'list', text: '1. STUDY BUDDY - Student Notes Sharing Platform [React/Tailwind/Supabase]\n2. AI CCTV - Intelligent Computer Vision Surveillance [Python/YOLO/Flask]\n3. SOCIALFORGE - AI Instagram Content Intelligence [React/AI/Analytics]\n4. GST DOCTOR AI PRO - AI Invoice OCR Validation [Python/Computer Vision]\n5. SMART COLLEGE BUS SYSTEM - Real-Time GPS Tracking [IoT/Web Dev]\n6. CARBONX AI - Carbon Emissions & Sustainability Analytics [AI/Data Science]' }
        ];
        break;

      case 'contact':
        responseLines = [
          { type: 'info', text: 'Contact & Links:' },
          { type: 'list', text: 'Email: sutararya.6336@gmail.com\nGitHub: https://github.com/Arya99-as\nLinkedIn: https://linkedin.com/in/arya-sutar-6244942b1\nInstagram: @aryasutar_' }
        ];
        break;

      case 'clear':
        setDisplayedLogs([]);
        setInputValue('');
        return;

      default:
        responseLines = [
          { type: 'error', text: `Command not found: "${cmd}". Type "help" to see available commands.` }
        ];
        break;
    }

    setDisplayedLogs((prev) => [...prev, userLine, ...responseLines]);
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputValue(history[nextIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInputValue('');
      } else {
        setHistoryIndex(nextIndex);
        setInputValue(history[nextIndex] || '');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="futuristic-terminal-window open">
      <div className="terminal-top-bar">
        <div className="window-dots">
          <span className="dot dot-red" onClick={onClose} title="Close Terminal"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
        </div>
        <div className="terminal-title">profile_terminal.sh — aryasutar@portfolio</div>
        <button className="terminal-close-btn" onClick={onClose} aria-label="Close Terminal" title="Close Terminal">
          &times;
        </button>
      </div>

      <div className="terminal-content-body" ref={terminalBodyRef} onClick={() => inputRef.current?.focus()}>
        {displayedLogs.map((log, idx) => {
          if (log.type === 'cmd') {
            return (
              <div key={idx} className="term-line cmd-line">
                <span className="cmd-prompt">&gt;</span> <span className="cmd-text">{log.text}</span>
              </div>
            );
          }
          if (log.type === 'user-cmd') {
            return (
              <div key={idx} className="term-line user-cmd-line">
                <span className="cmd-text text-cyan">{log.text}</span>
              </div>
            );
          }
          if (log.type === 'success') {
            return (
              <div key={idx} className="term-output text-success">
                {log.text}
              </div>
            );
          }
          if (log.type === 'status') {
            return (
              <div key={idx} className="term-output text-yellow">
                {log.text}
              </div>
            );
          }
          if (log.type === 'info') {
            return (
              <div key={idx} className="term-output text-cyan">
                {log.text}
              </div>
            );
          }
          if (log.type === 'error') {
            return (
              <div key={idx} className="term-output text-error">
                {log.text}
              </div>
            );
          }
          if (log.type === 'list') {
            return (
              <pre key={idx} className="term-output text-list">
                {log.text}
              </pre>
            );
          }
          return (
            <div key={idx} className="term-output text-plain">
              {log.text}
            </div>
          );
        })}

        {!isTyping && (
          <form onSubmit={handleCommandSubmit} className="terminal-input-form">
            <span className="input-prompt">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              className="terminal-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type help, skills, projects, contact, clear..."
              autoFocus
              spellCheck="false"
              autoComplete="off"
            />
          </form>
        )}

        {isTyping && (
          <div className="terminal-typing-cursor">
            <span className="cursor-blink cyan-cursor">_</span>
          </div>
        )}
      </div>
    </div>
  );
}
