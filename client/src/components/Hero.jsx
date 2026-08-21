import React, { useState, useRef } from 'react';
import { useTypingEffect } from '../hooks/useTypingEffect';

const roles = [
  'Software Developer',
  'Web Developer',
  'AI / Computer Vision Enthusiast',
  'Problem Solver'
];

export function Hero({ onOpenResumeModal }) {
  const typedRole = useTypingEffect(roles, 90, 40, 2000);
  const [videoState, setVideoState] = useState('idle'); // 'idle' | 'playing' | 'paused' | 'ended'
  const [isMuted, setIsMuted] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const videoRef = useRef(null);

  const handleStartVideo = () => {
    if (!videoRef.current) return;
    setShowOverlay(false);
    videoRef.current.currentTime = 0;
    videoRef.current.muted = false;
    setIsMuted(false);
    videoRef.current.play().then(() => {
      setVideoState('playing');
    }).catch((err) => {
      console.warn('Playback error:', err);
    });
  };

  const handleVideoBtnClick = () => {
    if (!videoRef.current) return;

    if (showOverlay || videoState === 'idle' || videoState === 'ended') {
      setShowOverlay(false);
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.play().then(() => {
        setVideoState('playing');
      }).catch((err) => {
        console.warn('Playback error:', err);
      });
    } else if (videoState === 'playing') {
      videoRef.current.pause();
      setVideoState('paused');
    } else if (videoState === 'paused') {
      videoRef.current.play().then(() => {
        setVideoState('playing');
      }).catch(() => {});
    }
  };

  const handleVideoEnded = () => {
    setVideoState('idle');
    setShowOverlay(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const toggleAudioMute = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const getButtonContent = () => {
    switch (videoState) {
      case 'playing':
        return { symbol: '⏸', text: 'PAUSE VIDEO' };
      case 'paused':
        return { symbol: '>_', text: 'PLAY VIDEO' };
      case 'ended':
        return { symbol: '>_', text: 'REPLAY VIDEO' };
      case 'idle':
      default:
        return { symbol: '>_', text: 'OPEN TERMINAL' };
    }
  };

  const btnContent = getButtonContent();

  return (
    <section className="hero-section" id="hero">
      <div className="container hero-container">
        
        {/* Left Hero Content (55%) */}
        <div className="hero-content scroll-reveal">
          <div className="eyebrow-code">// b.tech cse student, 2023–2027</div>
          <h1 className="hero-name">Arya A. Sutar</h1>
          <div className="hero-role-wrapper">
            <span className="role-prefix">I am a </span>
            <span className="typed-role" id="typed-role-text">{typedRole}</span>
            <span className="cursor-blink">|</span>
          </div>

          <p className="hero-bio">
            B.Tech Computer Science Engineering student focused on building full-stack web platforms, applying computer vision models, and leading technical teams. Experienced in media coordination and campus event management with a commitment to writing clean, maintainable code.
          </p>

          <div className="hero-cta-group">
            <a href="#projects" className="btn btn-primary">
              <span>View Projects</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
            <button className="btn btn-outline btn-view-resume-trigger" id="hero-view-resume-btn" onClick={onOpenResumeModal}>
              <span>View Resume</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
            <a href="/assets/resume/Arya_Sutar_Resume.pdf" className="btn btn-outline" download="Arya_Sutar_Resume.pdf" target="_blank" rel="noopener noreferrer">
              <span>Download Resume</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </a>
            <a href="#contact" className="link-contact">
              <span>Contact me &rarr;</span>
            </a>
          </div>

          {/* Social Icons */}
          <div className="hero-socials">
            <span className="social-label">Connect:</span>
            <a href="https://github.com/Arya99-as" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub Profile">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/arya-sutar-6244942b1" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn Profile">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="https://www.instagram.com/aryasutar_" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram Profile">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="mailto:sutararya.6336@gmail.com" className="social-icon" aria-label="Email Arya">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </a>
          </div>

        </div>

        {/* Right Hero Video Column (45%) */}
        <div className="hero-right-column scroll-reveal delay-1">
          {/* Vertical Cybersecurity Anime Video Wrapper */}
          <div className="hero-video-wrapper">
            <video
              ref={videoRef}
              className="hero-vertical-video"
              preload="metadata"
              muted={isMuted}
              playsInline
              controls={false}
              onEnded={handleVideoEnded}
            >
              <source src="/assets/videos/cybersecurity_anime.mp4" type="video/mp4" />
              <source src="/assets/videos/Use_the_uploaded_image_as_the.mp4" type="video/mp4" />
            </video>

            {/* Uploaded Image Overlay */}
            <div
              className={`hero-video-overlay ${!showOverlay ? 'hidden-overlay' : ''}`}
              onClick={handleStartVideo}
              title="Click to play video"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleStartVideo(); }}
            >
              <img
                src="/assets/images/PORTFOLIO ING.png"
                alt="Portfolio Video Thumbnail"
                className="hero-video-overlay-img"
              />
            </div>

            {/* Speaker / Audio Toggle Button at Bottom Right */}
            <button
              className="video-sound-toggle-btn"
              onClick={toggleAudioMute}
              aria-label={isMuted ? 'Turn sound on' : 'Turn sound off'}
              title={isMuted ? 'Turn sound on' : 'Turn sound off'}
            >
              {isMuted ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>
          </div>

          {/* CMD / TERMINAL Video Control Button */}
          <div className="cmd-toggle-wrapper">
            <button
              className={`cmd-terminal-toggle-btn ${videoState === 'playing' ? 'active' : ''}`}
              onClick={handleVideoBtnClick}
              title={btnContent.text}
            >
              <span className="cmd-icon-symbol">{btnContent.symbol}</span>
              <span className="cmd-btn-text">{btnContent.text}</span>
              <span className="cmd-cyan-glow"></span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
