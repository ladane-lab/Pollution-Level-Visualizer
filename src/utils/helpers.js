import { WHO_GUIDELINES } from './constants';

/**
 * Returns comprehensive AQI category information based on US EPA standard scale (0-500).
 */
export const getAQIInfo = (aqi) => {
  const numericAqi = Math.round(Number(aqi) || 0);

  if (numericAqi <= 50) {
    return {
      label: 'Good',
      level: 1,
      colorClass: 'good',
      colorHex: '#10b981', // emerald-500
      bgHex: 'rgba(16, 185, 129, 0.15)',
      borderHex: 'rgba(16, 185, 129, 0.4)',
      summary: 'Air quality is satisfactory and poses minimal or no health risk.',
      badgeText: 'Clean Air'
    };
  }
  if (numericAqi <= 100) {
    return {
      label: 'Moderate',
      level: 2,
      colorClass: 'moderate',
      colorHex: '#eab308', // amber-500
      bgHex: 'rgba(234, 179, 8, 0.15)',
      borderHex: 'rgba(234, 179, 8, 0.4)',
      summary: 'Air quality is acceptable. Very sensitive individuals may experience minor irritation.',
      badgeText: 'Acceptable'
    };
  }
  if (numericAqi <= 150) {
    return {
      label: 'Unhealthy for Sensitive Groups',
      level: 3,
      colorClass: 'unhealthy',
      colorHex: '#f97316', // orange-500
      bgHex: 'rgba(249, 115, 22, 0.15)',
      borderHex: 'rgba(249, 115, 22, 0.4)',
      summary: 'Members of sensitive groups (asthma, children, elderly) may experience health effects.',
      badgeText: 'Sensitive Warning'
    };
  }
  if (numericAqi <= 200) {
    return {
      label: 'Unhealthy',
      level: 4,
      colorClass: 'very-unhealthy',
      colorHex: '#ef4444', // red-500
      bgHex: 'rgba(239, 68, 68, 0.15)',
      borderHex: 'rgba(239, 68, 68, 0.4)',
      summary: 'Everyone may begin to experience health effects; sensitive groups experience more serious effects.',
      badgeText: 'Unhealthy'
    };
  }
  if (numericAqi <= 300) {
    return {
      label: 'Very Unhealthy',
      level: 5,
      colorClass: 'hazardous',
      colorHex: '#8b5cf6', // purple-500
      bgHex: 'rgba(139, 92, 246, 0.15)',
      borderHex: 'rgba(139, 92, 246, 0.4)',
      summary: 'Health alert: The risk of health effects is increased for all citizens.',
      badgeText: 'Health Alert'
    };
  }
  return {
    label: 'Hazardous',
    level: 6,
    colorClass: 'hazardous',
    colorHex: '#7e22ce', // purple-700
    bgHex: 'rgba(126, 34, 206, 0.2)',
    borderHex: 'rgba(126, 34, 206, 0.5)',
    summary: 'Emergency health warning: Entire population is likely to be significantly affected. Stay indoors!',
    badgeText: 'Emergency'
  };
};

/**
 * Returns tailored health tip text for general population
 */
export const getHealthTip = (aqi) => {
  const numericAqi = Number(aqi) || 0;
  if (numericAqi <= 50) {
    return 'Air quality is ideal. Ideal conditions for outdoor workouts, cycling, and natural room ventilation.';
  }
  if (numericAqi <= 100) {
    return 'Air quality is acceptable. Exceptionally sensitive people should consider reducing prolonged outdoor exertion.';
  }
  if (numericAqi <= 150) {
    return 'Sensitive groups should reduce prolonged outdoor exertion. Wear a mask if commuting through high-traffic corridors.';
  }
  if (numericAqi <= 200) {
    return 'Wear N95/FFP2 masks outdoors. Keep indoor windows closed and run HEPA air purifiers if available.';
  }
  if (numericAqi <= 300) {
    return 'Avoid all strenuous outdoor activity. Sensitive individuals should remain in clean indoor air spaces.';
  }
  return 'Hazardous conditions: Avoid going outside unless strictly necessary. Keep all doors and windows tightly sealed.';
};

/**
 * Granular health advisory grouped by sensitive cohorts
 */
export const getSensitiveGroupAdvisory = (aqi) => {
  const numericAqi = Number(aqi) || 0;
  if (numericAqi <= 50) {
    return {
      general: 'No restrictions. Enjoy outdoor sports and natural fresh air.',
      children: 'Completely safe for outdoor play and physical training.',
      asthmatic: 'Normal breathing conditions; carry standard preventer as usual.',
      elderly: 'Great time for outdoor walks and gardening.'
    };
  }
  if (numericAqi <= 100) {
    return {
      general: 'Generally safe. Minor haze may be visible.',
      children: 'Safe for school activities, monitor if prone to seasonal allergies.',
      asthmatic: 'Keep rescue inhalers accessible during early morning hours.',
      elderly: 'Safe for moderate walks in parks and green zones.'
    };
  }
  if (numericAqi <= 150) {
    return {
      general: 'Consider cutting back heavy outdoor running or cardio.',
      children: 'Limit outdoor sports in afternoon and evening rush hours.',
      asthmatic: 'Elevated risk of coughing and shortness of breath; stay indoors.',
      elderly: 'Avoid busy roads and highway pedestrian crossings.'
    };
  }
  if (numericAqi <= 200) {
    return {
      general: 'Wear an N95 mask outside. Avoid cycling in peak traffic.',
      children: 'Move all school sports indoors; prevent prolonged playground exposure.',
      asthmatic: 'High alert: Stay strictly indoors with air filtration.',
      elderly: 'Avoid any outdoor morning or evening walks.'
    };
  }
  return {
    general: 'High health risk. Stay indoors, run air filtration, keep windows sealed.',
    children: 'Strictly keep indoors; schools should suspend outdoor assemblies.',
    asthmatic: 'Emergency risk of asthma exacerbation. Seek medical advice if breathing difficulties arise.',
    elderly: 'Remain indoors in temperature and air-regulated rooms.'
  };
};

