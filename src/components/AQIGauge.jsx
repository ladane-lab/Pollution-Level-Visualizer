import React from 'react';
import { getAQIInfo } from '../utils/helpers';
import { Activity, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

const AQIGauge = ({ aqi, lastUpdated, isFallback }) => {
  const numericAqi = Math.round(Number(aqi) || 0);
  const info = getAQIInfo(numericAqi);

  // SVG circular gauge math:
  // Circumference for radius r=90 is 2 * PI * 90 = 565.48
  const radius = 86;
  const circumference = 2 * Math.PI * radius;
  // AQI scale runs from 0 to 500
  const percentage = Math.min(100, Math.max(0, (numericAqi / 500) * 100));
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let Icon = ShieldCheck;
  if (info.level >= 3) Icon = AlertTriangle;
  if (info.level >= 5) Icon = Activity;

  return (
    <div className="glass-card aqi-gauge-card" style={{ width: '100%', maxWidth: '100%', minWidth: 0 }}>
      {/* Background colored glow */}
      <div
        className="pulse-glow"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '240px',
          height: '240px',
          maxWidth: '80%',
          maxHeight: '80%',
          borderRadius: '50%',
          background: info.colorHex,
          filter: 'blur(75px)',
          opacity: 0.18,
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '100%', minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Air Quality Index (US EPA)
          </span>
          {isFallback ? (
            <span className="city-chip-badge" style={{ background: 'rgba(234, 179, 8, 0.2)', color: '#facc15' }}>
              Offline Mock
            </span>
          ) : (
            <span className="city-chip-badge" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>
              ● Live Sensor
            </span>
          )}
        </div>

        {/* Circular SVG Gauge */}
        <div className="aqi-circle-container">
          <svg className="aqi-circle-svg" viewBox="0 0 200 200">
            <circle
              className="aqi-circle-bg"
              cx="100"
              cy="100"
              r={radius}
            />
            <circle
              className="aqi-circle-progress"
              cx="100"
              cy="100"
              r={radius}
              stroke={info.colorHex}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{
                filter: `drop-shadow(0 0 6px ${info.colorHex}88)`
              }}
            />
          </svg>

          {/* Central readout */}
          <div className="aqi-center-stat">
            <span className="aqi-number" style={{ color: info.colorHex }}>
              {numericAqi}
            </span>
            <span className="aqi-scale-caption">0 - 500 Index</span>
          </div>
        </div>

        {/* Category Badge & Description */}
        <div
          className="aqi-category-badge"
          style={{
            background: info.bgHex,
            color: info.colorHex,
            border: `1px solid ${info.borderHex}`
          }}
        >
          <Icon size={18} />
          {info.label}
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '0.75rem', lineHeight: 1.5, textAlign: 'center' }}>
          {info.summary}
        </p>

        {lastUpdated && (
          <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            Observed: {new Date(lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AQIGauge;
