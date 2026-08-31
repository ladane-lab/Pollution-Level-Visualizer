import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import AQICard from './components/AQICard';
import PollutantCard from './components/PollutantCard';
import Chart from './components/Chart';
import HealthTip from './components/HealthTip';
import { fetchPollutionData } from './services/airQualityApi';
import { AlertCircle, MapPin } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchPollutionData(city);
      setData(result);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Check Air Quality
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Get real-time pollution levels and health recommendations for your city.
        </p>
      </div>

      <SearchBar onSearch={handleSearch} isLoading={loading} />

      {error && (
        <div className="error-message">
          <AlertCircle size={20} style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }} />
          {error}
        </div>
      )}

      {loading && (
        <div className="loading">
          <div className="spinner" style={{ width: '40px', height: '40px', border: '4px solid rgba(255,255,255,0.1)', borderTop: '4px solid #3b82f6', borderRadius: '50%' }}></div>
          <p>Fetching real-time data...</p>
        </div>
      )}

      {!loading && data && (
        <div className="dashboard">
          {/* Left Column - AQI & Health */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: 500 }}>
              <MapPin size={20} color="var(--accent)" />
              {data.city}
            </div>
            
            <AQICard aqi={data.aqi} />
            <HealthTip aqi={data.aqi} />
          </div>

          {/* Right Column - Details & Chart */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Pollutant Details</h3>
            
            <div className="pollutants-grid">
              <PollutantCard name="PM2.5" value={data.pollutants.pm25} unit="μg/m³" />
              <PollutantCard name="PM10" value={data.pollutants.pm10} unit="μg/m³" />
              <PollutantCard name="CO" value={data.pollutants.co} unit="μg/m³" />
              <PollutantCard name="NO2" value={data.pollutants.no2} unit="μg/m³" />
              <PollutantCard name="SO2" value={data.pollutants.so2} unit="μg/m³" />
              <PollutantCard name="O3" value={data.pollutants.o3} unit="μg/m³" />
            </div>

            <Chart pollutants={data.pollutants} />
          </div>
        </div>
      )}
      
      {!loading && !data && !error && (
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '4rem', opacity: 0.5 }}>
          <WindIcon />
          <p style={{ marginTop: '1rem' }}>Enter a city name above to get started</p>
        </div>
      )}
    </div>
  );
}

// Simple decorative icon
const WindIcon = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>
  </svg>
);

export default App;
