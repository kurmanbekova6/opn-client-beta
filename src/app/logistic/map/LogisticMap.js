import React from "react";
import GoogleMapReact from "google-map-react";
import logisticMap from "../../../consts/logisticMap";
import logisticMarkers from "../../../consts/logisticMarkers";
import MarkerItem from "./MarkerItem";

const Marker = props => (
  <MarkerItem
    color={props.color}
    size={props.size}
    city={props.city}
    address={props.address}
    partners={props.partners}
  />
);

const LogisticMap = props => {
  const { center, zoom } = props;
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: logisticMap.GOOGLE_MAPS_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}
        options={{
          styles: mapStyles,
        }}
        hoverDistance={120}
      >
        {logisticMarkers.map((item, index) => {
          return (
            <Marker
              key={index}
              lat={item.lat}
              lng={item.lng}
              color={item.color}
              size={item.size}
              city={item.city}
              address={item.address}
              partners={item.partners}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

export default LogisticMap;

const mapStyles = [
  { stylers: [{ hue: "#007fff" }, { saturation: 89 }] },
  { featureType: "water", stylers: [{ color: "#ffffff" }] },
  {
    featureType: "administrative.country",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];
