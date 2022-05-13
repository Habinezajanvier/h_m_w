import { useEffect } from "react";
import { Marker } from "react-map-gl";
import mapPinIcon from "../assets/images/map/map-pin.svg";

const MapPins = ({ locations }) => {
  useEffect(() => {}, [locations.length]);
  return (
    <div>
      {locations?.map((location) => (
        <Marker
          key={Math.random()}
          longitude={Number(location.longitude)}
          latitude={Number(location.latitude)}
          anchor="bottom"
        >
          <img src={mapPinIcon} alt="" />
        </Marker>
      ))}
    </div>
  );
};

export default MapPins;
