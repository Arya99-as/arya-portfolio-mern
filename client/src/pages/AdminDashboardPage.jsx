import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  fetchProjects,
  createProjectApi,
  deleteProjectApi,
  fetchContactsApi,
  fetchAdminDashboardStatsApi
} from '../services/api';

export function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('arya_admin_token');

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

  const handleLogout = () => {
    localStorage.removeItem('arya_admin_token');
    localStorage.removeItem('arya_admin_user');
    navigate('/admin/login', { replace: true });
  };

  const loadAdminData = async () => {
    if (!token) {
      navigate('/admin/login', { replace: true });
      return;
    }

    try {
      setLoading(true);
      const projData = await fetchProjects();
      setProjects(projData);

      const statsData = await fetchAdminDashboardStatsApi(token);
      setStats(statsData.stats);

      const contactData = await fetchContactsApi(token);
      setContacts(contactData);
    } catch (err) {
      if (err.message.includes('Unauthorized') || err.message.includes('expired')) {
        handleLogout();
      } else {
        setStatusMsg(`Warning: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) {
      setStatusMsg('Title and Description are required!');
      return;
    }

    try {
      setLoading(true);
      await createProjectApi(newProject, token);
      setStatusMsg('✓ Project created in MongoDB!');
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
      loadAdminData();
    } catch (err) {
      setStatusMsg(`Create error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      setLoading(true);
      await deleteProjectApi(id, token);
      setStatusMsg('✓ Project removed successfully!');
      loadAdminData();
    } catch (err) {
      setStatusMsg(`Delete error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg)',
      color: 'var(--text)',
      fontFamily: 'var(--font-body)',
      padding: '2rem 1.5rem'
    }}>
      <div className="container">
        
        {/* Admin Header */}
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '1.5rem',
          marginBottom: '2rem',
          borderBottom: '1px solid var(--border)'
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-2)', fontSize: '0.85rem' }}>
              // private owner control panel
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 700 }}>
              Arya Sutar — Admin Dashboard
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a href="/" className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}>
              View Live Site
            </a>
            <button
              onClick={handleLogout}
              className="btn btn-primary"
              style={{ backgroundColor: 'var(--accent-red)', borderColor: 'var(--accent-red)', color: '#fff', fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
            >
              Logout
            </button>
          </div>
        </header>

        {statusMsg && (
          <div className="form-status success" style={{ display: 'block', marginBottom: '1.5rem' }}>
            {statusMsg}
          </div>
        )}

        {/* Tab Selection */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
          <button
            className={`btn ${activeTab === 'overview' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview &amp; Stats
          </button>
          <button
            className={`btn ${activeTab === 'projects' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects ({projects.length})
          </button>
          <button
            className={`btn ${activeTab === 'add' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('add')}
          >
            + New Project
          </button>
          <button
            className={`btn ${activeTab === 'messages' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('messages')}
          >
            Contact Messages ({contacts.length})
          </button>
        </div>

        {/* TAB 1: Overview */}
        {activeTab === 'overview' && (
          <div className="about-stats-row" style={{ marginTop: 0, borderTop: 'none', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="stat-item" style={{ backgroundColor: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <span className="stat-value">{stats ? stats.totalProjects : projects.length}</span>
              <span className="stat-label">Total Dynamic Projects</span>
            </div>
            <div className="stat-item" style={{ backgroundColor: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <span className="stat-value">{stats ? stats.totalMessages : contacts.length}</span>
              <span className="stat-label">Submitted Contact Messages</span>
            </div>
            <div className="stat-item" style={{ backgroundColor: 'var(--surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <span className="stat-value" style={{ color: 'var(--accent-green)', fontSize: '1.5rem' }}>Authenticated</span>
              <span className="stat-label">Single Owner Role</span>
            </div>
          </div>
        )}

        {/* TAB 2: Projects Table */}
        {activeTab === 'projects' && (
          <div className="admin-card">
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '1rem', color: 'var(--text)' }}>
              Dynamic Projects List
            </h3>
            {loading ? (
              <div className="loading-banner">Loading projects...</div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Initials</th>
                    <th>Title</th>
                    <th>Badge / Category</th>
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

        {/* TAB 3: Add New Project Form */}
        {activeTab === 'add' && (
          <div className="admin-card">
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '1rem', color: 'var(--accent)' }}>
              Add New Project to MongoDB
            </h3>
            <form onSubmit={handleCreateProject} className="contact-form" style={{ padding: 0 }}>
              <div className="form-group">
                <label className="form-label">$ TITLE</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. AI Vision Traffic Surveillance"
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
                  placeholder="Detailed explanation..."
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  required
                ></textarea>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">$ INITIALS</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="AV"
                    value={newProject.initials}
                    onChange={(e) => setNewProject({ ...newProject, initials: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">$ TYPE BADGE</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="AI Computer Vision"
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
                  placeholder="Python, OpenCV, PyTorch, React"
                  value={newProject.technologies}
                  onChange={(e) => setNewProject({ ...newProject, technologies: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Creating...' : '+ Create Project in MongoDB'}
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: Contact Messages */}
        {activeTab === 'messages' && (
          <div className="admin-card">
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '1rem', color: 'var(--accent-2)' }}>
              Submitted Contact Messages
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
  );
}
