import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { CalendarClock } from 'lucide-react';

const ForecastChart = ({ hourlyData }) => {
  const [activeMetric, setActiveMetric] = useState('aqi');

  if (!hourlyData || hourlyData.length === 0) {
    return (
      <div className="glass-card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
        No hourly trend forecast available for this station.
      </div>
    );
  }

  const metricConfigs = {
    aqi: { key: 'aqi', label: 'US AQI Index', color: '#38bdf8', unit: 'Index' },
    pm25: { key: 'pm25', label: 'PM2.5 Concentration', color: '#a855f7', unit: 'µg/m³' },
    pm10: { key: 'pm10', label: 'PM10 Concentration', color: '#10b981', unit: 'µg/m³' }
  };

  const currentConfig = metricConfigs[activeMetric];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '10px',
          padding: '0.75rem 1rem',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
          color: '#fff'
        }}>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
            Time: {label}
          </div>
          <div style={{ fontWeight: 700, fontSize: '1rem', color: currentConfig.color }}>
            {payload[0].value} {currentConfig.unit}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card" style={{ width: '100%', maxWidth: '100%', minWidth: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem', width: '100%', minWidth: 0 }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CalendarClock size={20} color="#38bdf8" /> 24-Hour Air Quality Trend & Forecast
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Real-time past and near-term hourly sensor telemetry
          </p>
        </div>

        {/* Metric Selector Pills */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {Object.entries(metricConfigs).map(([key, cfg]) => (
            <button
              key={key}
              type="button"
              className={`city-chip ${activeMetric === key ? 'active' : ''}`}
              onClick={() => setActiveMetric(key)}
            >
              {cfg.label.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: '100%', minWidth: 0, height: 260 }}>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="metricGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={currentConfig.color} stopOpacity={0.6} />
                <stop offset="95%" stopColor={currentConfig.color} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--surface-border)" vertical={false} />
            <XAxis dataKey="time" stroke="var(--text-muted)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} tickLine={false} />
            <YAxis stroke="var(--text-muted)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={currentConfig.key}
              stroke={currentConfig.color}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#metricGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ForecastChart;
