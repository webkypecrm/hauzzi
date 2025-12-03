// import React, { useEffect, useState } from "react";
// import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
// import axios from "axios";

// const mapContainerStyle = {
//   width: "100%",
//   height: "650px",
//   borderRadius: "10px",
// };

// const center = {
//   lat: 28.6139,
//   lng: 77.2090,
// };

// const PropertyMap = () => {
//   const [properties, setProperties] = useState([]);
//   const apiUrl = import.meta.env.VITE_API_URL;
//   const token = "zaCELgL.0imfnc8mVLWwsAawjYr4rtwRx-Af50DDqtlx";

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: "AIzaSyDAc6yU2PelDIJKgzSxOJZIepi7Bx43lXw",
//   });

//   const getAllProperties = async () => {
//     try {
//       const res = await axios.get(`${apiUrl}/property/property?isDraft=false`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Filter out properties without valid lat/lng
//       const validProperties = (res?.data?.data || []).filter(
//         (p) => p.latitude && p.longitude
//       );

//       setProperties(validProperties);
//     } catch (err) {
//       console.error("Error fetching properties", err);
//     }
//   };

//   useEffect(() => {
//     getAllProperties();
//   }, []);

//   if (!isLoaded) return <div>Loading Map...</div>;

//   return (
//     <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={6}>
//       {properties.map((property) => {
//         const lat = parseFloat(property.latitude);
//         const lng = parseFloat(property.longitude);

//         if (!lat || !lng) return null; // skip invalid coords

//         return (
//           <Marker key={property.id} position={{ lat, lng }} title={property.title || property.name || "Property"}>
//             <InfoWindow position={{ lat, lng }}>
//               <div style={{ textAlign: "center" }}>
//                 <img
//                   src={property.images?.[0] || "/placeholder.png"}
//                   alt={property.title || property.name || "Property"}
//                   style={{ width: "120px", height: "70px", objectFit: "cover", borderRadius: "5px" }}
//                 />
//                 <p style={{ margin: "5px 0 0" }}>{property.title || property.name || "Property"}</p>
//               </div>
//             </InfoWindow>
//           </Marker>
//         );
//       })}
//     </GoogleMap>
//   );
// };

// export default PropertyMap;




import React, { useEffect, useState, useRef } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import axios from "axios";

const mapContainerStyle = {
  width: "100%",
  height: "650px",
  borderRadius: "10px",
};

const defaultCenter = {
  lat: 28.6139,
  lng: 77.209,
};

