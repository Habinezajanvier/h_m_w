import { useEffect } from "react";
import { Popup } from "react-map-gl";

const MapPopup = ({ locations }) => {
  return (
    <div>
      {locations?.map((location) => (
        <Popup
          key={Math.random()}
          anchor="bottom"
          longitude={Number(location.longitude)}
          latitude={Number(location.latitude)}
          style={{
            fontSize: "14px",
            lineHeight: "20px",
            color: "#56CCF22",
            marginBottom: "2rem",
          }}
        >
          <div>Popup text here</div>
        </Popup>
      ))}
    </div>
  );
};

export default MapPopup;
