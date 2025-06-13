import React from "react";
import { LoadScript } from "@react-google-maps/api";

const libraries = ["places","geometry"];

const GoogleMapsWrapper = ({ children }) => {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCQk7r2V3rG0KoJ9yv6ZC9yV3rG0KoJ9yV3"
      libraries={libraries}
    >
      {children}
    </LoadScript>
  );
};

export default GoogleMapsWrapper;
