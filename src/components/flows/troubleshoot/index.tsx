import { Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import QRCodeImg from "../../../assets/images/QR-Code.png";
import "../../../assets/styles/components/myQRCode.scss";
import manImg from "../../../assets/images/man-avatar-md.png";

const Troubleshoot = ({ onClose }) => {
  const [tab, setTab] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Dialog
      maxWidth={"lg"}
      open={isOpen}
      className="myqrcode"
      color="primary"
      PaperProps={{
        style: {
          backgroundColor: "rgba(38, 40, 50, 1)",
          width: "754px",
          height: "630px",
          marginTop: "100px",
        },
      }}
      onClose={() => onClose && onClose()}
    >
      <div className="myqrcode-header flex justify-between">
        <div className="myqrcode-header-title">Troubleshoot</div>
        <div className="myqrcode-header-close">
          <CloseIcon
            onClick={() => {
              setIsOpen(false);
              onClose();
            }}
            className="c-pointer"
          />
        </div>
      </div>
      <div className="myqrcode-tabs flex justify-between">
        <div className="myqrcode-adhar text-center flex-1">
          <span
            className={`${tab === 0 ? "myqrcode-active-tab" : ""} c-pointer`}
            onClick={() => setTab(0)}
          >
            Autodiagnose
          </span>
        </div>
        <div className="myqrcode-org text-center flex-1 ">
          <span
            className={`${tab === 1 ? "myqrcode-active-tab" : ""} c-pointer`}
            onClick={() => setTab(1)}
          >
            FAQ
          </span>
        </div>
      </div>

      <div className="myqrcode-details flex fd-column "></div>
    </Dialog>
  );
};

export default Troubleshoot;
