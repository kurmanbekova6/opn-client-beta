import React from "react";
import GoogleMapReact from "google-map-react";
import apiServices from "../../consts/apiServices";
import { MapsMarkerIcon } from "../../consts/icons";

const Marker = props => (
  <div className="contacts-map-marker">
    <MapsMarkerIcon />
    {props.text}
  </div>
);

const ContactMap = props => {
  const { center, zoom } = props;
  const { lat, lng } = center;
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiServices.GOOGLE_MAPS_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}
        options={{
          styles: mapStyles,
        }}
      >
        <Marker lat={lat} lng={lng} text={"Ferrero (Schweiz) AG"} />
      </GoogleMapReact>
    </div>
  );
};

export default ContactMap;

const mapStyles = [
  { stylers: [{ hue: "#007fff" }, { saturation: 89 }] },
  { featureType: "water", stylers: [{ color: "#ffffff" }] },
  {
    featureType: "administrative.country",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];
