import React, { useState, useEffect } from 'react';
import { fetchProjects } from '../services/api';
import { ProjectCard } from './ProjectCard';

const categories = ['All', 'Web Development', 'AI / ML', 'Data Science', 'IoT'];

const fallbackProjects = [
  {
    _id: "66b8c0010000000000000001",
    title: "STUDY BUDDY",
    description: "A student notes-sharing and learning platform that allows students to access organized study materials, notes, PPTs, and learning resources in one place.",
    initials: "SB",
    typeBadge: "Web Development / Education",
    cardAccent: "linear-gradient(135deg, #F2B84B, #E67E22)",
    technologies: ["React", "Vite", "JavaScript", "Tailwind CSS", "Supabase"],
    keyFeatures: [
      "Student login",
      "Role-based access",
      "Notes sharing",
      "Subject and semester filtering",
      "Teacher upload system",
      "Admin management",
      "Search and organization of study materials"
    ],
    github: "https://github.com/Arya99-as",
    liveDemo: "#",
    category: "Web Development"
  },
  {
    _id: "66b8c0010000000000000002",
    title: "AI CCTV / SMART CCTV",
    description: "An AI-powered intelligent CCTV monitoring system designed to analyze live camera feeds and detect objects, people, and suspicious activities automatically.",
    initials: "AC",
    typeBadge: "Artificial Intelligence / Computer Vision",
    cardAccent: "linear-gradient(135deg, #5FD3C4, #2980B9)",
    technologies: ["Python", "OpenCV", "YOLO", "AI/ML", "Flask"],
    keyFeatures: [
      "Real-time object detection",
      "Person detection",
      "Object tracking",
      "Multi-camera monitoring",
      "AI-based activity detection",
      "Security alerts",
      "Monitoring dashboard"
    ],
    github: "https://github.com/Arya99-as",
    liveDemo: "#",
    category: "AI / ML"
  },
  {
    _id: "66b8c0010000000000000003",
    title: "SOCIALFORGE",
    description: "An AI-powered Instagram content intelligence platform that analyzes social media content and provides insights to help creators improve their content strategy.",
    initials: "SF",
    typeBadge: "AI / Social Media Intelligence",
    cardAccent: "linear-gradient(135deg, #5FD3C4, #27AE60)",
    technologies: ["AI", "JavaScript", "React", "Data Analytics"],
    keyFeatures: [
      "Content analysis",
      "Engagement insights",
      "Trending content analysis",
      "Posting-time recommendations",
      "Growth analytics",
      "Social media intelligence"
    ],
    github: "https://github.com/Arya99-as",
    liveDemo: "#",
    category: "AI / ML"
  },
  {
    _id: "66b8c0010000000000000004",
    title: "GST DOCTOR AI PRO",
    description: "An AI-powered GST invoice validation system that extracts invoice information using OCR and automatically checks GST-related information.",
    initials: "GD",
    typeBadge: "AI / FinTech / OCR",
    cardAccent: "linear-gradient(135deg, #9B59B6, #2980B9)",
    technologies: ["Python", "OCR", "AI/ML", "Computer Vision"],
    keyFeatures: [
      "Invoice image/PDF processing",
      "OCR-based data extraction",
      "GST information extraction",
      "Invoice validation",
      "Automated analysis",
      "Error detection"
    ],
    github: "https://github.com/Arya99-as",
    liveDemo: "#",
    category: "AI / ML"
  },
  {
    _id: "66b8c0010000000000000005",
    title: "SMART COLLEGE BUS SYSTEM",
    description: "A smart transportation management system designed to provide real-time college bus tracking and improve transportation management for students and administrators.",
    initials: "SB",
    typeBadge: "IoT / Web Development",
    cardAccent: "linear-gradient(135deg, #FBBF24, #10B981)",
    technologies: ["IoT", "GPS", "JavaScript", "Web Development"],
    keyFeatures: [
      "Real-time bus tracking",
      "GPS integration",
      "Bus location monitoring",
      "Student transportation information",
      "Admin monitoring",
      "Route management"
    ],
    github: "https://github.com/Arya99-as",
    liveDemo: "#",
    category: "IoT"
  },
  {
    _id: "66b8c0010000000000000006",
    title: "CARBONX AI",
    description: "An AI-powered sustainability platform designed to help organizations monitor carbon emissions, analyze environmental data, and manage sustainability activities.",
    initials: "CX",
    typeBadge: "AI / Sustainability / Data Analytics",
    cardAccent: "linear-gradient(135deg, #34D399, #059669)",
    technologies: ["AI", "Data Analytics", "Web Development"],
    keyFeatures: [
      "Carbon emission tracking",
      "Sustainability analytics",
      "Data visualization",
      "AI-based insights",
      "Environmental monitoring"
    ],
    github: "https://github.com/Arya99-as",
    liveDemo: "#",
    category: "Data Science"
  }
];

export function Projects() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProjects();
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      } catch (err) {
        console.warn('API error fetching projects, using default projects:', err);
        if (isMounted) setError(err.message || 'Could not connect to live API');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => {
        const cat = p.category || '';
        const badge = p.typeBadge || '';
        if (selectedCategory === 'Web Development') {
          return cat === 'Web Development' || cat.includes('Web') || badge.includes('Web');
        }
        if (selectedCategory === 'AI / ML') {
          return cat === 'AI / ML' || cat.includes('AI') || cat.includes('ML') || badge.includes('AI') || badge.includes('Vision');
        }
        if (selectedCategory === 'Data Science') {
          return cat === 'Data Science' || cat.includes('Data') || badge.includes('Analytics') || badge.includes('Data');
        }
        if (selectedCategory === 'IoT') {
          return cat === 'IoT' || badge.includes('IoT');
        }
        return cat.toLowerCase().includes(selectedCategory.toLowerCase());
      });

  return (
    <section className="projects-section section-padding" id="projects">
      <div className="container">
        
        <div className="section-eyebrow">/* projects/ (Served via Express API) */</div>
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">Real-world applications built for student collaboration, social content intelligence, AI vision, and IoT tracking.</p>

        {/* Category Filter Tabs */}
        <div className="project-filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading-banner">
            <span className="status-indicator"></span> Loading live projects from Express API...
          </div>
        ) : error && projects.length === 0 ? (
          <div className="form-status error" style={{ display: 'block', textAlign: 'center', padding: '1.5rem' }}>
            <p>{error}</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>No projects found under category "{selectedCategory}".</p>
            <button
              className="btn btn-outline"
              style={{ marginTop: '1rem', fontSize: '0.85rem' }}
              onClick={() => setSelectedCategory('All')}
            >
              Show All Projects
            </button>
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project._id || project.id || index}
                project={project}
                delayClass={index % 3 === 1 ? 'delay-1' : index % 3 === 2 ? 'delay-2' : ''}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
