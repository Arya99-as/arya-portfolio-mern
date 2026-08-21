import React, { useState, useEffect } from 'react';
import { createProjectApi, deleteProjectApi, fetchContactsApi, fetchProjects } from '../services/api';

export function AdminDashboard({ onClose }) {
  const [adminKey, setAdminKey] = useState('arya_admin_secret_key_2026');
  const [authenticated, setAuthenticated] = useState(true);

  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  // New Project Form State
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    initials: '',
    typeBadge: '',
    cardAccent: 'linear-gradient(135deg, #F2B84B, #E67E22)',
    technologies: '',
    github: 'https://github.com/Arya99-as',
    liveDemo: '#',
    category: 'Full Stack'
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const projData = await fetchProjects();
      setProjects(projData);

      try {
        const contactData = await fetchContactsApi(adminKey);
        setContacts(contactData);
      } catch (cErr) {
        console.warn('Contacts fetch warning:', cErr);
      }
    } catch (err) {
      setStatus(`Error loading admin data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) {
      setStatus('Title and Description are required!');
      return;
    }

    try {
      setLoading(true);
      await createProjectApi(newProject, adminKey);
      setStatus('✓ Project created successfully via Express API!');
      setNewProject({
        title: '',
        description: '',
        initials: '',
        typeBadge: '',
        cardAccent: 'linear-gradient(135deg, #F2B84B, #E67E22)',
        technologies: '',
        github: 'https://github.com/Arya99-as',
        liveDemo: '#',
        category: 'Full Stack'
      });
      loadData();
    } catch (err) {
      setStatus(`Error creating project: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      setLoading(true);
      await deleteProjectApi(id, adminKey);
      setStatus('✓ Project deleted successfully!');
      loadData();
    } catch (err) {
      setStatus(`Delete error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-modal-backdrop open" style={{ zIndex: 1200 }}>
      <div className="resume-modal-card" style={{ height: '90vh', width: '960px' }}>
        <div className="resume-modal-header">
          <div className="window-dots">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>
          <span className="file-name">admin_dashboard.sh (MERN Control Panel)</span>
          <button className="btn-modal-close" onClick={onClose}>&times;</button>
        </div>

        <div className="resume-modal-body" style={{ padding: '1.5rem', overflowY: 'auto' }}>
          
          {/* Admin Navigation Tabs */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
            <button
              className={`btn ${activeTab === 'projects' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab('projects')}
            >
              Projects CRUD
            </button>
            <button
              className={`btn ${activeTab === 'add' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab('add')}
            >
              + Add Project
            </button>
            <button
              className={`btn ${activeTab === 'messages' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab('messages')}
            >
              Contact Messages ({contacts.length})
            </button>
          </div>

          {status && (
            <div className="form-status success" style={{ display: 'block', marginBottom: '1rem' }}>
              {status}
            </div>
          )}

          {/* TAB 1: Projects List */}
          {activeTab === 'projects' && (
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '1rem', color: 'var(--text)' }}>
                Live Express &amp; MongoDB Projects
              </h3>
              {loading ? (
                <div className="loading-banner">Loading...</div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Initials</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Technologies</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((p) => (
                      <tr key={p._id || p.id}>
                        <td><strong>{p.initials || 'PR'}</strong></td>
                        <td>{p.title}</td>
                        <td>{p.typeBadge || p.category}</td>
                        <td>{Array.isArray(p.technologies) ? p.technologies.join(', ') : p.technologies}</td>
                        <td>
                          <button
                            className="btn-modal-action"
                            style={{ color: 'var(--accent-red)', borderColor: 'var(--accent-red)' }}
                            onClick={() => handleDeleteProject(p._id || p.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* TAB 2: Add Project Form */}
          {activeTab === 'add' && (
            <form onSubmit={handleCreateProject} className="contact-form" style={{ padding: '1rem 0' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '1rem', color: 'var(--accent)' }}>
                Add New Project to MERN Backend
              </h3>

              <div className="form-group">
                <label className="form-label">$ PROJECT TITLE</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. MERN Task Manager"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">$ DESCRIPTION</label>
                <textarea
                  className="form-input form-textarea"
                  rows="3"
                  placeholder="Project summary..."
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  required
                ></textarea>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">$ INITIALS (e.g. TM)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="TM"
                    value={newProject.initials}
                    onChange={(e) => setNewProject({ ...newProject, initials: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">$ BADGE (e.g. Full Stack App)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Full Stack App"
                    value={newProject.typeBadge}
                    onChange={(e) => setNewProject({ ...newProject, typeBadge: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">$ TECHNOLOGIES (comma separated)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="MongoDB, Express, React, Node.js"
                  value={newProject.technologies}
                  onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">$ GITHUB LINK</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newProject.github}
                    onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">$ LIVE DEMO LINK</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newProject.liveDemo}
                    onChange={(e) => setNewProject({ ...newProject, liveDemo: e.target.value })}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Creating...' : '+ Create Project in MongoDB'}
              </button>
            </form>
          )}

          {/* TAB 3: Contact Messages */}
          {activeTab === 'messages' && (
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '1rem', color: 'var(--accent-2)' }}>
                Submitted Messages (Stored in MongoDB)
              </h3>
              {contacts.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>No submitted contact messages yet.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {contacts.map((c) => (
                    <div key={c._id || c.id} className="timeline-content" style={{ margin: 0 }}>
                      <div className="timeline-header">
                        <h4 className="role-title">{c.name} &lt;{c.email}&gt;</h4>
                        <span className="timeline-period">{new Date(c.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="org-name">Subject: {c.subject}</div>
                      <p className="role-desc">{c.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
