import React from 'react';
import { Link } from 'react-router-dom';
import { Wind, ArrowLeft, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="glass-card" style={{ textAlign: 'center', padding: 'clamp(2.5rem, 6vh, 4.5rem) 1.5rem', maxWidth: '600px', width: '100%', minWidth: 0, margin: '2rem auto' }}>
      <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
        <Wind size={36} />
      </div>
      <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#38bdf8', lineHeight: 1 }}>404</h2>
      <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0.75rem 0' }}>Page Not Found</h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.5 }}>
        The pollution telemetry route you requested does not exist or has been relocated.
      </p>
      <Link to="/" className="btn btn-primary">
        <Home size={18} /> Return to Live Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;
