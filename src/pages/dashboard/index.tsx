import React, { useState } from "react";
import "../../assets/styles/dashboard.scss";
import Header from "../../components/Header";
import Map from "../../components/DrawMap";
import filterIc from "../../assets/images/filter-icon.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import redLocIc from "../../assets/images/red-loc-icon.png";
import greenExecIc from "../../assets/images/green-circular-exclamtion.svg";
import yellowExecIc from "../../assets/images/yellow-circular-exclamtion.svg";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import smallCCTVIc from "../../assets/images/cctv-camera-icon.png";
import smallManPic from "../../assets/images/man-sm.png";
import menInteranceImg from "../../assets/images/men-interance.png";
import manInSuitImg from "../../assets/images/buisness-man-going.png";
import cryptoIc from "../../assets/images/crypto-icon.svg";
import { Avatar, Badge } from "@mui/material";
import downArrowIcon from "../../assets/images/down-arrow-icon.png";
import neuralNetworkIcon from "../../assets/images/neural-network-icon.svg";
import redDotIcon from "../../assets/images/red-circular-dot.png";
import greenDotIcon from "../../assets/images/green-circular-dot.svg";
import CollapsibleLocationBar from "../../components/CollapsibleLocationBar";
import crystalIcon from "../../assets/images/hexgon-crystal.png";

const dummyMapData = {};

