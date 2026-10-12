import React from 'react';
import { 
  ShieldCheck, 
  Wind, 
  Heart, 
  AlertTriangle, 
  Activity, 
  Sprout, 
  CheckCircle2, 
  HelpCircle,
  Stethoscope,
  Info
} from 'lucide-react';
import { WHO_GUIDELINES } from '../utils/constants';

const GuidelinesPage = () => {
  const aqiCategories = [
    {
      range: '0 – 50',
      label: 'Good',
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.15)',
      description: 'Air quality is considered satisfactory, and air pollution poses little or no risk.',
      recommendation: 'Ideal conditions for all outdoor sports, workouts, and natural ventilation.'
    },
    {
      range: '51 – 100',
      label: 'Moderate',
      color: '#eab308',
      bg: 'rgba(234, 179, 8, 0.15)',
      description: 'Air quality is acceptable; however, some pollutants may cause moderate symptoms in unusually sensitive people.',
      recommendation: 'Unusually sensitive individuals should monitor respiratory comfort during prolonged exertion.'
    },
    {
      range: '101 – 150',
      label: 'Unhealthy for Sensitive Groups',
      color: '#f97316',
      bg: 'rgba(249, 115, 22, 0.15)',
      description: 'Members of sensitive groups (asthmatics, heart patients, children, elderly) may experience health effects.',
      recommendation: 'Sensitive groups should reduce heavy outdoor exertion. Keep inhalers accessible.'
    },
    {
      range: '151 – 200',
      label: 'Unhealthy',
      color: '#ef4444',
      bg: 'rgba(239, 68, 68, 0.15)',
      description: 'Everyone may begin to experience adverse health effects; sensitive groups experience more serious effects.',
      recommendation: 'Wear N95/KN95 respirator masks outdoors. Close residential windows during traffic peaks.'
    },
    {
      range: '201 – 300',
      label: 'Very Unhealthy',
      color: '#8b5cf6',
      bg: 'rgba(139, 92, 246, 0.15)',
      description: 'Health alert: Increased likelihood of adverse effects in the entire population. Triggering asthma spikes.',
      recommendation: 'Avoid strenuous outdoor activities. Utilize HEPA air purifiers indoors.'
    },
    {
      range: '301 – 500+',
      label: 'Hazardous',
      color: '#7e22ce',
      bg: 'rgba(126, 34, 206, 0.2)',
      description: 'Emergency conditions: The entire population is likely to be significantly affected. Toxic smog.',
      recommendation: 'Stay indoors with closed doors and windows. Discontinue all outdoor physical training.'
    }
  ];

  const indoorPlants = [
    { name: 'Snake Plant (Sansevieria)', filters: 'Filters Benzene, Formaldehyde & Trichloroethylene. Releases oxygen at night.' },
    { name: 'Areca Palm (Dypsis lutescens)', filters: 'Excellent natural humidifier and removes volatile airborne toxins.' },
    { name: 'Peace Lily (Spathiphyllum)', filters: 'Absorbs mold spores, ammonia, carbon monoxide, and industrial solvents.' },
    { name: 'Spider Plant (Chlorophytum)', filters: 'Resilient and highly effective at eliminating carbon monoxide and xylene.' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.35rem 0.9rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.75rem', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
          <ShieldCheck size={15} /> Educational & Clinical Health Guidelines
        </div>
        <h2 className="page-hero-title">
          Air Quality Standards & Protective Advisory
        </h2>
        <p className="page-hero-subtitle">
          Authoritative air quality indices, biological impacts of critical pollutants, and practical precautions
          based on US EPA and WHO global standards.
        </p>
      </div>

      {/* AQI Scale Matrix */}
      <div className="glass-card">
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={20} color="#38bdf8" /> US EPA Air Quality Index (AQI) Classification
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1rem' }}>
          {aqiCategories.map((cat) => (
            <div
              key={cat.range}
              className="pollutant-stat-card"
              style={{ borderLeft: `5px solid ${cat.color}`, background: 'var(--surface-hover)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: cat.color }}>
                  AQI {cat.range}
                </span>
                <span
                  className="city-chip-badge"
                  style={{ background: cat.bg, color: cat.color, border: `1px solid ${cat.color}44`, fontWeight: 700 }}
                >
                  {cat.label}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '0.5rem' }}>
                {cat.description}
              </p>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--surface-border)', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                <strong>Recommendation:</strong> {cat.recommendation}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pollutant Profiles */}
      <div className="glass-card">
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Wind size={20} color="#a855f7" /> Common Pollutants & Physiological Hazards
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1rem' }}>
          <div className="pollutant-stat-card">
            <h4 style={{ color: '#38bdf8', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.4rem' }}>
              PM2.5 (Fine Inhalable Particles)
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Microscopic particles smaller than 2.5 micrometers. Originates from vehicular diesel exhaust, power plants, and stubble burning.
              Can penetrate deep into the lung alveoli and enter the bloodstream, causing systemic inflammation, cardiovascular damage, and respiratory illness.
            </p>
          </div>

          <div className="pollutant-stat-card">
            <h4 style={{ color: '#8b5cf6', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.4rem' }}>
              PM10 (Coarse Particles & Dust)
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Inhalable particles up to 10 micrometers in size, including road dust, construction debris, pollen, and industrial emissions.
              Causes acute upper respiratory irritation, wheezing, coughing, and aggravates chronic obstructive pulmonary disease (COPD).
            </p>
          </div>

          <div className="pollutant-stat-card">
            <h4 style={{ color: '#f43f5e', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.4rem' }}>
              NO₂ (Nitrogen Dioxide)
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Reddish-brown toxic gas generated by high-temperature combustion in automobiles and industrial thermal boilers.
              Inflames airways, reduces lung function in asthmatic children, and contributes directly to acid rain and smog.
            </p>
          </div>

          <div className="pollutant-stat-card">
            <h4 style={{ color: '#10b981', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.4rem' }}>
              O₃ (Ground-Level Ozone)
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Secondary pollutant formed by photochemical reactions between sunlight, nitrogen oxides, and volatile organic compounds (VOCs).
              Triggers chest tightness, throat irritation, and worsens chronic bronchitis during hot sunny afternoons.
            </p>
          </div>
        </div>
      </div>

      {/* NASA Air Purifying Plants */}
      <div className="glass-card">
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sprout size={20} color="#10b981" /> Natural Air Purification: NASA Clean Air Study Plants
        </h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          According to NASA environmental research, these resilient indoor plants significantly reduce volatile organic compounds (VOCs) and indoor pollutants:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '1rem' }}>
          {indoorPlants.map((plant) => (
            <div key={plant.name} className="pollutant-stat-card">
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#10b981', marginBottom: '0.4rem' }}>
                🌱 {plant.name}
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {plant.filters}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuidelinesPage;
