import React from 'react';

const StatisticCard = ({infoCategory, info}) => (
  <div className="card">
    <h2>{infoCategory}</h2>
    {Array.isArray(info) ? (
      <ul>
        {info.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    ) : (
      <h2>{info}</h2>
    )}
  </div>
);

export default StatisticCard;
