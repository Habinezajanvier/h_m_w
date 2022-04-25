import React, { useRef, useEffect, useState } from "react";
import "../assets/styles/components/map.scss";
import trackerImg from "../assets/images/tracker-marker.png";
import { Dialog, hslToRgb } from "@mui/material";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import Hls from "hls.js";
mapboxgl.accessToken =
  "pk.eyJ1IjoicmlzaGZyb21oYXBweW1vbmsiLCJhIjoiY2wwNmx0YjNnMjkyYjNqczB3NjlqdXdvYiJ9.cmAaMzsw9G1DbhtGebVnhQ";

const mapStyle = "mapbox://styles/rishfromhappymonk/cl0t5b4db001i15polhxjnx9m";

const addMarker = (
  map,
  lng,
  lat,
  popupText = "5th cross, Chickpet market, Avenue road",
  markerImg = trackerImg
) => {
  const el = document.createElement("img");

  el.src = markerImg;

  const popUpEl = document.createElement("div");
  popUpEl.className = "map-toolTip";
  popUpEl.innerText = popupText;
  popUpEl.addEventListener("click", () => {
    setOpenDilog(true);
  });

  new mapboxgl.Marker(el)
    .setLngLat([lng, lat])
    .setPopup(new mapboxgl.Popup({ offset: 25 }).setDOMContent(popUpEl))
    .addTo(map);
};

const DrawMap = ({ trackerIcon, markerCoords }) => {
  const [openDilog, setOpenDilog] = useState(false);

  const [lng, setLng] = useState(77.5946);
  const [lat, setLat] = useState(12.9716);
  const [zoom, setZoom] = useState(1.5);
  const videoRef = useRef();

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
      setOpenDilog(true);
    });

    new mapboxgl.Marker(el)
      .setLngLat([lng, lat])
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setDOMContent(popUpEl))
      .addTo(map);

    //  marker function

    markerCoords?.map(({ longitude, latitude }, i) => {
      addMarker(map, longitude, latitude);
    });

    // Clean up on unmount
    return () => map.remove();
  }, [markerCoords]);

  const handleVideoPlay = (videoRef, url) => {
    if (openDilog) {
      var videoSrc = url
        ? url
        : "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8";
      if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(videoRef);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.src = videoSrc;
      }
    }
  };

  return (
    <div className="map-container">
      <div ref={mapContainerRef} className="map-container" />

      <Dialog
        onClose={() => setOpenDilog(false)}
        open={openDilog}
        maxWidth={"lg"}
        className={"map-video-container"}
      >
        <video
          id="video"
          className={"map-streaming-player"}
          ref={(videoRef) => {
            handleVideoPlay(videoRef);
          }}
          controls={true}
        >
          {/* <source src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"/> */}
        </video>

        {/* <ReactPlayer
          className={"map-streaming-player"}
          url={
            // "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
            "https://216.48.189.5:8080/playlist.m3u8"
            // "http://192.168.52.215:8080/playlist.m3u"
            // "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
          }
          // url={"https://www.w3schools.com/html/movie.mp4"}
          // config={{
          //   file: "forceHLS",
          // }}
        /> */}
      </Dialog>
    </div>
  );
};

export default DrawMap;
