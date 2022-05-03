import React, { useRef, useEffect, useState } from "react";
import "../assets/styles/components/map.scss";
import "mapbox-gl/dist/mapbox-gl.css";
import trackerImg from "../assets/images/tracker-marker.png";
import { Dialog, hslToRgb } from "@mui/material";
import mapboxgl from "mapbox-gl";

import Map, { Popup, GeolocateControl, Marker } from "react-map-gl";
import { ArcLayer, GeoJsonLayer } from "deck.gl";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import Hls from "hls.js";
import DeckGL from "@deck.gl/react";
import myData from "./csvjson.json";
import { PolygonLayer } from "@deck.gl/layers";
import { TripsLayer } from "@deck.gl/geo-layers";
import { ScenegraphLayer } from "@deck.gl/mesh-layers";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoicmlzaGZyb21oYXBweW1vbmsiLCJhIjoiY2wwNmx0YjNnMjkyYjNqczB3NjlqdXdvYiJ9.cmAaMzsw9G1DbhtGebVnhQ";

mapboxgl.accessToken =
  "pk.eyJ1IjoicmlzaGZyb21oYXBweW1vbmsiLCJhIjoiY2wwNmx0YjNnMjkyYjNqczB3NjlqdXdvYiJ9.cmAaMzsw9G1DbhtGebVnhQ";

const AIR_PORTS =
  "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson";

const DATAURL = {
  BUILDINGS:
    "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/trips/buildings.json", // eslint-disable-line
  TRIPS: "https://raw.githubusercontent.com/wajoud/map/main/routes.json", // eslint-disable-line
  HEATMAPS: " https://raw.githubusercontent.com/wajoud/map/main/heatmap.json",
};
const DATA_URL = "https://opensky-network.org/api/states/all";
const MODEL_URL =
  "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/scenegraph-layer/airplane.glb";
const REFRESH_TIME = 30000;

const ANIMATIONS = {
  "*": { speed: 1 },
};
const DATA_INDEX = {
  UNIQUE_ID: 0,
  CALL_SIGN: 1,
  ORIGIN_COUNTRY: 2,
  LONGITUDE: 5,
  LATITUDE: 6,
  BARO_ALTITUDE: 7,
  VELOCITY: 9,
  TRUE_TRACK: 10,
  VERTICAL_RATE: 11,
  GEO_ALTITUDE: 13,
  POSITION_SOURCE: 16,
};
function verticalRateToAngle(object) {
  // Return: -90 looking up, +90 looking down
  const verticalRate = object[DATA_INDEX.VERTICAL_RATE] || 0;
  const velocity = object[DATA_INDEX.VELOCITY] || 0;
  return (-Math.atan2(verticalRate, velocity) * 180) / Math.PI;
}

function getTooltip({ object }) {
  return (
    object &&
    `\
    Call Sign: ${object[DATA_INDEX.CALL_SIGN] || ""}
    Country: ${object[DATA_INDEX.ORIGIN_COUNTRY] || ""}
    Vertical Rate: ${object[DATA_INDEX.VERTICAL_RATE] || 0} m/s
    Velocity: ${object[DATA_INDEX.VELOCITY] || 0} m/s
    Direction: ${object[DATA_INDEX.TRUE_TRACK] || 0}`
  );
}

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0,
});

const pointLight1 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-0.144528, 49.739968, 80000],
});

const pointLight2 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-3.807751, 54.104682, 8000],
});

const lightingEffect = new LightingEffect({
  ambientLight,
  pointLight1,
  pointLight2,
});

const material = {
  ambient: 0.64,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [51, 51, 51],
};

const INITIAL_VIEW_STATE = {
  longitude: -1.415727,
  latitude: 52.232395,
  zoom: 6.6,
  minZoom: 5,
  maxZoom: 15,
  pitch: 40.5,
  bearing: -27,
};

export const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78],
];

const DEFAULT_THEME = {
  buildingColor: [74, 80, 87],
  trailColor0: [253, 128, 93],
  trailColor1: [23, 184, 190],
  material,
  effects: [lightingEffect],
};


const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

  const SIZE = 20;

