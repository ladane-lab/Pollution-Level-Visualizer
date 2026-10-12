import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Wind, 
  BarChart3, 
  GitCompare, 
  TrendingUp, 
  ShieldCheck, 
  Sun, 
  Moon, 
  Menu, 
  X,
  GraduationCap
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { APP_METADATA } from '../utils/constants';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <header className="navbar-wrapper">
      {/* PCCOE MCA Academic Banner Strip */}
      <div className="academic-strip">
        <span>
          <GraduationCap size={15} /> PCET's Pimpri Chinchwad College of Engineering (PCCOE) • MCA Sem-III
        </span>
        <span className="academic-badge">
          PRN: {APP_METADATA.prn}
        </span>
        <span style={{ opacity: 0.85 }}>
          Student: {APP_METADATA.studentName}
        </span>
      </div>

      <div className="navbar">
        {/* Brand Logo */}
        <Link to="/" className="brand-link" onClick={closeMobile}>
          <div className="brand-icon-wrapper">
            <Wind size={24} />
          </div>
          <div className="brand-text">
            <h1>AirSense Pro</h1>
            <span className="brand-subtext">Pollution Level Visualizer</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav>
          <ul className="nav-links">
            <li>
              <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <BarChart3 size={17} /> Live AQI
              </NavLink>
            </li>
            <li>
              <NavLink to="/compare" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <GitCompare size={17} /> Compare
              </NavLink>
            </li>
            <li>
              <NavLink to="/analytics" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <TrendingUp size={17} /> Analytics
              </NavLink>
            </li>
            <li>
              <NavLink to="/guidelines" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <ShieldCheck size={17} /> Health Advisory
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="nav-actions">
          {/* Theme Toggle Button */}
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle visual theme"
          >
            {theme === 'dark' ? <Sun size={19} color="#f59e0b" /> : <Moon size={19} color="#6366f1" />}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="icon-btn mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobile}>
            <BarChart3 size={18} /> Live AQI Dashboard
          </NavLink>
          <NavLink to="/compare" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobile}>
            <GitCompare size={18} /> Compare Cities
          </NavLink>
          <NavLink to="/analytics" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobile}>
            <TrendingUp size={18} /> Environmental Analytics
          </NavLink>
          <NavLink to="/guidelines" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={closeMobile}>
            <ShieldCheck size={18} /> AQI Scale & Health Advisory
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Navbar;
