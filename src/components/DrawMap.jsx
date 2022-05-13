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
import MapPins from "./MapPins";
import MapPopup from "./MapPopup";
import { saveUserLocation } from "../redux/modules/dashboard/dashboardSlice";
import { useDispatch } from "react-redux";

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

const DrawMap = ({
  trackerIcon,
  markerCoords,
  activityLocation,
  locations,
}) => {
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

  const dispatch = useDispatch();

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

  //listen to activity location change

  useEffect(() => {
    if (activityLocation.longitude && activityLocation.latitude) {
      const { kinect, ...rest } = activityLocation;
      console.log(activityLocation, rest);
      setUserLocation(rest);
    }
  }, [activityLocation]);

  const [animation] = useState({});

  const animate = () => {
    setTime((t) => (t + animationSpeed) % loopLength);
    animation.id = window.requestAnimationFrame(animate);
  };

  useEffect(() => {
    animation.id = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animation.id);
  }, [animation]);

  const [userLocation, setUserLocation] = useState({
    longitude: lng,
    latitude: lat,
  });

  // request for getting users geolocation

  const handleUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setUserLocation(location);
      dispatch(saveUserLocation(location));
    });
  };

  //Get user's location on map mount
  useEffect(() => {
    handleUserLocation();
  }, [userLocation]);

  const dummylocation = [
    {
      state: "Alaska",
      latitude: 61.385,
      longitude: -152.2683,
    },
    {
      state: "Alabama",
      latitude: 32.799,
      longitude: -86.8073,
    },
    {
      state: "Arkansas",
      latitude: 34.9513,
      longitude: -92.3809,
    },
    {
      state: "Arizona",
      latitude: 33.7712,
      longitude: -111.3877,
    },
    {
      state: "California",
      latitude: 36.17,
      longitude: -119.7462,
    },
    {
      state: "Colorado",
      latitude: 39.0646,
      longitude: -105.3272,
    },
    {
      state: "Connecticut",
      latitude: 41.5834,
      longitude: -72.7622,
    },
    {
      state: "Delaware",
      latitude: 39.3498,
      longitude: -75.5148,
    },
    {
      state: "Florida",
      latitude: 27.8333,
      longitude: -81.717,
    },
    {
      state: "Georgia",
      latitude: 32.9866,
      longitude: -83.6487,
    },
    {
      state: "Hawaii",
      latitude: 21.1098,
      longitude: -157.5311,
    },
    {
      state: "Iowa",
      latitude: 42.0046,
      longitude: -93.214,
    },
    {
      state: "Idaho",
      latitude: 44.2394,
      longitude: -114.5103,
    },
    {
      state: "Illinois",
      latitude: 40.3363,
      longitude: -89.0022,
    },
    {
      state: "Indiana",
      latitude: 39.8647,
      longitude: -86.2604,
    },
    {
      state: "Kansas",
      latitude: 38.5111,
      longitude: -96.8005,
    },
    {
      state: "Kentucky",
      latitude: 37.669,
      longitude: -84.6514,
    },
    {
      state: "Louisiana",
      latitude: 31.1801,
      longitude: -91.8749,
    },
    {
      state: "Massachusetts",
      latitude: 42.2373,
      longitude: -71.5314,
    },
    {
      state: "Maryland",
      latitude: 39.0724,
      longitude: -76.7902,
    },
    {
      state: "Maine",
      latitude: 44.6074,
      longitude: -69.3977,
    },
    {
      state: "Michigan",
      latitude: 43.3504,
      longitude: -84.5603,
    },
    {
      state: "Minnesota",
      latitude: 45.7326,
      longitude: -93.9196,
    },
    {
      state: "Missouri",
      latitude: 38.4623,
      longitude: -92.302,
    },
    {
      state: "Mississippi",
      latitude: 32.7673,
      longitude: -89.6812,
    },
    {
      state: "Montana",
      latitude: 46.9048,
      longitude: -110.3261,
    },
    {
      state: "North Carolina",
      latitude: 35.6411,
      longitude: -79.8431,
    },
    {
      state: "North Dakota",
      latitude: 47.5362,
      longitude: -99.793,
    },
    {
      state: "Nebraska",
      latitude: 41.1289,
      longitude: -98.2883,
    },
    {
      state: "New Hampshire",
      latitude: 43.4108,
      longitude: -71.5653,
    },
    {
      state: "New Jersey",
      latitude: 40.314,
      longitude: -74.5089,
    },
    {
      state: "New Mexico",
      latitude: 34.8375,
      longitude: -106.2371,
    },
    {
      state: "Nevada",
      latitude: 38.4199,
      longitude: -117.1219,
    },
    {
      state: "New York",
      latitude: 42.1497,
      longitude: -74.9384,
    },
    {
      state: "Ohio",
      latitude: 40.3736,
      longitude: -82.7755,
    },
    {
      state: "Oklahoma",
      latitude: 35.5376,
      longitude: -96.9247,
    },
    {
      state: "Oregon",
      latitude: 44.5672,
      longitude: -122.1269,
    },
    {
      state: "Pennsylvania",
      latitude: 40.5773,
      longitude: -77.264,
    },
    {
      state: "Rhode Island",
      latitude: 41.6772,
      longitude: -71.5101,
    },
    {
      state: "South Carolina",
      latitude: 33.8191,
      longitude: -80.9066,
    },
    {
      state: "South Dakota",
      latitude: 44.2853,
      longitude: -99.4632,
    },
    {
      state: "Tennessee",
      latitude: 35.7449,
      longitude: -86.7489,
    },
    {
      state: "Texas",
      latitude: 31.106,
      longitude: -97.6475,
    },
    {
      state: "Utah",
      latitude: 40.1135,
      longitude: -111.8535,
    },
    {
      state: "Virginia",
      latitude: 37.768,
      longitude: -78.2057,
    },
    {
      state: "Vermont",
      latitude: 44.0407,
      longitude: -72.7093,
    },
    {
      state: "Washington",
      latitude: 47.3917,
      longitude: -121.5708,
    },
    {
      state: "Wisconsin",
      latitude: 44.2563,
      longitude: -89.6385,
    },
    {
      state: "West Virginia",
      latitude: 38.468,
      longitude: -80.9696,
    },
    {
      state: "Wyoming",
      latitude: 42.7475,
      longitude: -107.2085,
    },
  ];
  return (
    <div className="map-container">
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
            setUserLocation({
              ...userLocation,
              latitude: PositionOptions["coords"].latitude,
              longitude: PositionOptions["coords"].longitude,
            });
            dispatch(
              saveUserLocation({
                latitude: PositionOptions["coords"].latitude,
                longitude: PositionOptions["coords"].longitude,
              })
            );
          }}
        />

        <MapPins locations={dummylocation} />
        {/* <MapPopup locations={dummylocation} /> */}
      </Map>
    </div>
  );
};

export default DrawMap;
