import React from 'react';
import { experienceData } from '../data/experience';

export function Experience() {
  return (
    <section className="experience-section section-padding alt-bg" id="experience">
      <div className="container">
        
        <div className="section-eyebrow">/* experience.log */</div>
        <h2 className="section-title">Experience &amp; Internships</h2>
        <p className="section-subtitle">Virtual data analytics internships, international computer vision engineering, and technical event leadership.</p>

        <div className="timeline">
          {experienceData.map((item, index) => (
            <div
              key={item.id}
              className={`timeline-item scroll-reveal ${index % 3 === 1 ? 'delay-1' : index % 3 === 2 ? 'delay-2' : ''}`}
            >
              <div className="timeline-marker">
                <span className="marker-dot"></span>
              </div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3 className="role-title">{item.roleTitle}</h3>
                  <span className="timeline-period">{item.period}</span>
                </div>
                <div className="org-name">{item.organization}</div>
                <p className="role-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