const Dashboard = () => {
  const [detailView, setDetailVidew] = useState(false);
  const [isActivityShutterDown, setIsActivityShutterDown] = useState(false);
  const [isLocationView, setIsLocationView] = useState(false);
  const [LocTrackerIcon, setLocTrackerIcon] = useState(null);

  return (
    <div className="dashboard">
      <div className="headerContainer">
        <Header onLocationClick={() => setIsLocationView(true)} />
      </div>
      <div className="dashboard-map-bg">
        <Map trackerIcon={isLocationView ? crystalIcon : false} />

        {/* Side Panel */}
        {!isLocationView && (
          <div
            className={`dashboard-side-panel ${
              detailView ? "detail-side-panel" : ""
            }`}
          >
            {!detailView ? (
              <>
                <div className="panel-header flex items-center justify-between">
                  <div className="panel-header-label">All Activities</div>
                  <div className="flex items-center panel-header-ext">
                    <div className="activities-filter c-pointer">
                      <img src={filterIc} alt="filter icon" />
                    </div>
                    <div className="close-activity c-pointer">
                      <KeyboardArrowDownIcon style={{ color: "lightgray" }} />
                    </div>
                  </div>
                </div>
                <ul className="activities-list">
                  {[...Array(10)].map((e, i) => (
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
                            onClick={() => setDetailVidew(true)}
                          >
                            Your Geo location is being tracked
                          </span>
                        </div>
                        <div className="activity-time c-pointer">2 min ago</div>
                      </div>
                      <div className="activity-info">
                        <div className="activity-info-labels">
                          <div className="activity-member c-pointer">
                            Members
                          </div>
                          <div className="activity-priority c-pointer">
                            Priority 0
                          </div>
                        </div>
                        <div className="acitivity-viewDoc c-pointer">
                          View Docs
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="activity-detail-view">
                <div className="panel-header">
                  <div className="panel-header-label flex items-center">
                    <KeyboardBackspaceIcon
                      className="activitydetail-back-icon c-pointer"
                      onClick={() => setDetailVidew(false)}
                      style={{ color: "#fff" }}
                    />
                    <span>Activity</span>
                  </div>
                </div>
                <div className="activity-label">
                  <div className="activity-title">
                    <img
                      src={redLocIc}
                      alt="red location"
                      className="c-pointer"
                    />
                    <span
                      className="c-pointer"
                      onClick={() => setDetailVidew(true)}
                    >
                      Your geolocation is being tracked
                    </span>
                  </div>
                  <div className="device-name c-pointer">Device DC8364</div>
                </div>
                <div className="flex justify-between device-details-list">
                  <div className="device-details flex-1">
                    <div className="flex items-center justify-center">
                      <img src={smallCCTVIc} alt="cctv" />
                      <span className="device-detials-label">Camera no.</span>
                    </div>
                    <div className="device-details-info">Camera 2</div>
                  </div>
                  <div className="device-details flex-1 rec-border">
                    <div className="flex items-center justify-center">
                      <img src={smallCCTVIc} alt="cctv" />
                      <span className="device-detials-label">Rec. time</span>
                    </div>
                    <div className="device-details-info">09:30 am</div>
                  </div>
                  <div className="device-details flex-1">
                    <div className="flex items-center justify-center">
                      <img src={smallCCTVIc} alt="cctv" />
                      <span className="device-detials-label">Area</span>
                    </div>
                    <div className="device-details-info">Jefferson sq.</div>
                  </div>
                </div>

                {/* more info */}
                <div className="moreInfo">
                  <div className="moreInfo-title">More information</div>
                  <ul className="moreInfo-details flex items-center justify-between">
                    <li>
                      <div className="moreInfoLabel">Identity</div>
                      <div className="moreInfoValue">ID7651</div>
                    </li>
                    <li>
                      <div className="moreInfoLabel">Facial identity</div>
                      <div className="moreInfoValue">
                        <Badge
                          badgeContent={0}
                          color="success"
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                        >
                          <Avatar alt="Cindy Baker" src={smallManPic} />
                        </Badge>
                      </div>
                    </li>
                    <li>
                      <div className="moreInfoLabel">Category</div>
                      <div className="moreInfoValue">Known</div>
                    </li>
                    <li>
                      <div className="moreInfoLabel">Name</div>
                      <div className="moreInfoValue">Rajesh</div>
                    </li>
                  </ul>

                  {/* images */}
                  <div className="infoImages">
                    <div className="infoImgTitle">Images</div>
                    <ul className="infoImgList">
                      <li className="infoImgItem">
                        <img
                          src={menInteranceImg}
                          alt="camera photos"
                          className="c-pointer"
                        />
                      </li>
                      <li className="infoImgItem">
                        <img
                          src={manInSuitImg}
                          alt="camera photos"
                          className="c-pointer"
                        />
                      </li>
                    </ul>
                  </div>

                  {/* people involved */}
                  <div className="peopleInvolved">
                    <div className="moreInfo-title">People invovled</div>
                    <ul className="moreInfo-details flex items-center justify-between">
                      <li>
                        <div className="moreInfoValue">ID7651</div>
                      </li>
                      <li>
                        <div className="moreInfoValue">
                          <Badge
                            badgeContent={0}
                            color="success"
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                          >
                            <Avatar alt="Cindy Baker" src={smallManPic} />
                          </Badge>
                        </div>
                      </li>
                      <li>
                        <div className="moreInfoValue">Employee</div>
                      </li>
                      <li>
                        <div className="moreInfoValue">Trevor A.</div>
                      </li>
                    </ul>
                    <ul className="moreInfo-details flex items-center justify-between">
                      <li>
                        <div className="moreInfoValue">ID7651</div>
                      </li>
                      <li>
                        <div className="moreInfoValue">
                          <Badge
                            badgeContent={0}
                            color="success"
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                          >
                            <Avatar alt="Cindy Baker" src={smallManPic} />
                          </Badge>
                        </div>
                      </li>
                      <li>
                        <div className="moreInfoValue">Employee</div>
                      </li>
                      <li>
                        <div className="moreInfoValue">Trevor A.</div>
                      </li>
                    </ul>
                    <ul className="moreInfo-details flex items-center justify-between">
                      <li>
                        <div className="moreInfoValue">ID7651</div>
                      </li>
                      <li>
                        <div className="moreInfoValue">
                          <Badge
                            badgeContent={0}
                            color="success"
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                          >
                            <Avatar alt="Cindy Baker" src={smallManPic} />
                          </Badge>
                        </div>
                      </li>
                      <li>
                        <div className="moreInfoValue">Employee</div>
                      </li>
                      <li>
                        <div className="moreInfoValue">Trevor A.</div>
                      </li>
                    </ul>
                  </div>

                  {/* crypto details */}
                  <div className="cryptoDetails">
                    <div className="cryptoDetails-header flex items-center">
                      <img
                        src={cryptoIc}
                        alt="crypto icon"
                        width={30}
                        height={32}
                      />
                      <span className="cryptoDetails-title">
                        Crypto details
                      </span>
                    </div>
                    <ul className="cryptoDetails-list">
                      <li className="cryptoDetail-item">
                        <span className="cryptoDetails-key">Type:</span>
                        <span className="cryptoDetails-value">
                          "BbsBlsSignatureProof2020"
                        </span>
                      </li>
                      <li className="cryptoDetail-item">
                        <span className="cryptoDetails-key">Created:</span>
                        <span className="cryptoDetails-value">
                          {" "}
                          "2020-04-25"
                        </span>
                      </li>
                      <li className="cryptoDetail-item">
                        <div className="cryptoDetails-key">Proof Value:</div>
                        <div className="cryptoDetails-value">
                          "kTTbA3pmDa6Qia/JkOnIXDLmoBz3vsi7L5t3DWySI/VLmBqleJ/Tbus5RoyiDERDBEh5rnACXlnOqJ/U8yFQFtcp/mBCc2FtKNPHae9jKIv1dm9K9QK1F3GI1AwyGoUfjLWrkGDObO1ouNAhpEd0+et+qiOf2j8p3MTTtRRx4Hgjcl0jXCq7C7R5/nLpgimHAAAAdAx4ouhMk7v9dXijCIMaG0deicn6fLoq3GcNHuH5X1j22LU/hDu7vvPnk/6JLkZ1xQAAAAIPd1tu598L/K3NSy0zOy6obaojEnaqc1R5Ih/6ZZgfEln2a6tuUp4wePExI1DGHqwj3j2lKg31a/6bSs7SMecHBQdgIYHnBmCYGNQnu/LZ9TFV56tBXY6YOWZgFzgLDrApnrFpixEACM9rwrJ5ORtxAAAAAgE4gUIIC9aHyJNa5TBklMOh6lvQkMVLXa/vEl+3NCLXblxjgpM7UEMqBkE9/QcoD3Tgmy+z0hN+4eky1RnJsEg="
                        </div>
                      </li>
                      <li className="cryptoDetail-item">
                        <span className="cryptoDetails-key">
                          Verification Method:
                        </span>
                        <span className="cryptoDetails-value">
                          {" "}
                          "did:example:489398593#test"
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Location Panel */}
        {isLocationView && (
          <>
            <div
              className="location-panel-exit flex items-center justify-center c-pointer"
              onClick={() => setIsLocationView(false)}
            >
              <KeyboardBackspaceIcon />
            </div>
            <div className={"location-panel"}>
              <ul className="location-list flex fd-column">
                {[...Array(10)].map((e, i) => (
                  <React.Fragment key={i}>
                    <li>
                      <CollapsibleLocationBar isActive={true} />
                    </li>

                    <li>
                      <CollapsibleLocationBar isActive={false} />
                    </li>
                  </React.Fragment>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
