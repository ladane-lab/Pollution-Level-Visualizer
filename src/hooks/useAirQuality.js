import { useState, useEffect, useCallback } from 'react';
import { fetchPollutionData } from '../services/airQualityApi';
import useLocalStorage from './useLocalStorage';

/**
 * Custom hook to manage Air Quality data fetching, caching, favorites, and recent history
 */
export function useAirQuality(initialCity = 'Pune') {
  const [city, setCity] = useState(initialCity);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useLocalStorage('airsense_recents', ['Pune', 'Pimpri-Chinchwad', 'Mumbai', 'Delhi']);
  const [favorites, setFavorites] = useLocalStorage('airsense_favorites', ['Pune', 'Pimpri-Chinchwad']);
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadData = useCallback(async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    setError(null);
    try {
      const result = await fetchPollutionData(cityName);
      setData(result);
      setCity(cityName);
      setLastUpdated(new Date());

      // Update recent searches without duplicates
      setRecentSearches((prev) => {
        const filtered = prev.filter((c) => c.toLowerCase() !== cityName.toLowerCase());
        return [cityName, ...filtered].slice(0, 8);
      });
    } catch (err) {
      setError(err.message || 'Failed to retrieve air quality data.');
    } finally {
      setLoading(false);
    }
  }, [setRecentSearches]);

  // Initial load
  useEffect(() => {
    loadData(city);
  }, [city, loadData]);

  // Toggle favorite city
  const toggleFavorite = useCallback((cityName) => {
    const target = cityName || city;
    setFavorites((prev) => {
      const exists = prev.some((c) => c.toLowerCase() === target.toLowerCase());
      if (exists) {
        return prev.filter((c) => c.toLowerCase() !== target.toLowerCase());
      } else {
        return [...prev, target];
      }
    });
  }, [city, setFavorites]);

  const isFavorite = useCallback((cityName) => {
    const target = cityName || city;
    return favorites.some((c) => c.toLowerCase() === target.toLowerCase());
  }, [city, favorites]);

  const refresh = useCallback(() => {
    loadData(city);
  }, [city, loadData]);

  return {
    city,
    setCity: loadData,
    data,
    loading,
    error,
    refresh,
    lastUpdated,
    recentSearches,
    favorites,
    toggleFavorite,
    isFavorite
  };
}

export default useAirQuality;
