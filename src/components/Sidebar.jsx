import React, { useState } from "react";
import IOSSwitch from "./IOSSwitch";
import CloseIcon from "@mui/icons-material/Close";
import eyeIc from "../assets/images/eye-icon.svg";
import homeIc from "../assets/images/home-icon.svg";
import MyQRCode from "./MyQRCode";
import "../assets/styles/components/sidebar.scss";
import Feedback from "./Feedback";

const Sidebar = ({ setIsSidebarActive, open }) => {
  const [selectedNav, setSelectedNav] = useState(0);

  return (
    <>
      {open && (
        <div className="sidebarDrawr">
          <div className="sidebarDrawr-header">
            <CloseIcon
              onClick={() => setIsSidebarActive(false)}
              className="c-pointer"
            />
          </div>
          <div className="sidebarDrawr-body flex fd-column justify-between">
            <ul className="sidebar-navList flex fd-column">
              <li
                className="sidebar-navItem flex items-center sidebar-navItem-active"
                onClick={() => {
                  setSelectedNav(0);
                  setIsSidebarActive(false);
                }}
              >
                <div className="glow-border-left"></div>
                <img src={homeIc} alt="home" />
                <div className="navLink">Home</div>
              </li>
              <li
                className="sidebar-navItem flex items-center "
                onClick={() => {
                  setSelectedNav(1);
                  setIsSidebarActive(false);
                }}
              >
                <div className="glow-border-left"></div>
                <img src={homeIc} alt="home" />
                <div className="navLink">My QR Code</div>
              </li>
              <li
                className="sidebar-navItem flex items-center "
                onClick={() => {
                  setSelectedNav(2);
                  setIsSidebarActive(false);
                }}
              >
                <div className="glow-border-left"></div>
                <img src={homeIc} alt="home" />
                <div className="navLink">Documents</div>
              </li>
              <li
                className="sidebar-navItem flex items-center "
                onClick={() => {
                  setSelectedNav(3);
                  setIsSidebarActive(false);
                }}
              >
                <div className="glow-border-left"></div>
                <img src={homeIc} alt="home" />
                <div className="navLink">Monitor station</div>
              </li>
              <li
                className="sidebar-navItem flex items-center "
                onClick={() => {
                  setSelectedNav(4);
                  setIsSidebarActive(false);
                }}
              >
                <div className="glow-border-left"></div>
                <img src={homeIc} alt="home" />
                <div className="navLink">Devices</div>
              </li>
              <li
                className="sidebar-navItem flex items-center "
                onClick={() => {
                  setSelectedNav(5);
                  setIsSidebarActive(false);
                }}
              >
                <div className="glow-border-left"></div>
                <img src={homeIc} alt="home" />
                <div className="navLink">Troubleshoot</div>
              </li>
              <li
                className="sidebar-navItem flex items-center "
                onClick={() => {
                  setSelectedNav(6);
                  setIsSidebarActive(false);
                }}
              >
                <div className="glow-border-left"></div>
                <img src={homeIc} alt="home" />
                <div className="navLink">Feedback</div>
              </li>
            </ul>

            <div className="sidebarDrawr-footer">
              <div className="sidebarDrawr-loginStatus flex items-center justify-between">
                <div className="loginStatus-label">You’re logged in</div>
                <div className="radio">
                  <IOSSwitch sx={{ m: 1 }} defaultChecked />
                </div>
              </div>

              <div className="sidebarDrawr-footer-info">
                <div className="footer-chokidr-lable">Chokidr 0.0.1</div>
                <div className="footer-chokidr-createdBy">
                  Created by Happymonk AI Labs
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedNav === 1 && <MyQRCode onClose={() => setSelectedNav(0)} />}
      {selectedNav === 6 && <Feedback onClose={() => setSelectedNav(0)} />}
    </>
  );
};

export default Sidebar;
