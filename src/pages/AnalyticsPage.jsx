import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Download, 
  Copy, 
  Check, 
  FileSpreadsheet, 
  BarChart3, 
  PieChart as PieIcon, 
  ShieldAlert, 
  Calendar,
  Layers
} from 'lucide-react';
import { WHO_GUIDELINES, QUICK_CITIES } from '../utils/constants';
import { getAQIInfo, getPollutantStatus } from '../utils/helpers';
import { useToast } from '../context/ToastContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const AnalyticsPage = ({ airQuality }) => {
  const { data, city, setCity, loading } = airQuality;
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  // Radar chart data comparing each pollutant against WHO Guideline limit
  const radarData = useMemo(() => {
    if (!data?.pollutants) return [];
    return [
      {
        subject: 'PM2.5',
        Actual: Math.min(100, Number(data.pollutants.pm25 || 0)),
        WHOCap: WHO_GUIDELINES.pm25.limit,
        fullMark: 100
      },
      {
        subject: 'PM10',
        Actual: Math.min(150, Number(data.pollutants.pm10 || 0)),
        WHOCap: WHO_GUIDELINES.pm10.limit,
        fullMark: 150
      },
      {
        subject: 'NO₂',
        Actual: Math.min(80, Number(data.pollutants.no2 || 0)),
        WHOCap: WHO_GUIDELINES.no2.limit,
        fullMark: 80
      },
      {
        subject: 'SO₂',
        Actual: Math.min(60, Number(data.pollutants.so2 || 0)),
        WHOCap: WHO_GUIDELINES.so2.limit,
        fullMark: 60
      },
      {
        subject: 'O₃',
        Actual: Math.min(120, Number(data.pollutants.o3 || 0)),
        WHOCap: WHO_GUIDELINES.o3.limit,
        fullMark: 120
      }
    ];
  }, [data]);

  // Export CSV Data
  const handleExportCSV = () => {
    if (!data) return;

    const headers = ['City', 'US_AQI', 'PM2.5', 'PM10', 'CO', 'NO2', 'SO2', 'O3', 'Timestamp'];
    const row = [
      `"${data.city}"`,
      data.aqi,
      data.pollutants.pm25,
      data.pollutants.pm10,
      data.pollutants.co,
      data.pollutants.no2,
      data.pollutants.so2,
      data.pollutants.o3,
      `"${data.lastUpdated || new Date().toISOString()}"`
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), row.join(',')].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pollution_report_${data.city.split(',')[0].trim().toLowerCase()}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Environmental CSV report exported successfully!', 'success');
  };

  // Copy JSON telemetry
  const handleCopyJSON = () => {
    if (!data) return;
    navigator.clipboard?.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    showToast('Raw telemetry JSON copied to clipboard!', 'info');
    setTimeout(() => setCopied(false), 2500);
  };

  if (!data) {
    return (
      <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <p>Loading analytics data...</p>
      </div>
    );
  }

  const aqiInfo = getAQIInfo(data.aqi);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(168, 85, 247, 0.1)', color: '#c084fc', padding: '0.35rem 0.9rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.75rem', border: '1px solid rgba(168, 85, 247, 0.25)' }}>
            <TrendingUp size={14} /> In-Depth Environmental Analytics
          </div>
          <h2 className="page-hero-title">
            Pollution Metrics & WHO Compliance
          </h2>
          <p className="page-hero-subtitle">
            Comprehensive analysis of individual pollutant concentrations against World Health Organization
            threshold limits, historical trend distributions, and compliance exports.
          </p>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCopyJSON}
          >
            {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
            {copied ? 'Copied JSON' : 'Copy Telemetry'}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleExportCSV}
          >
            <Download size={16} /> Export CSV Report
          </button>
        </div>
      </div>

      {/* Target City Switcher */}
      <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', padding: '1rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Station:</span>
          <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8' }}>{data.city}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Switch:</span>
          {QUICK_CITIES.slice(0, 5).map((c) => (
            <button
              key={c.name}
              type="button"
              className={`city-chip ${city.toLowerCase().includes(c.name.toLowerCase()) ? 'active' : ''}`}
              onClick={() => setCity(c.query)}
              disabled={loading}
              style={{ fontSize: '0.78rem', padding: '0.3rem 0.7rem' }}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 KPI Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
        <div className="glass-card" style={{ borderLeft: `5px solid ${aqiInfo.colorHex}` }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>US EPA AIR QUALITY INDEX</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800, color: aqiInfo.colorHex, lineHeight: 1 }}>{data.aqi}</span>
            <span style={{ fontWeight: 700, color: aqiInfo.colorHex }}>{aqiInfo.label}</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Computed from continuous optical particle counter sensors
          </p>
        </div>

        <div className="glass-card" style={{ borderLeft: '5px solid #a855f7' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>FINE PARTICULATE (PM2.5)</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#a855f7', lineHeight: 1 }}>{data.pollutants.pm25}</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>µg/m³</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            WHO Guideline Threshold: 15 µg/m³ ({(data.pollutants.pm25 / 15).toFixed(1)}x cap)
          </p>
        </div>

        <div className="glass-card" style={{ borderLeft: '5px solid #38bdf8' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>COARSE PARTICULATE (PM10)</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#38bdf8', lineHeight: 1 }}>{data.pollutants.pm10}</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>µg/m³</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            WHO Guideline Threshold: 45 µg/m³ ({(data.pollutants.pm10 / 45).toFixed(1)}x cap)
          </p>
        </div>
      </div>

      {/* Recharts Visualizations Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1.25rem' }}>
        {/* Radar Chart: Actual vs WHO Limit */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldAlert size={18} color="#f59e0b" /> WHO Guideline vs Actual Telemetry
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Multi-axis radar comparing ambient pollutant measurements against health safety ceilings
          </p>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="rgba(255, 255, 255, 0.1)" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <PolarRadiusAxis stroke="#64748b" angle={30} domain={[0, 100]} />
                <Radar name="Observed Level" dataKey="Actual" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.45} />
                <Radar name="WHO Safe Cap" dataKey="WHOCap" stroke="#10b981" fill="#10b981" fillOpacity={0.25} />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Pollutant Audit Table */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={18} color="#38bdf8" /> WHO Environmental Compliance Audit
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Detailed breakdown of pollutant exposure factors
          </p>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--surface-border)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '0.6rem 0.5rem' }}>Pollutant</th>
                  <th style={{ padding: '0.6rem 0.5rem' }}>Value</th>
                  <th style={{ padding: '0.6rem 0.5rem' }}>WHO Limit</th>
                  <th style={{ padding: '0.6rem 0.5rem' }}>Risk Status</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(WHO_GUIDELINES).map(([key, guide]) => {
                  const val = data.pollutants[key];
                  const status = getPollutantStatus(key, val);
                  return (
                    <tr key={key} style={{ borderBottom: '1px solid var(--surface-border)' }}>
                      <td style={{ padding: '0.6rem 0.5rem', fontWeight: 600 }}>{guide.name}</td>
                      <td style={{ padding: '0.6rem 0.5rem' }}>{val !== undefined ? `${val} µg/m³` : 'N/A'}</td>
                      <td style={{ padding: '0.6rem 0.5rem', color: 'var(--text-secondary)' }}>{guide.limit} µg/m³</td>
                      <td style={{ padding: '0.6rem 0.5rem' }}>
                        <span
                          className="city-chip-badge"
                          style={{
                            background: `${status.color}22`,
                            color: status.color,
                            border: `1px solid ${status.color}44`
                          }}
                        >
                          {status.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
