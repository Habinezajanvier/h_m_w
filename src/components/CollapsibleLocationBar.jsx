import React, { useState } from "react";
import "../assets/styles/components/collapsibleLocationBar.scss";
import neuralNetworkIcon from "../assets/images/neural-network-icon.svg";
import redDotIcon from "../assets/images/red-circular-dot.png";
import greenDotIcon from "../assets/images/green-circular-dot.svg";
import downArrowIcon from "../assets/images/down-arrow-icon.png";
import upArrowIcon from "../assets/images/up-arrow-icon.png";
import redLocIc from "../assets/images//icons/red-loc-icon.png";

const CollapsibleLocationBar = ({ isActive }) => {
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
          <div className="location-address c-pointer">
            BDA Complex, HSR layout, Bengaluru
          </div>
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
      {expand && (
        <div className="location-activityList">
          <div className="panel-header flex items-center justify-between">
            <div className="panel-header-label">All Activities</div>
          </div>
          <ul className="activities-list">
            {[...Array(3)].map((e, i) => (
              <li className="activity-item" key={i}>
                <div className="activity-label">
                  <div className="activity-title">
                    <img
                      src={redLocIc}
                      alt="red location"
                      className="c-pointer"
                    />
                    <span
                      className="c-pointer"
                      onClick={() => {
                        //   setDetailVidew(true);
                        //   setIsLocationView(false);
                      }}
                    >
                      Your Geo location is being tracked
                    </span>
                  </div>
                  <div className="activity-time c-pointer">2 min ago</div>
                </div>
                <div className="activity-info">
                  <div className="activity-info-labels">
                    <div className="activity-member c-pointer">Members</div>
                    <div className="activity-priority c-pointer">
                      Priority 0
                    </div>
                  </div>
                  <div className="acitivity-viewDoc c-pointer">View Docs</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CollapsibleLocationBar;
