import React from 'react';

const PollutantCard = ({ name, value, unit }) => {
  return (
    <div className="pollutant-card">
      <span className="p-name">{name}</span>
      <span className="p-value">{value !== undefined && value !== null ? value.toFixed(1) : 'N/A'}</span>
      <span className="p-unit">{unit}</span>
    </div>
  );
};

export default PollutantCard;
