import React from 'react';
import { skillsData } from '../data/skills';

export function Skills() {
  return (
    <section className="skills-section section-padding alt-bg" id="skills">
      <div className="container">
        
        <div className="section-eyebrow">/* skills.json */</div>
        <h2 className="section-title">Technical Skills</h2>
        <p className="section-subtitle">Categorized programming languages, web technologies, database systems, AI tools, and core computer science coursework.</p>

        <div className="skills-grid">
          {skillsData.map((skill, index) => (
            <div
              key={skill.id}
              className={`skill-card ${skill.isFeatured ? 'skill-card-ai' : ''} scroll-reveal ${index % 3 === 1 ? 'delay-1' : index % 3 === 2 ? 'delay-2' : ''}`}
            >
              <div className="skill-card-header">
                <span className="skill-icon">{skill.icon}</span>
                <h3 className="skill-category">{skill.category}</h3>
                {skill.isFeatured && (
                  <span className="badge-focus">{skill.badgeText || 'Featured'}</span>
                )}
              </div>
              <div className="tag-group">
                {skill.tags.map((tag) => (
                  <span key={tag} className={`tag ${skill.isFeatured ? 'tag-ai' : ''}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
