import React, { useState } from 'react';
import { HeartPulse, Baby, Stethoscope, User, AlertCircle, Wind, CheckCircle2 } from 'lucide-react';
import { getAQIInfo, getHealthTip, getSensitiveGroupAdvisory } from '../utils/helpers';

const HealthAdvisoryCard = ({ aqi }) => {
  const [activeTab, setActiveTab] = useState('general');
  const info = getAQIInfo(aqi);
  const generalTip = getHealthTip(aqi);
  const advisories = getSensitiveGroupAdvisory(aqi);

  const tabs = [
    { id: 'general', label: 'General Public', icon: User },
    { id: 'children', label: 'Children & Schools', icon: Baby },
    { id: 'asthmatic', label: 'Asthma & Patients', icon: Stethoscope },
    { id: 'elderly', label: 'Elderly Citizens', icon: HeartPulse }
  ];

  return (
    <div className="glass-card" style={{ borderLeft: `5px solid ${info.colorHex}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <div style={{ background: info.bgHex, padding: '0.6rem', borderRadius: '12px', color: info.colorHex }}>
          <HeartPulse size={24} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
            Health Impact & Advisory
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Guidance calibrated for current Air Quality Level ({info.label})
          </p>
        </div>
      </div>

      {/* Cohort Tabs */}
      <div style={{ display: 'flex', gap: '0.4rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.5rem', marginBottom: '1rem', overflowX: 'auto' }}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              className={`city-chip ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Advisory Text */}
      <div style={{ background: 'var(--surface-hover)', borderRadius: 'var(--radius-md)', padding: '1.15rem', minHeight: '80px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <CheckCircle2 size={22} style={{ color: info.colorHex, flexShrink: 0 }} />
        <p style={{ fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
          {advisories[activeTab]}
        </p>
      </div>

      {/* Actionable Protective checklist */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))', gap: '0.65rem', marginTop: '1.25rem' }}>
        <div className="city-chip" style={{ cursor: 'default', justifyContent: 'flex-start', padding: '0.6rem 0.8rem' }}>
          <Wind size={15} color="#38bdf8" />
          <span>{info.level >= 4 ? 'Close Windows & Seal Doors' : 'Natural Ventilation OK'}</span>
        </div>
        <div className="city-chip" style={{ cursor: 'default', justifyContent: 'flex-start', padding: '0.6rem 0.8rem' }}>
          <AlertCircle size={15} color={info.level >= 3 ? '#f97316' : '#10b981'} />
          <span>{info.level >= 3 ? 'Wear N95 Mask Outdoors' : 'Mask Not Required'}</span>
        </div>
      </div>
    </div>
  );
};

export default HealthAdvisoryCard;
