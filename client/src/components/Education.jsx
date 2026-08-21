import React from 'react';

export function Education() {
  return (
    <section className="education-section section-padding alt-bg" id="education">
      <div className="container">
        
        <div className="section-eyebrow">/* education.yml */</div>
        <h2 className="section-title">Education</h2>

        <div className="education-card scroll-reveal">
          <div className="edu-header">
            <div className="edu-icon">🎓</div>
            <div className="edu-titles">
              <h3 className="institution-name">D.Y. Patil College of Engineering and Technology, Kolhapur</h3>
              <div className="degree-name">Bachelor of Technology (B.Tech) — Computer Science &amp; Engineering</div>
            </div>
            <div className="edu-stat-badge">
              <span className="stat-lbl">CGPA</span>
              <span className="stat-num">8.1 / 10</span>
            </div>
          </div>
          <div className="edu-details">
            <div className="edu-meta">
              <span className="meta-tag">Period: <strong>2023 – 2027</strong></span>
              <span className="meta-tag">Stream: <strong>Computer Science &amp; Engineering</strong></span>
              <span className="meta-tag">Location: <strong>Kolhapur, India</strong></span>
            </div>
            <p className="edu-summary">
              Core Coursework: Data Structures &amp; Algorithms, Object-Oriented Programming (OOP), Database Management Systems, Computer Networks, Operating Systems, Software Engineering, AI &amp; Computer Vision.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
