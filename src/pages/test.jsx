import React from "react";
import FaceRecoginitionPanel from "../components/FaceRecoginitionPanel";
import Header from "../components/Header";
import ShowMnemonic from "./signup/ShowMnemonic";

import mapboxgl from "mapbox-gl";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

// const styles = {
// display: 'flex',
// alignItems: 'center',
// justifyContent: 'center',
// minHeight: '100vh'
// }

mapboxgl.accessToken =
  "pk.eyJ1IjoicmlzaGZyb21oYXBweW1vbmsiLCJhIjoiY2wwNmx0YjNnMjkyYjNqczB3NjlqdXdvYiJ9.cmAaMzsw9G1DbhtGebVnhQ";

const Test = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div className="sidebar" >
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div
        ref={mapContainer}
        style={{ height: "400px" }}
        className="map-container"
      />
    </div>
  );
};

export default Test;
