import React, { useState, useEffect } from 'react';
import { 
  GitCompare, 
  MapPin, 
  ArrowRight, 
  Trophy, 
  Loader2, 
  RefreshCw, 
  Sparkles,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { fetchPollutionData } from '../services/airQualityApi';
import { getAQIInfo } from '../utils/helpers';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const ComparePage = () => {
  const [searchParams] = useSearchParams();
  const initialCity1 = searchParams.get('city1') || 'Pune';
  const initialCity2 = searchParams.get('city2') || 'Delhi';

  const [city1Name, setCity1Name] = useState(initialCity1);
  const [city2Name, setCity2Name] = useState(initialCity2);

  const [city1Data, setCity1Data] = useState(null);
  const [city2Data, setCity2Data] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const presets = [
    { name: 'Pune vs Delhi', c1: 'Pune', c2: 'Delhi' },
    { name: 'Pimpri-Chinchwad vs Mumbai', c1: 'Pimpri-Chinchwad', c2: 'Mumbai' },
    { name: 'Bengaluru vs Delhi', c1: 'Bengaluru', c2: 'Delhi' },
    { name: 'Tokyo vs London', c1: 'Tokyo', c2: 'London' }
  ];

  const runComparison = async (c1, c2) => {
    setLoading(true);
    setError(null);
    try {
      const [res1, res2] = await Promise.all([
        fetchPollutionData(c1),
        fetchPollutionData(c2)
      ]);
      setCity1Data(res1);
      setCity2Data(res2);
    } catch (err) {
      setError(err.message || 'Failed to compare cities.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runComparison(city1Name, city2Name);
  }, []);

  const handleApply = (e) => {
    e.preventDefault();
    if (city1Name.trim() && city2Name.trim()) {
      runComparison(city1Name.trim(), city2Name.trim());
    }
  };

  const handleSelectPreset = (p) => {
    setCity1Name(p.c1);
    setCity2Name(p.c2);
    runComparison(p.c1, p.c2);
  };

  // Comparative chart dataset
  const chartData = React.useMemo(() => {
    if (!city1Data || !city2Data) return [];

    return [
      {
        pollutant: 'PM2.5',
        [city1Data.city.split(',')[0]]: city1Data.pollutants.pm25,
        [city2Data.city.split(',')[0]]: city2Data.pollutants.pm25
      },
      {
        pollutant: 'PM10',
        [city1Data.city.split(',')[0]]: city1Data.pollutants.pm10,
        [city2Data.city.split(',')[0]]: city2Data.pollutants.pm10
      },
      {
        pollutant: 'NO₂',
        [city1Data.city.split(',')[0]]: city1Data.pollutants.no2,
        [city2Data.city.split(',')[0]]: city2Data.pollutants.no2
      },
      {
        pollutant: 'SO₂',
        [city1Data.city.split(',')[0]]: city1Data.pollutants.so2,
        [city2Data.city.split(',')[0]]: city2Data.pollutants.so2
      },
      {
        pollutant: 'O₃',
        [city1Data.city.split(',')[0]]: city1Data.pollutants.o3,
        [city2Data.city.split(',')[0]]: city2Data.pollutants.o3
      }
    ];
  }, [city1Data, city2Data]);

  // Determine which city has cleaner air
  const comparisonVerdict = React.useMemo(() => {
    if (!city1Data || !city2Data) return null;
    const diff = Math.abs(city1Data.aqi - city2Data.aqi);
    const better = city1Data.aqi < city2Data.aqi ? city1Data : city2Data;
    const worse = city1Data.aqi < city2Data.aqi ? city2Data : city1Data;
    const pct = worse.aqi > 0 ? Math.round(((worse.aqi - better.aqi) / worse.aqi) * 100) : 0;

    return {
      betterCity: better.city.split(',')[0],
      worseCity: worse.city.split(',')[0],
      diff,
      pct
    };
  }, [city1Data, city2Data]);

  const info1 = city1Data ? getAQIInfo(city1Data.aqi) : null;
  const info2 = city2Data ? getAQIInfo(city2Data.aqi) : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', padding: '0.35rem 0.9rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.75rem', border: '1px solid rgba(99, 102, 241, 0.25)' }}>
          <GitCompare size={15} /> Multi-City Telemetry Analysis
        </div>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
          Side-by-Side City Pollution Comparison
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Benchmark particulate concentration, US EPA AQI index, and health risk profiles across two municipal regions.
        </p>
      </div>

      {/* Input Selection Card */}
      <div className="glass-card">
        <form onSubmit={handleApply} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">
              <span>Primary City</span>
            </label>
            <input
              type="text"
              className="form-input"
              value={city1Name}
              onChange={(e) => setCity1Name(e.target.value)}
              placeholder="e.g. Pune"
              required
            />
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">
              <span>Benchmark City</span>
            </label>
            <input
              type="text"
              className="form-input"
              value={city2Name}
              onChange={(e) => setCity2Name(e.target.value)}
              placeholder="e.g. Delhi"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ height: '44px' }}
          >
            {loading ? <Loader2 size={18} className="spinner" /> : <GitCompare size={18} />}
            Compare Now
          </button>
        </form>

        {/* Quick Presets */}
        <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Suggested Comparisons:
          </span>
          {presets.map((p) => (
            <button
              key={p.name}
              type="button"
              className="city-chip"
              onClick={() => handleSelectPreset(p)}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="glass-card" style={{ borderLeft: '5px solid #ef4444', color: '#f87171' }}>
          {error}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <Loader2 size={36} className="spinner" style={{ color: '#38bdf8', margin: '0 auto 1rem' }} />
          <p>Fetching and cross-referencing multi-city air quality data...</p>
        </div>
      )}

      {/* Comparison Results */}
      {!loading && city1Data && city2Data && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* Winner Verdict Banner */}
          {comparisonVerdict && (
            <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(56, 189, 248, 0.1))', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem 1.5rem' }}>
              <div style={{ background: '#10b981', color: 'white', padding: '0.75rem', borderRadius: '12px' }}>
                <Trophy size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Cleaner Air Winner: {comparisonVerdict.betterCity}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  {comparisonVerdict.betterCity} has <strong>{comparisonVerdict.pct}% cleaner air</strong> than {comparisonVerdict.worseCity} right now (AQI difference of {comparisonVerdict.diff} points).
                </p>
              </div>
            </div>
          )}

          {/* Side by Side Scorecards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {/* City 1 Card */}
            <div className="glass-card" style={{ borderTop: `5px solid ${info1.colorHex}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{city1Data.city}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Location A</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: info1.colorHex, lineHeight: 1 }}>
                    {city1Data.aqi}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>US AQI</span>
                </div>
              </div>

              <div className="aqi-category-badge" style={{ background: info1.bgHex, color: info1.colorHex, border: `1px solid ${info1.borderHex}`, width: '100%', justifyContent: 'center' }}>
                {info1.label}
              </div>

              <div style={{ marginTop: '1.25rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="pollutant-stat-card">
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>PM2.5 Level</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>{city1Data.pollutants.pm25} µg/m³</span>
                </div>
                <div className="pollutant-stat-card">
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>PM10 Level</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>{city1Data.pollutants.pm10} µg/m³</span>
                </div>
              </div>
            </div>

            {/* City 2 Card */}
            <div className="glass-card" style={{ borderTop: `5px solid ${info2.colorHex}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{city2Data.city}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Location B</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: info2.colorHex, lineHeight: 1 }}>
                    {city2Data.aqi}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>US AQI</span>
                </div>
              </div>

              <div className="aqi-category-badge" style={{ background: info2.bgHex, color: info2.colorHex, border: `1px solid ${info2.borderHex}`, width: '100%', justifyContent: 'center' }}>
                {info2.label}
              </div>

              <div style={{ marginTop: '1.25rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="pollutant-stat-card">
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>PM2.5 Level</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>{city2Data.pollutants.pm25} µg/m³</span>
                </div>
                <div className="pollutant-stat-card">
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>PM10 Level</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>{city2Data.pollutants.pm10} µg/m³</span>
                </div>
              </div>
            </div>
          </div>

          {/* Comparative Multi-Bar Recharts Chart */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1.25rem' }}>
              Comparative Pollutant Breakdown (µg/m³)
            </h3>
            <div style={{ width: '100%', height: '320px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.08)" vertical={false} />
                  <XAxis dataKey="pollutant" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
                  <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
                  <Tooltip
                    contentStyle={{
                      background: 'rgba(15, 23, 42, 0.95)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '10px' }} />
                  <Bar dataKey={city1Data.city.split(',')[0]} fill="#38bdf8" radius={[4, 4, 0, 0]} />
                  <Bar dataKey={city2Data.city.split(',')[0]} fill="#a855f7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparePage;
