import "../assets/styles/components/header.scss";
import MenuIcon from "@mui/icons-material/Menu";
import avatarImg from "../assets/images/man-profile.png";
import notify from "../assets/images/notification.svg";
import locationImg from "../assets/images/location.svg";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useRef, useState } from "react";
import { Card, Dialog } from "@mui/material";
import profileImage from "../assets/images/man-avatar-md.png";
import editProfileIc from "../assets/images/pencil-pad-edit-icon.svg";
import Button from "./Button";
import Sidebar from "./Sidebar";
import weather from "../assets/images/weather.png";
import Notification from "./Notification";
import { useOnClickOutside } from "../utils/hooks/useOnClickOutside";
import { useSelector, useDispatch } from "react-redux";

import {
  notification as notificationPanel,
  sidePanel,
} from "../redux/modules/dashboard/dashboardSlice";

const HLabel = ({ icon, text, isLong, onClick }) => {
  return (
    <div
      className={`h-label flex items-center c-pointer ${
        isLong ? "h-label-long" : "h-label-short"
      }`}
      onClick={() => onClick && onClick()}
    >
      <div className="h-label-icon flex">{icon}</div>
      <div className="h-lable-text m-auto">{text}</div>
    </div>
  );
};

const Header = ({ onLocationClick }) => {
  const [isProfileSettingOpened, setIsProfileSettingOpened] = useState(false);
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const notificationRef = useRef(null);
  const isNotificationPanelActive = useSelector((state) => {
    state.dashboard.isNotificationPanelActive;
  });

  const isSidePanelActive = useSelector(
    (state) => state.dashboard.isSidePanelActive
  );

  const dispatch = useDispatch();

  useOnClickOutside(notificationRef, () => {
    setShowNotification(false);
    dispatch(notificationPanel(false));
  });

  useEffect(() => {
    setShowNotification(isNotificationPanelActive);
    console.log(isNotificationPanelActive);
  }, [isNotificationPanelActive]);

  useEffect(() => {
    console.log("sidepanel", isSidePanelActive);
    setIsSidebarActive(isSidePanelActive);
  }, [isSidePanelActive]);



  return (
    <>
      <div className="header flex justify-between items-center">
        <div className="flex items-center h-left">
          <div className="ham">
            <MenuIcon
              className="c-pointer"
              onClick={() => {
                setIsSidebarActive(true);
                dispatch(sidePanel(true));
              }}
            />
          </div>
          <div className="h-labels flex ">
            <HLabel
              isLong={true}
              icon={<img src={locationImg} alt="location" />}
              onClick={() => onLocationClick && onLocationClick()}
              text={<span className="h-location">BTM Layout,Bengaluru</span>}
            />
            <HLabel
              isLong={false}
              icon={<img src={weather} alt="weather" />}
              text={<span className="h-weather">23° C, Sunny</span>}
            />
          </div>
        </div>
        <div className="flex items-center h-right ">
          <div
            className="notification flex "
            onClick={() => {
              setShowNotification(true);
              dispatch(notificationPanel(true));
            }}
          >
            <img src={notify} alt="notification" className="c-pointer" />
            {showNotification && (
              <Card className="notificaton-pannel" ref={notificationRef}>
                {[...Array(3)].map((e, i) => (
                  <React.Fragment key={i}>
                    <Notification />
                  </React.Fragment>
                ))}
              </Card>
            )}
          </div>
          <HLabel
            isLong={false}
            icon={
              <img src={avatarImg} alt="profile" className="h-profileImg" />
            }
            text={<span className="profile">rajan@ulip</span>}
            onClick={() => setIsProfileSettingOpened(true)}
          />
        </div>
      </div>

      {/* Profile Setting dilog (Update Profile) */}
      <Dialog
        className="pofileSetting-dilog"
        open={isProfileSettingOpened}
        maxWidth={"lg"}
      >
        <div className="profileSetting-container">
          <div className="profileSetting-head flex justify-between">
            <div className="profileDilog-heading">Profile</div>
            <div>
              <CloseIcon
                className="c-pointer"
                onClick={() => setIsProfileSettingOpened(false)}
              />
            </div>
          </div>

          <div className="profileDetails flex justify-between ">
            <div className="profileDetails-row ">
              <div className="profileDetails-img">
                <img src={profileImage} alt="profile pic" />
                <img
                  src={editProfileIc}
                  alt="edit icon"
                  className="profilePic-edit c-pointer"
                />
              </div>
              <div className="profileDetails-chokidrInfo">
                <div className="profileDetails-chokidrLabel c-pointer">
                  Chokidr ID
                </div>
                <div className="profileDetails-chokidrId c-pointer">
                  ABZ883YGFSZHN3
                </div>
              </div>
            </div>
            <div className="profileDetails-row flex-1">
              <ul className="profileDetails-list">
                <li>
                  <div className="profileDetails-filed-lable">First name</div>
                  <div className="profileDetails-filed-value">Rajan B R</div>
                </li>
                <li>
                  <div className="profileDetails-filed-lable">Last name</div>
                  <div className="profileDetails-filed-value">Bangalore</div>
                </li>
                <li>
                  <div className="profileDetails-filed-lable">
                    Email address
                  </div>
                  <div className="profileDetails-filed-value">
                    rajan@gmail.com
                  </div>
                </li>
                <li>
                  <div className="profileDetails-filed-lable">Phone number</div>
                  <div className="profileDetails-filed-value">
                    +91 9876534210
                  </div>
                </li>
                <li>
                  <div className="profileDetails-filed-lable">
                    Date of Birth
                  </div>
                  <div className="profileDetails-filed-value">
                    24 June, 1992
                  </div>
                </li>
              </ul>
            </div>
            <div className="profileDetails-row flex-1">
              <ul className="profileDetails-list">
                <li>
                  <div className="profileDetails-filed-lable">City</div>
                  <div className="profileDetails-filed-value">Bangalore</div>
                </li>
                <li>
                  <div className="profileDetails-filed-lable">Designation</div>
                  <div className="profileDetails-filed-value">
                    Surveillance officer
                  </div>
                </li>
                <li>
                  <div className="profileDetails-filed-lable">Company</div>
                  <div className="profileDetails-filed-value">Happymonk</div>
                </li>
                <li>
                  <div className="profileDetails-filed-lable">Nationality</div>
                  <div className="profileDetails-filed-value">Indian</div>
                </li>
                <li>
                  <div className="profileDetails-filed-lable">Location</div>
                  <div className="profileDetails-filed-value">J P Nagar</div>
                </li>
              </ul>
            </div>
          </div>

          <div className="profileDetails-btn">
            <Button title={"Save"} onClick={() => {}} />
          </div>
        </div>
      </Dialog>

      {/* Sidebar */}
      {/* {isSidebarActive && ( */}
      <Sidebar setIsSidebarActive={setIsSidebarActive} open={isSidebarActive} />
      {/* )} */}
    </>
  );
};

export default Header;
