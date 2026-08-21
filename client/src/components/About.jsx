import React from 'react';

export function About() {
  return (
    <section className="about-section section-padding" id="about">
      <div className="container">
        
        <div className="section-eyebrow">/* about.md */</div>
        <h2 className="section-title">About Me</h2>

        <div className="about-grid">
          
          {/* Left Text Intro */}
          <div className="about-text-content scroll-reveal">
            <h3 className="about-heading">Engineering solutions with passion, precision, and code.</h3>
            <p>
              I am a B.Tech Computer Science &amp; Engineering student (2023–2027) at D.Y. Patil College of Engineering and Technology, Kolhapur. My focus spans software development, web platforms, and applied artificial intelligence including computer vision and OCR invoice extraction.
            </p>
            <p>
              Alongside technical coursework, I have completed a Data Analytics internship at Deloitte and an international AI CCTV &amp; Behavior Analysis internship in Malaysia. I actively serve as Deputy Chief of the Training &amp; Placement Cell, Media Head for MLSA, and lead student competition teams.
            </p>
            <p>
              I am actively seeking placement and internship opportunities where I can apply my problem-solving skills, software engineering knowledge, and collaborative leadership to build impactful software.
            </p>

            <div className="about-stats-row">
              <div className="stat-item">
                <span className="stat-value">8.1</span>
                <span className="stat-label">B.Tech CGPA</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">3</span>
                <span className="stat-label">Core Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">4</span>
                <span className="stat-label">Major Awards</span>
              </div>
            </div>
          </div>

          {/* Right JSON Profile Panel */}
          <div className="about-json-panel scroll-reveal delay-1">
            <div className="code-window-header">
              <div className="window-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <span className="file-name">profile.json</span>
            </div>
            
            <div className="code-window-body">
              <pre className="json-code"><code><span className="json-brace">{'{'}</span>{'\n'}
    <span className="json-key">"name"</span>: <span className="json-str">"Arya A. Sutar"</span>,{'\n'}
    <span className="json-key">"role"</span>: <span className="json-str">"Computer Science Engineer & Developer"</span>,{'\n'}
    <span className="json-key">"institution"</span>: <span className="json-str">"DYPCET, Kolhapur"</span>,{'\n'}
    <span className="json-key">"degree"</span>: <span className="json-str">"B.Tech CSE (2023–2027)"</span>,{'\n'}
    <span className="json-key">"cgpa"</span>: <span className="json-num">8.1</span>,{'\n'}
    <span className="json-key">"email"</span>: <span className="json-str">"sutararya.6336@gmail.com"</span>,{'\n'}
{'\n'}
    <span className="json-key">"focus"</span>: <span className="json-bracket">[</span>{'\n'}
        <span className="json-str">"Software Development"</span>,{'\n'}
        <span className="json-str">"Web Development (MERN)"</span>,{'\n'}
        <span className="json-str">"Artificial Intelligence"</span>,{'\n'}
        <span className="json-str">"Computer Vision"</span>,{'\n'}
        <span className="json-str">"Data Science"</span>,{'\n'}
        <span className="json-str">"Problem Solving"</span>{'\n'}
    <span className="json-bracket">]</span>,{'\n'}
{'\n'}
    <span className="json-key">"open_to"</span>: <span className="json-bracket">[</span>{'\n'}
        <span className="json-str">"Placements"</span>,{'\n'}
        <span className="json-str">"Software Internships"</span>{'\n'}
    <span className="json-bracket">]</span>,{'\n'}
{'\n'}
    <span className="json-key">"ready_to_relocate"</span>: <span className="json-bool">true</span>{'\n'}
<span className="json-brace">{'}'}</span></code></pre>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
