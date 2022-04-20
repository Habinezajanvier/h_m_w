import React, { useState } from "react";
import IOSSwitch from "./IOSSwitch";
import CloseIcon from "@mui/icons-material/Close";
import eyeIc from "../assets/images/eye-icon.svg";
import homeIc from "../assets/images/home-icon.svg";
import MyQRCode from "./MyQRCode";
import "../assets/styles/components/sidebar.scss";
import Feedback from "./Feedback";

import troubleshootIco from "../assets/images/icons/Troubleshoot-side-menu.svg";
import devicesIco from "../assets/images/icons/Devices-side-menu.svg";
import MonitorIco from "../assets/images/icons/Monitor-station-side-menu.svg";
import docsIco from "../assets/images/icons/folder.svg";
import myQRIco from "../assets/images/icons/Qr-code-side-menu.svg";
import feedbackIco from "../assets/images/icons/Feedback-side-menu.svg";
import { sidePanel } from "../redux/modules/dashboard/dashboardSlice";
import { useDispatch } from "react-redux";
const Sidebar = ({ setIsSidebarActive, open }) => {
  const [selectedNav, setSelectedNav] = useState(0);

  const dispatch = useDispatch();

  const handleCloseSidebar = () => {
    dispatch(sidePanel(false));
    setIsSidebarActive(false);
  };

  return (
    <>
      {open && (
        <div className="sidebarDrawr">
          <div className="sidebarDrawr-header">
            <CloseIcon
              onClick={() => {
                handleCloseSidebar();
              }}
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
                  handleCloseSidebar();
                }}
              >
                <div className="glow-border-left"></div>
                <img src={myQRIco} alt="QR Code" />
                <div className="navLink">My QR Code</div>
              </li>
              <li
                className="sidebar-navItem flex items-center "
                onClick={() => {
                  setSelectedNav(2);
                  handleCloseSidebar();
                }}
              >
                <div className="glow-border-left"></div>
                <img src={docsIco} alt="docs" />
                <div className="navLink">Documents</div>
              </li>
              <li
                className="sidebar-navItem flex items-center "
                onClick={() => {
                  setSelectedNav(3);
                  handleCloseSidebar();
                }}
              >
                <div className="glow-border-left"></div>
                <img src={MonitorIco} alt="monitor" />
                <div className="navLink">Monitor station</div>
              </li>
              <li
                className="sidebar-navItem flex items-center "
                onClick={() => {
                  setSelectedNav(4);
                  handleCloseSidebar();
                }}
              >
                <div className="glow-border-left"></div>
                <img src={devicesIco} alt="devices" />
                <div className="navLink">Devices</div>
              </li>
              <li
                className="sidebar-navItem flex items-center "
                onClick={() => {
                  setSelectedNav(5);
                  handleCloseSidebar();
                }}
              >
                <div className="glow-border-left"></div>
                <img src={troubleshootIco} alt="Troubleshoot" />
                <div className="navLink">Troubleshoot</div>
              </li>
              <li
                className="sidebar-navItem flex items-center "
                onClick={() => {
                  setSelectedNav(6);
                  handleCloseSidebar();
                }}
              >
                <div className="glow-border-left"></div>
                <img src={feedbackIco} alt="feedback" />
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
