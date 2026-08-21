import React, { useEffect } from 'react';

export function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const resumePdfPath = '/assets/resume/Arya_Sutar_Resume.pdf';

  return (
    <div
      className={`resume-modal-backdrop ${isOpen ? 'open' : ''}`}
      id="resume-modal-backdrop"
      aria-hidden={!isOpen}
      role="dialog"
      aria-label="Resume Preview Modal"
      onClick={handleBackdropClick}
    >
      <div className="resume-modal-card" id="resume-modal-card">
        <div className="resume-modal-header">
          <div className="window-dots">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>
          <span className="file-name">resume.pdf</span>
          <div className="resume-modal-actions">
            <a
              href={resumePdfPath}
              className="btn-modal-action"
              download="Arya_Sutar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span>Download</span>
            </a>
            <button className="btn-modal-close" id="resume-close-btn" aria-label="Close resume preview" onClick={onClose}>
              &times;
            </button>
          </div>
        </div>
        <div className="resume-modal-body">
          <iframe className="resume-iframe" src={resumePdfPath} title="Arya A. Sutar Resume Preview">
            <div className="resume-fallback">
              <p>Your browser can't preview this file — use the Download button below instead.</p>
              <a href={resumePdfPath} className="btn btn-primary" download="Arya_Sutar_Resume.pdf" target="_blank" rel="noopener noreferrer">
                <span>Download Resume PDF</span>
              </a>
            </div>
          </iframe>
        </div>
      </div>
    </div>
  );
}