const DrawMap = ({ trackerIcon, markerCoords }) => {
  const [openDilog, setOpenDilog] = useState(false);

  const [lng, setLng] = useState(77.5946);
  const [lat, setLat] = useState(12.9716);
  const [zoom, setZoom] = useState(11);
  const videoRef = useRef();
  const mapContainerRef = useRef(null);
  const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));
  const [coverage, setCoverage] = useState(1);
  const [radius, setRadius] = useState(1000);
  const [upperPercentile, setUpperPercentile] = useState(100);

  const [buildings, setBuildings] = useState(DATAURL.BUILDINGS);
  const [trips, setTrips] = useState(DATAURL.TRIPS);
  const [trailLength, setTrailLength] = useState(180);
  const [loopLength] = useState(1800);
  const [animationSpeed] = useState(1);
  const [theme] = useState(DEFAULT_THEME);
  const [data, setData] = useState(null);
  const [timer, setTimer] = useState({});
  const [showPopup, setShowPopup] = React.useState(true);

  useEffect(() => {
    fetch(DATA_URL)
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp && resp.states && timer.id !== null) {
          // In order to keep the animation smooth we need to always return the same
          // objects in the exact same order. This function will discard new objects
          // and only update existing ones.
          let sortedData = resp.states;
          if (data) {
            const dataAsObj = {};
            sortedData.forEach(
              (entry) => (dataAsObj[entry[DATA_INDEX.UNIQUE_ID]] = entry)
            );
            sortedData = data.map(
              (entry) => dataAsObj[entry[DATA_INDEX.UNIQUE_ID]] || entry
            );
          }

          setData(sortedData);

          // if (onDataLoad) {
          //   onDataLoad(sortedData.length);
          // }
        }
      })
      .finally(() => {
        timer.nextTimeoutId = setTimeout(
          () => setTimer({ id: timer.nextTimeoutId }),
          REFRESH_TIME
        );
      });

    return () => {
      clearTimeout(timer.nextTimeoutId);
      timer.id = null;
    };
  }, [timer]);

  const handleVideoPlay = (videoRef, url) => {
    if (openDilog) {
      var videoSrc = url
        ? url
        : "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8";
      if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(videoRef);
        hls.play();
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.src = videoSrc;
      }
    }
  };

  const [time, setTime] = useState(0);
  const [animation] = useState({});
  const landCover = [
    [
      [-74.0, 12.9716],
      [-74.02, 12.9716],
      [-74.02, 12.9716],
      [-74.0, 12.9716],
    ],
  ];

  const animate = () => {
    setTime((t) => (t + animationSpeed) % loopLength);
    animation.id = window.requestAnimationFrame(animate);
  };

  useEffect(() => {
    animation.id = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animation.id);
  }, [animation]);

  const onClick = (info) => {
    if (info.object) {
      // eslint-disable-next-line
      alert(
        `${info.object.properties.name} (${info.object.properties.abbrev})`
      );
    }
  };

  const scenegraph = new ScenegraphLayer({
    id: "scenegraph-layer",
    data,
    pickable: true,
    sizeScale: 20,
    scenegraph: MODEL_URL,
    _animations: ANIMATIONS,
    sizeMinPixels: 0.1,
    sizeMaxPixels: 1.5,
    getPosition: (d) => [
      d[DATA_INDEX.LONGITUDE] || 0,
      d[DATA_INDEX.LATITUDE] || 0,
      d[DATA_INDEX.GEO_ALTITUDE] || 0,
    ],
    getOrientation: (d) => [
      verticalRateToAngle(d),
      -d[DATA_INDEX.TRUE_TRACK] || 0,
      90,
    ],
    transitions: {
      getPosition: REFRESH_TIME * 0.9,
    },
  });

  const buildingLayer = new PolygonLayer({
    id: "ground",
    data: landCover,
    getPolygon: (f) => f,
    stroked: false,
    getFillColor: [0, 0, 0, 0],
  });

  const tripLayer = new TripsLayer({
    id: "trips",
    data: trips,
    getPath: (d) => d.path,
    getTimestamps: (d) => d.timestamps,
    getColor: (d) => (d.vendor === 0 ? theme.trailColor0 : theme.trailColor1),
    opacity: 0.7,
    widthMinPixels: 2,
    rounded: true,
    trailLength,
    currentTime: time,
    shadowEnabled: false,
  });

  const geoLayer = new GeoJsonLayer({
    id: "airports",
    data: AIR_PORTS,
    // Styles
    filled: true,
    pointRadiusMinPixels: 2,
    pointRadiusScale: 200,
    getPointRadius: (f) => 11 - f.properties.scalerank,
    getFillColor: [200, 0, 80, 180],
    // Interactive props
    pickable: true,
    autoHighlight: true,
    // saonClick,
  });
  const arcLayer = new ArcLayer({
    id: "arcs",
    data: AIR_PORTS,
    dataTransform: (d) => d.features.filter((f) => f.properties.scalerank < 4),
    getSourcePosition: (f) => [77.5946, 12.9716],
    getTargetPosition: (f) => f.geometry.coordinates,
    getSourceColor: [0, 128, 200],
    getTargetColor: [200, 0, 80],
    getWidth: 2,
  });

  const layers = [scenegraph, tripLayer, geoLayer, arcLayer];


  const [userLocation, setUserLocation] = useState({longitude:lng,latitude:lat});

  
// request for getting users geolocation

  const handleUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
        let location= {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        }
    setUserLocation(location);
    })
}

//Get user's location on map mount
useEffect(() => {
  handleUserLocation();
},[])

  return (
    <div className="map-container">
      <DeckGL
        initialViewState={{
          longitude: userLocation.longitude,
          latitude: userLocation.latitude,
          zoom: zoom,
          bearing: 0,
          pitch: 60,
        }}
        controller={true}
        layers={layers}
        effects={[lightingEffect]}
        // getTooltip={getTooltip}
      >
        <Map
          ref={React.useRef(null)}
          style={{ width: "100%", height: "100%" }}
          styleDiffing
          reuseMaps
          mapStyle="mapbox://styles/rishfromhappymonk/cl0t5b4db001i15polhxjnx9m"
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        >
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            showUserLocation={true}
            auto={true}
            onGeolocate={(PositionOptions) => {
              console.log("TRACKED LOCATION ======> ", PositionOptions["coords"].latitude,PositionOptions["coords"].longitude);
              setUserLocation({
                ...userLocation,
                latitude: PositionOptions["coords"].latitude,
                longitude: PositionOptions["coords"].longitude,
              });
            }}
          />
           {Object.keys(userLocation).length > 0 ? (
          <Marker
            longitude={userLocation.longitude}
            latitude={userLocation.latitude}
          >
            <svg
              height={SIZE}
              viewBox="0 0 24 24"
              style={{
                cursor: "pointer",
                fill: "#d00",
                stroke: "none",
                transform: `translate(${-SIZE / 2}px,${-SIZE}px)`,
              }}
            >
              <title>You are here</title>
              <path d={ICON} />
            </svg>
          </Marker>
        ) : null}
          {/* {showPopup && (
            <Popup
              longitude={lng}
              latitude={lat}
              anchor="bottom"
              onClose={() => setShowPopup(false)}
            >
              You are here
            </Popup>
          )} */}
        </Map>
      </DeckGL>
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
      </Dialog>
    </div>
  );
};

export default DrawMap;
