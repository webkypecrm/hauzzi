import React, { useRef, useState, useEffect } from "react";

const Map = ({ lat, lng }) => {
   const [placeDistances, setPlaceDistances] = useState([]);

  const categories = {
    education: ["school", "university"],
    greenArea: ["park"],
    shop: ["shopping_mall", "store", "supermarket"],
    health: ["hospital", "clinic"],
    transport: ["bus_station", "subway_station", "train_station"],
  };


  useEffect(() => {
    if (lat && lng && window.google) {
      const map = new window.google.maps.Map(document.createElement("div"));
      const service = new window.google.maps.places.PlacesService(map);

      const calculateDistance = (placeLocation) => {
        const productLocation = new window.google.maps.LatLng(lat, lng);
        const targetLocation = new window.google.maps.LatLng(
          placeLocation.lat(),
          placeLocation.lng()
        );

        const distanceInMeters =
          window.google.maps.geometry.spherical.computeDistanceBetween(
            productLocation,
            targetLocation
          );
        return (distanceInMeters / 1000).toFixed(1); // in km
      };

      const fetchAllDistances = async () => {
        const allTypes = Object.values(categories).flat();

        const promises = allTypes.map((type) => {
          return new Promise((resolve) => {
            const request = {
              location: { lat: parseFloat(lat), lng: parseFloat(lng) },
              radius: 2000,
              type,
            };

            service.nearbySearch(request, (results, status) => {
              if (
                status === window.google.maps.places.PlacesServiceStatus.OK &&
                results.length > 0
              ) {
                const nearest = results[0];
                const distance = calculateDistance(nearest.geometry.location);
                resolve({
                  type,
                  name: nearest.name,
                  distance,
                });
              } else {
                resolve(null);
              }
            });
          });
        });

        const results = await Promise.all(promises);
        const filtered = results.filter(Boolean);
        setPlaceDistances(filtered);
      };

      fetchAllDistances();
    }
  }, [lat, lng]);
  return (
        <div>
      {placeDistances.length > 0 ? (
        placeDistances.map((item, idx) => (
          <p key={idx}  >
            {item.distance} km from the{" "}
            {item.type.replace("_", " ").toUpperCase()}
          </p>
        ))
      ) : (
        <p>Loading nearby places...</p>
      )}
    </div>
  );
};

export default Map;

