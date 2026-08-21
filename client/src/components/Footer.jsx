import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="status-bar-container">
        
        {/* Status Chip */}
        <div className="status-chip">
          <span className="status-dot"></span>
          <span className="status-text">available for work</span>
        </div>

        {/* Center Brand / Copyright */}
        <div className="status-center">
          <span className="status-item">Arya A. Sutar</span>
          <span className="status-divider">|</span>
          <span className="status-item">B.Tech Computer Science Engineering</span>
          <span className="status-divider">|</span>
          <span className="status-item">&copy; {currentYear} All rights reserved</span>
        </div>

        {/* Right Quick Links */}
        <div className="status-links">
          <a href="https://github.com/Arya99-as" target="_blank" rel="noopener noreferrer" className="status-link">GH</a>
          <a href="https://www.linkedin.com/in/arya-sutar-6244942b1" target="_blank" rel="noopener noreferrer" className="status-link">IN</a>
          <a href="mailto:sutararya.6336@gmail.com" className="status-link">EM</a>
        </div>

      </div>
    </footer>
  );
}
