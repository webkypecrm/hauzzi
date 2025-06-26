import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";

const mapContainerStyle = {
  width: "100%",
  height: "650px",
  borderRadius:"10px"
};

const center = {
  lat: 28.6139, // Default center (Delhi)
  lng: 77.2090,
};

const PropertyMap = () => {
  const [properties, setProperties] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = "zaCELgL.0imfnc8mVLWwsAawjYr4rtwRx-Af50DDqtlx";

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDAc6yU2PelDIJKgzSxOJZIepi7Bx43lXw", // Replace with your actual API key
  });

  const getAllProperties = async () => {
    try {
      const res = await axios.get(`${apiUrl}/property/property?isDraft=false`, {
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
    <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={6}>
      {properties.map((property) => (
        <Marker
          key={property.id}
          position={{
            lat: parseFloat(property.latitude),
            lng: parseFloat(property.longitude),
          }}
          title={property.title || "Property"}
        />
      ))}
    </GoogleMap>
  );
};

export default PropertyMap;