const PropertyMap = ({ selectedLocation }) => {
  const [properties, setProperties] = useState([]);
  const mapRef = useRef(null);

  const apiUrl = import.meta.env.VITE_API_URL;
  const token = "zaCELgL.0imfnc8mVLWwsAawjYr4rtwRx-Af50DDqtlx";

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDAc6yU2PelDIJKgzSxOJZIepi7Bx43lXw",
  });

  useEffect(() => {
    getAllProperties();
  }, []);

  const getAllProperties = async () => {
    try {
      const res = await axios.get(`${apiUrl}/property/property?isDraft=false`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const validProperties = (res?.data?.data || []).filter(
        (p) => p.latitude && p.longitude
      );

      setProperties(validProperties);
    } catch (err) {
      console.error("Error fetching properties", err);
    }
  };

  useEffect(() => {
    if (mapRef.current && selectedLocation) {
      mapRef.current.panTo(selectedLocation);
      mapRef.current.setZoom(14);
    }
  }, [selectedLocation]);

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={defaultCenter}
      zoom={6}
      onLoad={(map) => (mapRef.current = map)}
    >
      {properties.map((property) => {
        const lat = parseFloat(property.latitude);
        const lng = parseFloat(property.longitude);

        if (!lat || !lng) return null;

        return (
          <Marker
            key={property.id}
            position={{ lat, lng }}
            title={property.title || property.name}
          >
            <InfoWindow position={{ lat, lng }}>
              <div style={{ textAlign: "center" }}>
                <img
                  src={property.images?.[0] || "/placeholder.png"}
                  alt={property.title || property.name || "Property"}
                  style={{
                    width: "120px",
                    height: "70px",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
                <p style={{ margin: "5px 0 0" }}>
                  {property.title || property.name || "Property"}
                </p>
              </div>
            </InfoWindow>
          </Marker>
        );
      })}
    </GoogleMap>
  );
};

export default PropertyMap;



// import React, { useEffect, useState, useRef } from "react";
// import {
//   GoogleMap,
//   Marker,
//   InfoWindow,
//   useJsApiLoader,
// } from "@react-google-maps/api";
// import axios from "axios";

// const mapContainerStyle = {
//   width: "100%",
//   height: "650px",
//   borderRadius: "10px",
// };

// const defaultCenter = {
//   lat: 28.6139,
//   lng: 77.209,
// };

// const PropertyMap = ({ selectedLocation }) => {
//   const [properties, setProperties] = useState([]);
//   const [activeMarker, setActiveMarker] = useState(null); // FIX
//   const mapRef = useRef(null);

//   const apiUrl = import.meta.env.VITE_API_URL;
//   const token = "zaCELgL.0imfnc8mVLWwsAawjYr4rtwRx-Af50DDqtlx";

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: "AIzaSyDAc6yU2PelDIJKgzSxOJZIepi7Bx43lXw",
//   });

//   useEffect(() => {
//     getAllProperties();
//   }, []);

//   const getAllProperties = async () => {
//     try {
//       const res = await axios.get(`${apiUrl}/property/property?isDraft=false`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const validProperties = (res?.data?.data || []).filter(
//         (p) => p.latitude && p.longitude
//       );

//       setProperties(validProperties);
//     } catch (err) {
//       console.error("Error fetching properties", err);
//     }
//   };

//   useEffect(() => {
//     if (mapRef.current && selectedLocation) {
//       mapRef.current.panTo(selectedLocation);
//       mapRef.current.setZoom(14);
//     }
//   }, [selectedLocation]);

//   if (!isLoaded) return <div>Loading Map...</div>;

//   return (
//     <GoogleMap
//       mapContainerStyle={mapContainerStyle}
//       center={defaultCenter}
//       zoom={6}
//       onLoad={(map) => (mapRef.current = map)}
//     >
//       {properties.map((property) => {
//         const lat = parseFloat(property.latitude);
//         const lng = parseFloat(property.longitude);

//         if (!lat || !lng) return null;

//         return (
//           <Marker
//             key={property.id}
//             position={{ lat, lng }}
//             title={property.property_name || property.title || property.name}
//             onClick={() => setActiveMarker(property.id)} // FIX
//           >
//             {activeMarker === property.id && (
//               <InfoWindow
//                 position={{ lat, lng }}
//                 onCloseClick={() => setActiveMarker(null)}
//               >
//                 <div style={{ textAlign: "center" }}>

//                   {/* IMAGE FIX */}
//                   <img
//                     src={
//                       property.images?.[0]?.image
//                         ? apiUrl + "/" + property.images[0].image
//                         : "/placeholder.png"
//                     }
//                     alt={
//                       property.property_name ||
//                       property.title ||
//                       property.name ||
//                       "Property"
//                     }
//                     style={{
//                       width: "120px",
//                       height: "70px",
//                       objectFit: "cover",
//                       borderRadius: "5px",
//                     }}
//                   />

//                   {/* NAME FIX */}
//                   <p style={{ margin: "5px 0 0" }}>
//                     {property.property_name ||
//                       property.title ||
//                       property.name ||
//                       "Property"}
//                   </p>
//                 </div>
//               </InfoWindow>
//             )}
//           </Marker>
//         );
//       })}
//     </GoogleMap>
//   );
// };

// export default PropertyMap;
