export const getAQIInfo = (aqi) => {
  if (aqi <= 50) return { label: 'Good', colorClass: 'good', colorHex: '#22c55e' };
  if (aqi <= 100) return { label: 'Moderate', colorClass: 'moderate', colorHex: '#eab308' };
  if (aqi <= 150) return { label: 'Unhealthy for Sensitive Groups', colorClass: 'unhealthy', colorHex: '#f97316' };
  if (aqi <= 200) return { label: 'Unhealthy', colorClass: 'very-unhealthy', colorHex: '#ef4444' };
  return { label: 'Hazardous', colorClass: 'hazardous', colorHex: '#7e22ce' };
};

export const getHealthTip = (aqi) => {
  if (aqi <= 50) return 'Air quality is considered satisfactory, and air pollution poses little or no risk. Enjoy your outdoor activities!';
  if (aqi <= 100) return 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.';
  if (aqi <= 150) return 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.';
  if (aqi <= 200) return 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects. Consider reducing prolonged or heavy outdoor exertion.';
  return 'Health warnings of emergency conditions. The entire population is more likely to be affected. Avoid prolonged or heavy outdoor exertion.';
};
