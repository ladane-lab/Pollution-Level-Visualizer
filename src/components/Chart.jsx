import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const Chart = ({ pollutants }) => {
  // Format data for Recharts
  const data = [
    { name: 'PM2.5', value: pollutants.pm25, fill: '#3b82f6' },
    { name: 'PM10', value: pollutants.pm10, fill: '#8b5cf6' },
    { name: 'CO', value: pollutants.co, fill: '#ec4899' },
    { name: 'NO2', value: pollutants.no2, fill: '#f43f5e' },
    { name: 'SO2', value: pollutants.so2, fill: '#f59e0b' },
    { name: 'O3', value: pollutants.o3, fill: '#10b981' },
  ].filter(item => item.value !== undefined && item.value !== null);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'rgba(30, 41, 59, 0.9)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '10px',
          borderRadius: '8px',
          color: '#fff'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>{label}</p>
          <p style={{ margin: '5px 0 0', color: payload[0].payload.fill }}>
            {payload[0].value.toFixed(1)} μg/m³
          </p>
        </div>
      );
    }
    return null;
  };

  if (data.length === 0) return null;

  return (
    <div className="glass-card" style={{ width: '100%', maxWidth: '100%', minWidth: 0 }}>
      <h3 style={{ marginBottom: '1.25rem', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
        Pollutant Overview (µg/m³)
      </h3>
      <div style={{ width: '100%', maxWidth: '100%', minWidth: 0, height: 260 }}>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={data}
            margin={{ top: 5, right: 15, left: -10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--surface-border)" vertical={false} />
            <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
