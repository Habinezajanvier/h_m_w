import React, { useState } from "react";
import "../assets/styles/components/collapsibleLocationBar.scss";
import neuralNetworkIcon from "../assets/images/neural-network-icon.svg";
import redDotIcon from "../assets/images/red-circular-dot.png";
import greenDotIcon from "../assets/images/green-circular-dot.svg";
import downArrowIcon from "../assets/images/down-arrow-icon.png";
import upArrowIcon from "../assets/images/up-arrow-icon.png";
import DeviceDetails from "./flows/devices/DeviceDetails";

const CollapsibleDevicesBar = ({ isActive }) => {
  const [expand, setExpand] = useState(false);

  return (
    <div className="locationBar">
      <div
        className={`location-item flex justify-between ${
          expand ? "location-item-active" : ""
        }`}
      >
        <div className="flex items-center location-item-details">
          <div className="location-status">
            <img
              src={neuralNetworkIcon}
              alt="signal"
              className="location-status-signalimg"
            />
            {isActive ? (
              <img
                src={greenDotIcon}
                alt="in active"
                className="location-signal-status"
              />
            ) : (
              <img
                src={redDotIcon}
                alt="in active"
                className="location-signal-status"
              />
            )}
          </div>
          <div className="location-id c-pointer">CDD74E7</div>
        </div>
        <div>
          <img
            src={expand ? upArrowIcon : downArrowIcon}
            alt="down arrow"
            className="c-pointer"
            onClick={() => setExpand(!expand)}
          />
        </div>
      </div>
      {expand && <DeviceDetails />}
    </div>
  );
};

export default CollapsibleDevicesBar;
