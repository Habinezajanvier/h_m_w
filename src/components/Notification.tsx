import { Avatar, Card } from "@mui/material";
import React from "react";
import avatarImg from "../assets/images/man-avatar-md.png";
import "../assets/styles/components/notification.scss";

const Notification = () => {
  return (
    <div className="notificaton-container flex  " color="#22242c">
      <div className="notification-left flex items-start">
        <Avatar alt="user" src={avatarImg} className="c-pointer" />
        <div className="notification-body">
          <div className="notificaton-text c-pointer">
            You’ve been registered with the organisation.
          </div>
          <div className="notification-footer c-pointer">View QR Code</div>
        </div>
      </div>
      <div className="timestamp c-pointer">10:29 am</div>
    </div>
  );
};

export default Notification;
