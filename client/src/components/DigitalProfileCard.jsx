import React, { useState, useEffect, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { profileConfig } from '../data/profileConfig';

export function DigitalProfileCard() {
  const [profileUrl, setProfileUrl] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const qrRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href.split('#')[0];
      setProfileUrl(currentUrl);
    }
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // 1. vCard / .vcf Generator & Downloader
  const handleSaveContact = () => {
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${profileConfig.name}`,
      `N:${profileConfig.name.split(' ').pop() || 'Kaingade'};${profileConfig.name.split(' ')[1] || 'Makrand'};;;`,
      `ORG:${profileConfig.organization}`,
      `TITLE:${profileConfig.designation}`,
      profileConfig.contact.phone ? `TEL;TYPE=CELL:${profileConfig.contact.phone}` : '',
      profileConfig.contact.email ? `EMAIL;TYPE=INTERNET:${profileConfig.contact.email}` : '',
      `NOTE:${profileConfig.bio} ${profileConfig.dypcet.estInfo}`,
      `URL:${profileConfig.socials.linkedin || profileUrl}`,
      'END:VCARD'
    ].filter(Boolean).join('\r\n');

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', profileConfig.assets.vcardFilename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    triggerToast('✓ Contact file (.vcf) downloaded!');
  };

  // 2. Download QR Code as Image
  const handleDownloadQR = () => {
    if (!qrRef.current) return;
    const canvas = qrRef.current.querySelector('canvas');
    if (!canvas) return;

    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = profileConfig.assets.qrFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    triggerToast('✓ QR Code downloaded!');
  };

  // 3. Share Profile (Web Share API with Copy Link Fallback)
  const handleShareProfile = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profileConfig.name} - ${profileConfig.designation}`,
          text: profileConfig.bio,
          url: profileUrl
        });
        triggerToast('✓ Shared successfully!');
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  };

  // 4. Copy Profile Link
  const copyToClipboard = () => {
    if (navigator.clipboard && profileUrl) {
      navigator.clipboard.writeText(profileUrl);
      triggerToast('✓ Link copied to clipboard!');
    } else {
      // Fallback
      const input = document.createElement('input');
      input.value = profileUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      triggerToast('✓ Link copied to clipboard!');
    }
  };

  return (
    <div className="digital-card-page-wrapper">
      
      {/* 1. TOP QR SCAN INFORMATION BANNER */}
      <div className="top-scan-banner">
        <div className="container banner-inner">
          <span className="banner-pulse"></span>
          <span className="banner-text">SCAN QR → OPEN LIVE DIGITAL PROFILE</span>
        </div>
      </div>

      <div className="card-outer-container">
        
        {/* 2. PROFILE HERO SECTION */}
        <section className="profile-hero-card">
          {/* Main Focal Profile Image */}
          <div className="hero-photo-wrapper">
            <img
              src={profileConfig.assets.profileImage}
              alt={profileConfig.name}
              className="hero-profile-photo"
              onError={(e) => {
                // Fallback placeholder gradient image
                e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800"><rect width="600" height="800" fill="%230B132B"/><text x="300" y="400" fill="%23D4AF37" font-family="sans-serif" font-size="28" text-anchor="middle">Mr. Makrand Kaingade</text></svg>';
              }}
            />
            
            {/* Multi-stage Professional Gradient Overlay */}
            <div className="hero-gradient-overlay"></div>

            {/* DYPCET Organization Crest Badge (Top-Left) */}
            <div className="dypcet-badge-container">
              <img
                src={profileConfig.assets.dypcetLogo}
                alt="DYPCET College Emblem Logo"
                className="dypcet-badge-logo"
              />
              <div className="dypcet-badge-info">
                <span className="badge-org-title">DYPCET</span>
                <span className="badge-org-est">ESTD. 1984</span>
              </div>
            </div>

            {/* Overlaid Hero Content (Bottom Typography) */}
            <div className="hero-typography-content">
              <div className="hero-tpo-pill">
                <span className="tpo-pulse"></span>
                <span>{profileConfig.experience} Experience</span>
              </div>

              <h1 className="hero-full-name">{profileConfig.name}</h1>
              <h2 className="hero-designation-title">{profileConfig.designation}</h2>
              <p className="hero-org-name">{profileConfig.organization}</p>
              <p className="hero-location-text">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>{profileConfig.location}</span>
              </p>
            </div>
          </div>
        </section>

        {/* 3. QUICK CONTACT ACTION BUTTONS GRID */}
        <section className="contact-actions-section">
          <div className="contact-buttons-grid">
            
            {/* Call Button (Rendered only if phone provided) */}
            {profileConfig.contact.phone && (
              <a href={`tel:${profileConfig.contact.phone}`} className="contact-action-btn btn-call" aria-label="Call">
                <div className="btn-icon-wrapper">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <span className="btn-label">Call</span>
              </a>
            )}

            {/* WhatsApp Button (Rendered only if whatsapp provided) */}
            {profileConfig.contact.whatsapp && (
              <a
                href={`https://wa.me/${profileConfig.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-action-btn btn-whatsapp"
                aria-label="WhatsApp"
              >
                <div className="btn-icon-wrapper">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                </div>
                <span className="btn-label">WhatsApp</span>
              </a>
            )}

            {/* Email Button (Rendered only if email provided) */}
            {profileConfig.contact.email && (
              <a href={`mailto:${profileConfig.contact.email}`} className="contact-action-btn btn-email" aria-label="Email">
                <div className="btn-icon-wrapper">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <span className="btn-label">Email</span>
              </a>
            )}

            {/* Save Contact vCard Button (Always available) */}
            <button type="button" onClick={handleSaveContact} className="contact-action-btn btn-vcard" aria-label="Save Contact">
              <div className="btn-icon-wrapper">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
              </div>
              <span className="btn-label">Save Contact</span>
            </button>

          </div>
        </section>

        {/* 4. PROFESSIONAL INFORMATION SECTION */}
        <section className="info-card-section">
          <div className="section-card-header">
            <span className="header-icon">💼</span>
            <h3 className="section-card-title">Professional Information</h3>
          </div>

          <div className="info-rows-list">
            
            <div className="info-row">
              <span className="row-label">Full Name</span>
              <span className="row-value highlight-value">{profileConfig.name}</span>
            </div>

            <div className="info-row">
              <span className="row-label">Designation</span>
              <span className="row-value">{profileConfig.designation}</span>
            </div>

            <div className="info-row">
              <span className="row-label">Organization</span>
              <span className="row-value">{profileConfig.organization}</span>
            </div>

            <div className="info-row">
              <span className="row-label">Experience</span>
              <span className="row-value badge-pill">{profileConfig.experience}</span>
            </div>

            <div className="info-row">
              <span className="row-label">Location</span>
              <span className="row-value">{profileConfig.location}</span>
            </div>

            <div className="info-row bio-row">
              <span className="row-label">Professional Overview</span>
              <p className="row-bio-text">{profileConfig.bio}</p>
            </div>

          </div>
        </section>

        {/* 5. DYPCET COLLEGE INFORMATION SECTION */}
        <section className="info-card-section dypcet-section">
          <div className="section-card-header">
            <span className="header-icon">🎓</span>
            <h3 className="section-card-title">DYPCET Information</h3>
          </div>

          <div className="dypcet-content-card">
            <div className="dypcet-gold-badge">{profileConfig.dypcet.estInfo}</div>
            <h4 className="dypcet-college-name">{profileConfig.dypcet.fullName}</h4>
            <p className="dypcet-location-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>{profileConfig.dypcet.location}</span>
            </p>
          </div>
        </section>

        {/* 6. OUR SOCIAL MEDIA PLATFORMS SECTION */}
        <section className="info-card-section socials-section">
          <div className="section-card-header">
            <span className="header-icon">🌐</span>
            <h3 className="section-card-title">Our Social Media Platforms</h3>
          </div>

          <div className="social-links-grid">
            
            {profileConfig.socials.linkedin && (
              <a
                href={profileConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-platform-card linkedin-card"
              >
                <div className="platform-icon-circle linkedin-bg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                </div>
                <div className="platform-info">
                  <span className="platform-name">LinkedIn</span>
                  <span className="platform-handle">@makrand-kaingade</span>
                </div>
                <span className="arrow-icon">→</span>
              </a>
            )}

            {profileConfig.socials.instagram && (
              <a
                href={profileConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-platform-card instagram-card"
              >
                <div className="platform-icon-circle instagram-bg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </div>
                <div className="platform-info">
                  <span className="platform-name">Instagram</span>
                  <span className="platform-handle">@dypcet_official</span>
                </div>
                <span className="arrow-icon">→</span>
              </a>
            )}

            {profileConfig.socials.facebook && (
              <a
                href={profileConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="social-platform-card facebook-card"
              >
                <div className="platform-icon-circle facebook-bg">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </div>
                <div className="platform-info">
                  <span className="platform-name">Facebook</span>
                  <span className="platform-handle">@dypcetkolhapur</span>
                </div>
                <span className="arrow-icon">→</span>
              </a>
            )}

          </div>
        </section>

        {/* 7. SCAN QR & SHARE PROFILE SECTION */}
        <section className="info-card-section qr-section">
          <div className="section-card-header">
            <span className="header-icon">📷</span>
            <h3 className="section-card-title">Scan to View Profile</h3>
          </div>

          <div className="qr-container-card">
            
            {/* Real High-Resolution Scannable QR Code */}
            <div className="qr-code-box" ref={qrRef}>
              <QRCodeCanvas
                value={profileUrl || 'https://dypgroup.edu.in'}
                size={220}
                bgColor="#FFFFFF"
                fgColor="#0B132B"
                level="H"
                includeMargin={true}
                aria-label={`Scan QR code to view ${profileConfig.name}'s professional profile`}
              />
            </div>

            <p className="qr-instruction-text">
              Scan this QR code with any smartphone camera to open this digital profile instantly.
            </p>

            <div className="qr-url-pill">
              <span className="link-icon">🔗</span>
              <span className="url-text">{profileUrl || 'https://dypgroup.edu.in'}</span>
            </div>

            {/* QR & Share Action Buttons */}
            <div className="qr-tools-grid">
              
              <button type="button" onClick={handleDownloadQR} className="qr-tool-btn btn-download-qr">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                <span>Download QR</span>
              </button>

              <button type="button" onClick={handleShareProfile} className="qr-tool-btn btn-share">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                <span>Share Profile</span>
              </button>

              <button type="button" onClick={copyToClipboard} className="qr-tool-btn btn-copy">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                <span>Copy Link</span>
              </button>

            </div>

          </div>
        </section>

        {/* 8. PROFESSIONAL FOOTER */}
        <footer className="digital-card-footer">
          <p className="footer-org">{profileConfig.organization}</p>
          <p className="footer-copyright">Digital Professional Profile • Smart Visiting Card</p>
        </footer>

      </div>

      {/* Floating Notification Toast */}
      {showToast && (
        <div className="floating-toast">
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
