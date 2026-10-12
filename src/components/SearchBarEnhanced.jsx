import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Loader2, X, Navigation } from 'lucide-react';
import { searchCities } from '../services/airQualityApi';
import useDebounce from '../hooks/useDebounce';

const SearchBarEnhanced = ({ onSearch, isLoading, activeCity }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearchingSuggestions, setIsSearchingSuggestions] = useState(false);
  const containerRef = useRef(null);

  const debouncedTerm = useDebounce(searchTerm, 300);

  // Auto-close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch geocoding suggestions when user types
  useEffect(() => {
    let isCancelled = false;

    const fetchSuggestions = async () => {
      if (debouncedTerm.trim().length >= 2) {
        setIsSearchingSuggestions(true);
        try {
          const results = await searchCities(debouncedTerm);
          if (!isCancelled) {
            setSuggestions(results);
            setShowDropdown(results.length > 0);
          }
        } catch {
          if (!isCancelled) setSuggestions([]);
        } finally {
          if (!isCancelled) setIsSearchingSuggestions(false);
        }
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    };

    fetchSuggestions();

    return () => {
      isCancelled = true;
    };
  }, [debouncedTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setShowDropdown(false);
      onSearch(searchTerm.trim());
    }
  };

  const handleSelectSuggestion = (city) => {
    setSearchTerm(city.displayName);
    setShowDropdown(false);
    onSearch(city.displayName);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSuggestions([]);
    setShowDropdown(false);
  };

  // Browser Geolocation Quick Detect
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    onSearch('Pune'); // Fallback default for Maharashtra/PCMC
  };

  return (
    <div className="search-form-wrapper" ref={containerRef}>
      <form onSubmit={handleSubmit}>
        <div className="search-input-group">
          <MapPin size={20} color="#38bdf8" style={{ flexShrink: 0, marginRight: '0.5rem' }} />
          
          <input
            type="text"
            className="search-input-field"
            placeholder="Search city, area or station (e.g. Pimpri, Pune, Delhi, Tokyo)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
            disabled={isLoading}
          />

          {isSearchingSuggestions && (
            <Loader2 size={18} className="spinner" style={{ color: 'var(--text-muted)', marginRight: '0.5rem' }} />
          )}

          {searchTerm && (
            <button
              type="button"
              className="icon-btn"
              onClick={handleClear}
              style={{ width: '28px', height: '28px', marginRight: '0.4rem', border: 'none' }}
              title="Clear input"
            >
              <X size={15} />
            </button>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading || !searchTerm.trim()}
            style={{ padding: '0.55rem 1.1rem', borderRadius: 'var(--radius-full)' }}
          >
            {isLoading ? <Loader2 size={18} className="spinner" /> : <Search size={18} />}
            Search
          </button>
        </div>
      </form>

      {/* Geocoding Dropdown Suggestions */}
      {showDropdown && suggestions.length > 0 && (
        <div className="search-suggestions-dropdown">
          {suggestions.map((item) => (
            <div
              key={item.id}
              className="suggestion-item"
              onClick={() => handleSelectSuggestion(item)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <MapPin size={16} color="#38bdf8" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {item.admin1 ? `${item.admin1}, ` : ''}{item.country}
                  </div>
                </div>
              </div>
              <span className="city-chip-badge">Select</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBarEnhanced;
