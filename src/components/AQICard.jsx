import React from 'react';
import { getAQIInfo } from '../utils/helpers';

const AQICard = ({ aqi }) => {
  const info = getAQIInfo(aqi);

  return (
    <div className={`glass-card aqi-card bg-${info.colorClass}`}>
      <div className="aqi-content">
        <div className="aqi-label">US AQI</div>
        <div className={`aqi-value text-${info.colorClass}`}>
          {aqi}
        </div>
        <div className="aqi-label" style={{ color: info.colorHex }}>
          {info.label}
        </div>
      </div>
    </div>
  );
};

export default AQICard;
