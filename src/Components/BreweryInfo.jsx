import React, { useEffect, useState } from "react";


const BreweryInfo = ({ id, name, city, breweryType}) => {
    const [website, setWebsite] = useState(null);
    
    useEffect(() => {
        const fetchBreweryData = async () => {
            const response = await fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`);
            const json = await response.json();
            setWebsite(json.website_url);
        };
        
        fetchBreweryData().catch(console.error);
    }, [id]);
  
    return (
        <tr>
      <td>{name}</td>
      <td>{city}</td>
      <td>{breweryType}</td>
      <td>
        {website ? (
          <a href={website} target="_blank" rel="noopener noreferrer">
            Visit Website
          </a>
        ) : (
          "N/A"
        )}
      </td>
    </tr>
      );
    };
  export default BreweryInfo;
  