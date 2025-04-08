import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BreweryDetail = () => {
let params = useParams();
const [fullDetails, setFullDetails] = useState(null);

useEffect(() => {
    const getBreweryDetail = async () => {
      const details = await fetch(
        `https://api.openbrewerydb.org/v1/breweries/${params.id}`);

  
      const detailsJson = await details.json();
  
      setFullDetails(detailsJson);
    };
    
    getBreweryDetail().catch(console.error);
  }, [params.id]);

  if (!fullDetails) {
    return <p>Loading...</p>;
  }
    return (
        <>
        <h1>{fullDetails.name}</h1>
        
        <div> Type of Brewery: {fullDetails.brewery_type}</div>
        <br></br>

        <div>
        This is located at{" "}
        {fullDetails.address_1}{" "} {fullDetails.city}{" "}{fullDetails.state}{" "}{fullDetails.postal_code} {fullDetails.country} 
        </div>

        <br></br>
       
        <h2>Contact Information</h2>
        <div>Phone: {fullDetails.phone}</div>
        <div>Website: {fullDetails.website_url}</div>

        </>
    );

}

export default BreweryDetail;