import axios from 'axios';

const GEO_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const AQI_API_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality';

export const fetchPollutionData = async (cityName) => {
  try {
    // 1. Get Coordinates from City Name
    const geoResponse = await axios.get(GEO_API_URL, {
      params: {
        name: cityName,
        count: 1,
        format: 'json'
      }
    });

    if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
      throw new Error('City not found. Please check the spelling.');
    }

    const cityData = geoResponse.data.results[0];
    const { latitude, longitude, name, country } = cityData;

    // 2. Get Air Quality Data using Coordinates
    // Using US AQI as the standard 0-500 scale
    const aqiResponse = await axios.get(AQI_API_URL, {
      params: {
        latitude,
        longitude,
        current: 'us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone',
        timezone: 'auto'
      }
    });

    const currentData = aqiResponse.data.current;

    if (!currentData || currentData.us_aqi === undefined) {
      throw new Error('Air quality data not available for this location.');
    }

    return {
      city: `${name}, ${country}`,
      aqi: currentData.us_aqi,
      pollutants: {
        pm25: currentData.pm2_5,
        pm10: currentData.pm10,
        co: currentData.carbon_monoxide,
        no2: currentData.nitrogen_dioxide,
        so2: currentData.sulphur_dioxide,
        o3: currentData.ozone
      }
    };
  } catch (error) {
    if (error.response) {
      throw new Error(`API Error: ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error('Network error. Please check your connection.');
    } else {
      throw new Error(error.message || 'An unexpected error occurred.');
    }
  }
};
