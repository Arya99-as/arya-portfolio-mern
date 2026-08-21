import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdminApi } from '../services/api';

export function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('arya_admin_token');
    if (token) {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Invalid email or password');
      return;
    }

    try {
      setLoading(true);
      const res = await loginAdminApi(email.trim(), password);
      if (res.token) {
        localStorage.setItem('arya_admin_token', res.token);
        localStorage.setItem('arya_admin_user', JSON.stringify(res.user));
        navigate('/admin', { replace: true });
      }
    } catch (err) {
      setErrorMessage(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
      fontFamily: 'var(--font-mono)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '440px',
        backgroundColor: 'var(--surface)',
        border: '1px solid rgba(95, 211, 196, 0.3)',
        borderRadius: 'var(--radius-md)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 25px rgba(95, 211, 196, 0.15)',
        overflow: 'hidden'
      }}>
        {/* Terminal Header */}
        <div style={{
          backgroundColor: 'var(--surface-2)',
          padding: '0.75rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border)'
        }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-2)' }}>owner_login.sh</span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--text)', fontSize: '1.5rem', marginBottom: '0.4rem' }}>
              Owner Access Portal
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Restricted to single verified portfolio owner.
            </p>
          </div>

          {errorMessage && (
            <div className="form-status error" style={{ display: 'block', marginBottom: '1.25rem' }}>
              {errorMessage}
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="email">$ OWNER EMAIL</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="sutararya.6336@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">$ PASSWORD</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
            disabled={loading}
          >
            <span>{loading ? 'Authenticating...' : 'Authenticate Owner'}</span>
          </button>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <a href="/" style={{ color: 'var(--text-dim)', fontSize: '0.8rem', textDecoration: 'none' }}>
              &larr; Return to Public Portfolio
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
