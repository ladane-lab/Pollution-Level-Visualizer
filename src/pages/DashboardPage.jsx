import React, { useMemo } from 'react';
import { 
  MapPin, 
  RefreshCw, 
  Star, 
  Sparkles, 
  Share2, 
  AlertCircle, 
  Flame, 
  ExternalLink,
  BarChart2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AQIGauge from '../components/AQIGauge';
import PollutantGrid from '../components/PollutantGrid';
import ForecastChart from '../components/ForecastChart';
import HealthAdvisoryCard from '../components/HealthAdvisoryCard';
import SearchBarEnhanced from '../components/SearchBarEnhanced';
import Chart from '../components/Chart';
import { QUICK_CITIES } from '../utils/constants';
import { getAQIInfo } from '../utils/helpers';
import { useToast } from '../context/ToastContext';

const DashboardPage = ({ airQuality }) => {
  const {
    city,
    setCity,
    data,
    loading,
    error,
    refresh,
    lastUpdated,
    favorites,
    toggleFavorite,
    isFavorite
  } = airQuality;

  const { showToast } = useToast();

  const isFav = isFavorite(data?.city || city);
  const aqiInfo = useMemo(() => {
    return data ? getAQIInfo(data.aqi) : null;
  }, [data]);

  const handleShare = () => {
    if (data) {
      navigator.clipboard?.writeText(window.location.href);
      showToast(`Link for ${data.city} copied to clipboard!`, 'success');
    }
  };

  const handleToggleFav = () => {
    toggleFavorite(data?.city || city);
    showToast(
      isFav ? `Removed from saved watchlist` : `Saved ${data?.city || city} to watchlist!`,
      isFav ? 'info' : 'success'
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Hero Section */}
      <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', padding: '0.35rem 0.9rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.75rem', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
          <Sparkles size={14} /> Real-Time Open Data Environmental Telemetry
        </div>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '0.75rem' }}>
          Real-Time Air Quality & Pollution Visualizer
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.5 }}>
          Monitor live US EPA AQI levels, PM2.5/PM10 particulate metrics, health advisories, and 24-hour predictive trends.
        </p>
      </div>

      {/* Enhanced Search Input */}
      <div>
        <SearchBarEnhanced onSearch={setCity} isLoading={loading} activeCity={city} />

        {/* Quick-Pick Popular Cities Chips */}
        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginRight: '0.25rem' }}>
            Popular:
          </span>
          {QUICK_CITIES.map((c) => (
            <button
              key={c.name}
              type="button"
              className={`city-chip ${city.toLowerCase().includes(c.name.toLowerCase()) ? 'active' : ''}`}
              onClick={() => setCity(c.query)}
              disabled={loading}
            >
              {c.name}
              <span className="city-chip-badge">{c.badge}</span>
            </button>
          ))}
        </div>

        {/* Favorites Bar if user has saved items */}
        {favorites.length > 0 && (
          <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.78rem', color: '#eab308', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              <Star size={13} fill="#eab308" /> Watchlist:
            </span>
            {favorites.map((fav) => (
              <button
                key={fav}
                type="button"
                className="city-chip"
                onClick={() => setCity(fav)}
                style={{ fontSize: '0.78rem', padding: '0.25rem 0.65rem' }}
              >
                {fav}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Error Banner */}
      {error && (
        <div className="glass-card" style={{ borderLeft: '5px solid #ef4444', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fca5a5' }}>
            <AlertCircle size={24} color="#ef4444" style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 700, color: '#f87171' }}>Sensor Query Notice</div>
              <div style={{ fontSize: '0.9rem' }}>{error}</div>
            </div>
          </div>
          <button className="btn btn-secondary" onClick={() => setCity('Pune')}>
            Try Pune Dataset
          </button>
        </div>
      )}

      {/* Loading Skeleton / Spinner */}
      {loading && (
        <div className="glass-card" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <div className="spinner" style={{ width: '48px', height: '48px', border: '4px solid rgba(255,255,255,0.1)', borderTop: '4px solid #38bdf8', borderRadius: '50%', margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Querying Sensor Satellites...</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Retrieving real-time EPA AQI, particulate concentrations and weather coordinates.
          </p>
        </div>
      )}

      {/* Main Dashboard Layout when data is loaded */}
      {!loading && data && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* Header Action Bar for current city */}
          <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', padding: '1.15rem 1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ background: 'rgba(56, 189, 248, 0.15)', padding: '0.6rem', borderRadius: '12px', color: '#38bdf8' }}>
                <MapPin size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>
                  {data.city}
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Lat: {data.latitude?.toFixed(2) || '18.62'}° N • Lon: {data.longitude?.toFixed(2) || '73.80'}° E
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className={`btn ${isFav ? 'btn-secondary' : 'btn-outline'}`}
                onClick={handleToggleFav}
                style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem' }}
              >
                <Star size={16} fill={isFav ? '#eab308' : 'none'} color={isFav ? '#eab308' : 'currentColor'} />
                {isFav ? 'Favorited' : 'Add Watchlist'}
              </button>

              <button
                type="button"
                className="btn btn-outline"
                onClick={handleShare}
                style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem' }}
                title="Share link"
              >
                <Share2 size={16} /> Share
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={refresh}
                style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem' }}
                title="Refresh sensor data"
              >
                <RefreshCw size={16} /> Refresh
              </button>

              <Link
                to={`/compare?city1=${encodeURIComponent(data.city)}`}
                className="btn btn-primary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              >
                <BarChart2 size={16} /> Compare City
              </Link>
            </div>
          </div>

          {/* Grid: AQI Gauge (Left) + Pollutants Breakdown (Right) */}
          <div className="dashboard-grid">
            {/* Left Column: Animated Radial AQI Gauge & Health Tip */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <AQIGauge aqi={data.aqi} lastUpdated={lastUpdated} isFallback={data.isFallback} />
              <HealthAdvisoryCard aqi={data.aqi} />
            </div>

            {/* Right Column: Pollutants Cards & Forecast Area Chart */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="glass-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                      Live Pollutant Breakdown (µg/m³)
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      Benchmarked against World Health Organization (WHO) air quality guidelines
                    </p>
                  </div>
                </div>

                <PollutantGrid pollutants={data.pollutants} />
              </div>

              {/* 24-Hour Forecast & Trend Chart */}
              <ForecastChart hourlyData={data.hourly} />

              {/* Comparative Recharts Bar Chart */}
              <Chart pollutants={data.pollutants} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
