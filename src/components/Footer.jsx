import React from 'react';
import { Link } from 'react-router-dom';
import { Wind, ExternalLink } from 'lucide-react';
import { APP_METADATA } from '../utils/constants';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left Column: Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <div className="brand-icon-wrapper" style={{ width: '32px', height: '32px' }}>
              <Wind size={18} />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
              AirSense Pro
            </span>
          </div>
        </div>

        {/* Middle Column: Quick Nav */}
        <div>
          <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '0.75rem', fontWeight: 700 }}>
            Modules & Navigation
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
            <li>
              <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                Live AQI Dashboard
              </Link>
            </li>
            <li>
              <Link to="/compare" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                City Comparison Matrix
              </Link>
            </li>

            <li>
              <Link to="/analytics" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                Pollutant Trends & Analytics
              </Link>
            </li>
            <li>
              <Link to="/guidelines" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                WHO & Health Advisory
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Column: Academic Metadata */}
        <div>
          <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '0.75rem', fontWeight: 700 }}>
            Academic Credentials
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <strong>Student:</strong> {APP_METADATA.studentName}<br />
            <strong>PRN:</strong> {APP_METADATA.prn}<br />
            <strong>Course:</strong> {APP_METADATA.course}<br />
            <strong>Course Owner:</strong> {APP_METADATA.courseOwner}<br />
            <strong>College:</strong> PCCOE Nigdi, Pune
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div>
          © {new Date().getFullYear()} {APP_METADATA.studentName} ({APP_METADATA.prn}). Department of MCA, PCCOE Pune.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Data: <a href="https://open-meteo.com/" target="_blank" rel="noreferrer" style={{ color: '#38bdf8', textDecoration: 'none' }}>Open-Meteo API</a> <ExternalLink size={12} />
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
