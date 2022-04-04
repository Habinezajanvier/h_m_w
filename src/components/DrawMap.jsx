import React, { useRef, useEffect, useState } from "react";
import "../assets/styles/components/map.scss";
import Map, { Marker, Popup } from "react-map-gl";
import trackerImg from "../assets/images/tracker-marker.png";
import { Dialog } from "@mui/material";
import ReactPlayer from "react-player";

const mapStyle = "mapbox://styles/rishfromhappymonk/cl0t5b4db001i15polhxjnx9m";

const DrawMap = ({ trackerIcon }) => {
  const [openDilog, setOpenDilog] = useState(false);
  

  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  return (
    <div className="map-container">
      <Map
        initialViewState={{
          longitude: 77.5946,
          latitude: 12.9716,
          zoom: 10,
        }}
        mapStyle={mapStyle}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_PUBLIC_KEY}
      >
        {/*
        customization required as per UI
        
        <Popup
          longitude={-100}
          latitude={40}
          anchor="bottom"
          onClose={() => {}}
        >
          <button>abc</button>
        </Popup> */}

        <Marker key={1} longitude={77.5986} latitude={12.9716}>
          <img
            src={trackerIcon ? trackerIcon : trackerImg}
            alt="tracker"
            onClick={() => setOpenDilog(true)}
            className={"tracker-icon"}
          />
        </Marker>
        <Marker key={2} longitude={77.5446} latitude={12.9716}>
          <img
            src={trackerIcon ? trackerIcon : trackerImg}
            alt="tracker"
            onClick={() => setOpenDilog(true)}
            className={"tracker-icon"}
          />
        </Marker>
        <Marker key={3} longitude={77.5286} latitude={12.9336}>
          <div className={"tracker-icon"}>
            <img
              src={trackerIcon ? trackerIcon : trackerImg}
              alt="tracker"
              onClick={() => setOpenDilog(true)}
            />
          </div>
        </Marker>
      </Map>

      <Dialog
        onClose={() => setOpenDilog(false)}
        open={openDilog}
        maxWidth={true}
      >
        <ReactPlayer
          url={
            "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
          }
          // url={"https://www.w3schools.com/html/movie.mp4"}
          config={{
            file: "forceHLS",
          }}
        />
      </Dialog>
    </div>
  );
};

export default DrawMap;
