import React, { useRef, useEffect, useState } from "react";
import "../assets/styles/components/map.scss";
import trackerImg from "../assets/images/tracker-marker.png";
import { Dialog } from "@mui/material";
import ReactPlayer from "react-player";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken =
  "pk.eyJ1IjoicmlzaGZyb21oYXBweW1vbmsiLCJhIjoiY2wwNmx0YjNnMjkyYjNqczB3NjlqdXdvYiJ9.cmAaMzsw9G1DbhtGebVnhQ";

const mapStyle = "mapbox://styles/rishfromhappymonk/cl0t5b4db001i15polhxjnx9m";

const DrawMap = ({ trackerIcon }) => {
  const [openDilog, setOpenDilog] = useState(false);

  const [lng, setLng] = useState(77.5946);
  const [lat, setLat] = useState(12.9716);
  const [zoom, setZoom] = useState(1.5);

  const mapContainerRef = useRef(null);
  const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: [lng, lat],
      zoom: 12.5,
    });

    const el = document.createElement("img");

    el.src = trackerImg;

    const popUpEl = document.createElement("div");
    popUpEl.className = "map-toolTip";
    popUpEl.innerText = "5th cross, Chickpet market, Avenue road";
    popUpEl.addEventListener("click", () => {
     setOpenDilog(true)
    });

    new mapboxgl.Marker(el)
      .setLngLat([lng, lat])
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setDOMContent(popUpEl))
      .addTo(map);

    // Clean up on unmount
    return () => map.remove();
  }, []);

  return (
    <div className="map-container">
      <div ref={mapContainerRef} className="map-container" />

      <Dialog
        onClose={() => setOpenDilog(false)}
        open={openDilog}
        maxWidth={"lg"}
        className={"map-video-container"}
      >
        <ReactPlayer
          url={
            // "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
            "http://216.48.189.5:8090/playlist.m3u8"
          }
          // url={"https://www.w3schools.com/html/movie.mp4"}
          // config={{
          //   file: "forceHLS",
          // }}
        />
      </Dialog>
    </div>
  );
};

export default DrawMap;
