import React from 'react';
import { WHO_GUIDELINES } from '../utils/constants';
import { getPollutantStatus } from '../utils/helpers';
import { Info } from 'lucide-react';

const PollutantGrid = ({ pollutants }) => {
  if (!pollutants) return null;

  const pollutantList = [
    { key: 'pm25', name: 'PM2.5', label: 'Fine Particles', value: pollutants.pm25, unit: 'µg/m³' },
    { key: 'pm10', name: 'PM10', label: 'Respirable Dust', value: pollutants.pm10, unit: 'µg/m³' },
    { key: 'no2', name: 'NO₂', label: 'Nitrogen Dioxide', value: pollutants.no2, unit: 'µg/m³' },
    { key: 'so2', name: 'SO₂', label: 'Sulphur Dioxide', value: pollutants.so2, unit: 'µg/m³' },
    { key: 'co', name: 'CO', label: 'Carbon Monoxide', value: pollutants.co, unit: 'µg/m³' },
    { key: 'o3', name: 'O₃', label: 'Ozone', value: pollutants.o3, unit: 'µg/m³' }
  ];

  return (
    <div className="pollutants-cards-grid">
      {pollutantList.map((item) => {
        const status = getPollutantStatus(item.key, item.value);
        const guide = WHO_GUIDELINES[item.key];
        const val = item.value !== undefined && item.value !== null ? Number(item.value).toFixed(1) : 'N/A';
        
        // Progress bar percentage relative to 3x WHO guideline
        const maxScale = (guide?.limit || 50) * 3;
        const fillPercentage = Math.min(100, Math.max(5, (Number(item.value || 0) / maxScale) * 100));

        return (
          <div key={item.key} className="pollutant-stat-card">
            <div className="pollutant-name-row">
              <div>
                <span className="pollutant-key">{item.name}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>
                  {item.label}
                </span>
              </div>
              <span
                className="pollutant-who-badge"
                style={{
                  background: `${status.color}22`,
                  color: status.color,
                  border: `1px solid ${status.color}55`
                }}
              >
                {status.status}
              </span>
            </div>

            <div className="pollutant-value-row">
              <span className="pollutant-val" style={{ color: status.color }}>
                {val}
              </span>
              <span className="pollutant-unit">{item.unit}</span>
            </div>

            {/* WHO Guideline Progress bar */}
            <div>
              <div className="progress-bar-track">
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${fillPercentage}%`,
                    backgroundColor: status.color
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                <span>WHO Cap: {status.limit}</span>
                <span>{status.ratio}x limit</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PollutantGrid;
