import React, { Component, useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const BreweryBar = ({ id, brewery_type }) => {
    const [typeData, setTypeData] = useState([]);
    useEffect(() => {
        const getBreweryType = async () => {
          const response = await fetch(
            `https://api.openbrewerydb.org/v1/breweries`);
      
          const json = await response.json();

           // Count breweries with and without websites
          const withWebsite = json.filter((brewery) => brewery.website_url).length;
          const withoutWebsite = json.length - withWebsite;

          const chartData = [
            { name: "With Website", value: withWebsite },
            { name: "Without Website", value: withoutWebsite},
          ];
          setTypeData(chartData);

        };
        getBreweryType().catch(console.error);
      }, []);
      const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF", "#FF6384"];
      return (
        <div>
      <h2>Brewery Website Availability</h2>
      {typeData.length > 0 ? (
        <BarChart width={400} height={300} data={typeData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      ) : (
        <p>Loading...</p>
      )}
    </div>
      );
    
  };

export default BreweryBar;