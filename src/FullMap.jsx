import React, { useRef, useState, useEffect } from "react";

const categories = {
  education: ["school", "university"],
  greenArea: ["park"],
  shop: ["shopping_mall", "store", "supermarket"],
  health: ["hospital", "clinic"],
  transport: ["bus_station", "subway_station", "train_station"],
};

const FullMap = ({ lat: latRaw, lng: lngRaw, name, image, allProducts = [] }) => {
  const lat = parseFloat(latRaw);
  const lng = parseFloat(lngRaw);

  const map1Ref = useRef(null);
  const map2Ref = useRef(null);
  const [placeDistances, setPlaceDistances] = useState([]);

  // --------------------- Map Initialization ---------------------
  useEffect(() => {
    if (!lat || !lng || !window.google) return;

    // --- Map 1: With InfoWindow
    const map1 = new window.google.maps.Map(map1Ref.current, {
      center: { lat, lng },
      zoom: 13,
    });

    const marker1 = new window.google.maps.Marker({
      position: { lat, lng },
      map: map1,
      title: name,
    });

    const infoWindow1 = new window.google.maps.InfoWindow({
      content: `
        <div style="text-align:center;">
          <img src="${image}" alt="${name}" style="width:120px;height:70px;object-fit:cover;border-radius:5px;" />
          <p style="margin:5px 0 0;">${name}</p>
        </div>
      `,
    });

    infoWindow1.open(map1, marker1);

    // --- Map 2: With all product markers
    const map2 = new window.google.maps.Map(map2Ref.current, {
      center: { lat, lng },
      zoom: 13,
    });

    new window.google.maps.Marker({
      position: { lat, lng },
      map: map2,
      title: name + " (Current Location)",
    });

    allProducts.forEach((product) => {
      const productLat = parseFloat(product.lat);
      const productLng = parseFloat(product.lng);

      if (productLat === lat && productLng === lng) return;

      if (!isNaN(productLat) && !isNaN(productLng)) {
        new window.google.maps.Marker({
          position: { lat: productLat, lng: productLng },
          map: map2,
          title: product.name,
        });
      }
    });
  }, [lat, lng, allProducts, name, image]);

  // --------------------- Place Distance Calculation ---------------------
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
        return (distanceInMeters / 1000).toFixed(1); // km
      };

      const fetchAllDistances = async () => {
        const allTypes = Object.values(categories).flat();

        const promises = allTypes.map((type) => {
          return new Promise((resolve) => {
            const request = {
              location: { lat, lng },
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
        setPlaceDistances(results.filter(Boolean));
      };

      fetchAllDistances();
    }
  }, [lat, lng]);

  return (
    <div>
      <div
        ref={map1Ref}
        style={{ width: "100%", height: "300px", marginBottom: "20px" }}
      />
      <div
        ref={map2Ref}
        style={{ width: "100%", height: "300px", marginBottom: "20px" }}
      />

      <div>
        <h4>Nearby Places</h4>
        {placeDistances.length > 0 ? (
          placeDistances.map((item, idx) => (
            <p key={idx}>
              {item.distance} km from the{" "}
              {item.type.replace("_", " ").toUpperCase()}
            </p>
          ))
        ) : (
          <p>Loading nearby places...</p>
        )}
      </div>
    </div>
  );
};

export default FullMap;
