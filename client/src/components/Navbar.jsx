import React, { useState, useEffect } from 'react';

const navItems = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' }
];

export function Navbar({ activeSection }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`floating-capsule-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <div className="floating-capsule-nav">
        
        {/* Cybersecurity Cartoon Avatar & Futuristic Logo */}
        <div className="navbar-logo-group">
          <a href="#hero" className="capsule-avatar-link" aria-label="Cybersecurity Portfolio">
            <img
              src="/assets/images/cybersecurity_avatar.jpg"
              alt="Cybersecurity Portfolio"
              className="capsule-avatar-img"
            />
          </a>
          <a href="#hero" className="capsule-logo" aria-label="Arya A. Sutar Home">
            <span className="logo-glow-symbol">&lt;AS/&gt;</span>
          </a>
        </div>

        {/* All Navigation Links directly visible in Navbar */}
        <nav className="capsule-menu-desktop" aria-label="Main Navigation">
          <ul className="capsule-nav-list">
            {navItems.map((item) => {
              const isActive = activeSection === item.id || (item.id === 'hero' && activeSection === 'home');
              return (
                <li className="capsule-nav-item" key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`capsule-nav-link ${isActive ? 'active' : ''}`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="active-dot"></span>}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

      </div>
    </header>
  );
}
