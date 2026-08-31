import React from 'react';
import { HeartPulse } from 'lucide-react';
import { getAQIInfo, getHealthTip } from '../utils/helpers';

const HealthTip = ({ aqi }) => {
  const tip = getHealthTip(aqi);
  const info = getAQIInfo(aqi);

  return (
    <div className={`health-tip bg-${info.colorClass}`}>
      <HeartPulse size={24} color={info.colorHex} style={{ flexShrink: 0, marginTop: '2px' }} />
      <div>
        <h3 style={{ color: info.colorHex }}>Health Recommendation</h3>
        <p>{tip}</p>
      </div>
    </div>
  );
};

export default HealthTip;
