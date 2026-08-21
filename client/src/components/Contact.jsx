import React, { useState } from 'react';
import { submitContactForm } from '../services/api';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ message: '', type: '' });
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText('sutararya.6336@gmail.com');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatus({ message: 'Please fill in all fields before sending.', type: 'error' });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email.trim())) {
      setStatus({ message: 'Please enter a valid email address.', type: 'error' });
      return;
    }

    try {
      setLoading(true);
      setStatus({ message: '', type: '' });
      const res = await submitContactForm(formData);
      setStatus({ message: res.message || 'Message sent successfully!', type: 'success' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.warn('Contact API submission error:', err);
      setStatus({ message: err.message || 'Unable to send message. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setStatus({ message: '', type: '' });
      }, 6000);
    }
  };

  return (
    <section className="contact-section section-padding alt-bg" id="contact">
      <div className="container">
        
        <div className="section-eyebrow">/* contact.sh (Submits to Express API &amp; MongoDB) */</div>
        <h2 className="section-title">Get In Touch</h2>
        <p className="section-subtitle">Interested in placement opportunities, internships, or technical collaborations? Drop a message below!</p>

        <div className="contact-grid">
          
          {/* Contact Form (Left) */}
          <div className="contact-form-card scroll-reveal">
            <div className="code-window-header">
              <div className="window-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <span className="file-name">send_message.sh</span>
            </div>

            <form className="contact-form" id="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="name" className="form-label">$ NAME</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  placeholder="e.g. Recruiter / Collaborator"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">$ EMAIL</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="e.g. email@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">$ SUBJECT</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-input"
                  placeholder="e.g. Software Placement / Internship Offer"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">$ MESSAGE</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-input form-textarea"
                  rows="4"
                  placeholder="Type your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-submit" disabled={loading}>
                <span>{loading ? 'Sending...' : 'Send Message'}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>

              {/* Status Feedback Banner */}
              {status.message && (
                <div className={`form-status ${status.type}`} style={{ display: 'block' }}>
                  {status.message}
                </div>
              )}
            </form>
          </div>

          {/* Reach Me Info Card (Right) */}
          <div className="reach-me-card scroll-reveal delay-1">
            <div className="reach-header">
              <span className="reach-icon">📡</span>
              <h3 className="reach-title">reach.me</h3>
            </div>
            
            <p className="reach-text">
              I am actively seeking full-time placement and internship positions. Contact me via email or social handles:
            </p>

            <div className="contact-details-list">

              <div className="contact-detail-item">
                <span className="detail-icon">✉️</span>
                <div className="detail-content">
                  <span className="detail-label">Email</span>
                  <a href="mailto:sutararya.6336@gmail.com" className="detail-link">sutararya.6336@gmail.com</a>
                </div>
              </div>

              <div className="contact-detail-item">
                <span className="detail-icon">🐙</span>
                <div className="detail-content">
                  <span className="detail-label">GitHub</span>
                  <a href="https://github.com/Arya99-as" target="_blank" rel="noopener noreferrer" className="detail-link">github.com/Arya99-as</a>
                </div>
              </div>

              <div className="contact-detail-item">
                <span className="detail-icon">💼</span>
                <div className="detail-content">
                  <span className="detail-label">LinkedIn</span>
                  <a href="https://www.linkedin.com/in/arya-sutar-6244942b1" target="_blank" rel="noopener noreferrer" className="detail-link">linkedin.com/in/arya-sutar-6244942b1</a>
                </div>
              </div>

              <div className="contact-detail-item">
                <span className="detail-icon">📸</span>
                <div className="detail-content">
                  <span className="detail-label">Instagram</span>
                  <a href="https://www.instagram.com/aryasutar_" target="_blank" rel="noopener noreferrer" className="detail-link">instagram.com/aryasutar_</a>
                </div>
              </div>

            </div>

            {/* Direct Email Section */}
            <div className="direct-email-card">
              <div className="direct-email-header">
                <span className="direct-email-badge-icon">✉️</span>
                <div>
                  <h4 className="direct-email-title">Direct Email</h4>
                  <p className="direct-email-subtitle">Have a question or opportunity? Send me an email directly.</p>
                </div>
              </div>

              <div className="direct-email-actions">
                <a
                  href="mailto:sutararya.6336@gmail.com"
                  className="direct-email-btn"
                  title="Open default email application"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>sutararya.6336@gmail.com</span>
                </a>

                <button
                  type="button"
                  className={`copy-email-btn ${copied ? 'copied' : ''}`}
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>Email copied!</span>
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="availability-notice">
              <span className="pulse-dot"></span>
              <span>Available for immediate placement interviews &amp; internships.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
