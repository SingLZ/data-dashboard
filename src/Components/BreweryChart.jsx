import React, { Component, useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const BreweryChart = ({ id, brewery_type }) => {
    const [typeData, setTypeData] = useState([]);
    useEffect(() => {
        const getBreweryType = async () => {
          const response = await fetch(
            `https://api.openbrewerydb.org/v1/breweries`);
      
          const json = await response.json();

          // Count breweries by type
          const typeCounts = json.reduce((acc, brewery) => {
            acc[brewery.brewery_type] = (acc[brewery.brewery_type] || 0) + 1;
            return acc;
          }, {});
  
          // Convert to array format for Recharts
          const chartData = Object.entries(typeCounts).map(([type, count]) => ({
            name: type,
            value: count,
          }));
          setTypeData(chartData);

        };
        getBreweryType().catch(console.error);
      }, []);
      const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF", "#FF6384"];
      return (
        <div>
           <h2>Brewery Types Distribution</h2>
      {typeData.length > 0 ? (
        <PieChart width={400} height={400}>
          <Pie
            data={typeData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {typeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      ) : (
        <p>Loading...</p>
      )}
        </div>
      );
    
  };

export default BreweryChart;
