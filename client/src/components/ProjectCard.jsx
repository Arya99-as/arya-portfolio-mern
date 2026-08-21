import React from 'react';

export function ProjectCard({ project, delayClass }) {
  const tags = Array.isArray(project.technologies)
    ? project.technologies
    : (project.tags || []);

  const features = Array.isArray(project.keyFeatures) ? project.keyFeatures : [];

  return (
    <article
      className={`project-card scroll-reveal active ${delayClass}`}
      style={{ '--card-accent': project.cardAccent || 'linear-gradient(135deg, #F2B84B, #E67E22)' }}
    >
      <div className="project-thumbnail">
        {project.image ? (
          <img src={project.image} alt={project.title} className="project-img" />
        ) : (
          <>
            <div className="thumb-overlay"></div>
            <span className="project-initials">{project.initials || 'PR'}</span>
          </>
        )}
        <div className="project-type-badge">{project.typeBadge || project.category || 'Web Application'}</div>
      </div>
      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        {features.length > 0 && (
          <div className="project-features">
            <span className="features-title">Key Features:</span>
            <ul className="features-list">
              {features.map((feat, idx) => (
                <li key={idx} className="feature-item">
                  <span className="feature-bullet">•</span> {feat}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="project-tags">
          {tags.map((tag) => (
            <span key={tag} className="proj-tag">{tag}</span>
          ))}
        </div>
        <div className="project-links">
          <a
            href={project.github || 'https://github.com/Arya99-as'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-card-link"
            title="GitHub Repository"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            <span>Code</span>
          </a>
          <a
            href={project.liveDemo || '#'}
            target={project.liveDemo && project.liveDemo !== '#' ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="btn-card-link primary"
            title="Live Demo"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            <span>Live Demo</span>
          </a>
        </div>
      </div>
    </article>
  );
}