/**
 * Evaluates pollutant level against WHO 24-hr guideline
 */
export const getPollutantStatus = (key, value) => {
  const guide = WHO_GUIDELINES[key.toLowerCase()];
  if (!guide || value === undefined || value === null) {
    return { ratio: 1, status: 'Normal', color: '#10b981', limit: 'N/A' };
  }

  const ratio = (value / guide.limit).toFixed(1);
  if (value <= guide.limit) {
    return { ratio, status: 'Within WHO Limit', color: '#10b981', limit: `${guide.limit} ${guide.unit}` };
  } else if (value <= guide.limit * 2) {
    return { ratio, status: `${ratio}x WHO Guideline`, color: '#eab308', limit: `${guide.limit} ${guide.unit}` };
  } else if (value <= guide.limit * 4) {
    return { ratio, status: `${ratio}x WHO Guideline`, color: '#f97316', limit: `${guide.limit} ${guide.unit}` };
  } else {
    return { ratio, status: `${ratio}x WHO Guideline (High)`, color: '#ef4444', limit: `${guide.limit} ${guide.unit}` };
  }
};

/**
 * Comprehensive Validation function for Custom Station / Incident Report Form
 */
export const validateStationForm = (values) => {
  const errors = {};

  if (!values.name || values.name.trim().length < 3) {
    errors.name = 'Station/Incident name must be at least 3 characters long.';
  }

  if (!values.location || values.location.trim().length < 3) {
    errors.location = 'Location or address is required.';
  }

  if (!values.reportedBy || values.reportedBy.trim().length < 2) {
    errors.reportedBy = 'Reporter or organization name is required.';
  }

  if (values.contact) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.contact.trim())) {
      errors.contact = 'Please enter a valid email address (e.g., student@pccoepune.org).';
    }
  }

  const pm25Num = Number(values.pm25);
  if (values.pm25 === '' || isNaN(pm25Num) || pm25Num < 0 || pm25Num > 1000) {
    errors.pm25 = 'PM2.5 must be a valid positive concentration (0 to 1000 µg/m³).';
  }

  const pm10Num = Number(values.pm10);
  if (values.pm10 === '' || isNaN(pm10Num) || pm10Num < 0 || pm10Num > 1500) {
    errors.pm10 = 'PM10 must be a valid positive concentration (0 to 1500 µg/m³).';
  }

  if (!values.notes || values.notes.trim().length < 10) {
    errors.notes = 'Notes / Description must be at least 10 characters detailing the environmental observation.';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

/**
 * Calculates estimated AQI from PM2.5 and PM10 using standard EPA breakpoint formula approximation
 */
export const calculateEstimatedAQI = (pm25, pm10) => {
  const p25 = Number(pm25) || 0;
  const p10 = Number(pm10) || 0;
  
  // Simplified EPA breakpoint calculation for PM2.5
  let aqi25 = 0;
  if (p25 <= 12.0) aqi25 = (50 / 12.0) * p25;
  else if (p25 <= 35.4) aqi25 = 50 + ((100 - 50) / (35.4 - 12.1)) * (p25 - 12.1);
  else if (p25 <= 55.4) aqi25 = 100 + ((150 - 100) / (55.4 - 35.5)) * (p25 - 35.5);
  else if (p25 <= 150.4) aqi25 = 150 + ((200 - 150) / (150.4 - 55.5)) * (p25 - 55.5);
  else if (p25 <= 250.4) aqi25 = 200 + ((300 - 200) / (250.4 - 150.5)) * (p25 - 150.5);
  else aqi25 = 300 + ((500 - 300) / (500.4 - 250.5)) * (p25 - 250.5);

  // Simplified EPA breakpoint for PM10
  let aqi10 = 0;
  if (p10 <= 54) aqi10 = (50 / 54) * p10;
  else if (p10 <= 154) aqi10 = 50 + ((100 - 50) / (154 - 55)) * (p10 - 55);
  else if (p10 <= 254) aqi10 = 100 + ((150 - 100) / (254 - 155)) * (p10 - 155);
  else if (p10 <= 354) aqi10 = 150 + ((200 - 150) / (354 - 255)) * (p10 - 255);
  else if (p10 <= 424) aqi10 = 200 + ((300 - 200) / (424 - 355)) * (p10 - 355);
  else aqi10 = 300 + ((500 - 300) / (604 - 425)) * (p10 - 425);

  return Math.min(500, Math.round(Math.max(aqi25, aqi10)));
};

/**
 * Format ISO date string into readable friendly format
 */
export const formatDate = (isoString) => {
  if (!isoString) return 'Just now';
  try {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return isoString;
  }
};
