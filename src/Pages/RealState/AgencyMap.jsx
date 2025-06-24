import React, { Fragment, useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
  borderRadius:"10px"
};

const center = {
  lat: 28.6139, // Default center (Delhi)
  lng: 77.2090,
};

const AgencyMap = () => {
    const [properties, setProperties] = useState([]);
    
      const apiUrl = import.meta.env.VITE_API_URL;
      const customerId = localStorage.getItem("tokenId") || "";
      const token = localStorage.getItem("token");
    
      const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: "AIzaSyDAc6yU2PelDIJKgzSxOJZIepi7Bx43lXw", // Replace with your actual API key
      });
    
      const getAllProperties = async () => {
        try {
          const res = await axios.get(`${apiUrl}/profile/getById/${customerId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProperties(res?.data?.data || []);
        } catch (err) {
          console.error("Error fetching properties", err);
        }
      };
    
      useEffect(() => {
        getAllProperties();
      }, []);
    
      if (!isLoaded) return <div>Loading Map...</div>;
    
  return (
      <Fragment>
          <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={6}>
            {properties?.property?.map((property) => (
              <Marker
                key={property.id}
                position={{
                  lat: parseFloat(property?.latitude),
                  lng: parseFloat(property?.longitude),
                }}
                title={property.title || "Property"}
              />
            ))}
          </GoogleMap>
        </Fragment>
  )
}

export default AgencyMap