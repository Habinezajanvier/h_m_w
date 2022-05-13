import { Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import QRCodeImg from "../../assets/images/QR-Code.png";
import "../../assets/styles/components/myQRCode.scss";
import manImg from "../../assets/images/man-avatar-md.png";
import uploadIcon from "../../assets/images/icons/upload.svg";
import qrIcon from "../../assets/images/icons/qr-icon.svg";
import shareIcon from "../../assets/images/icons/share.svg";
import DocButton from "./DocButton";

const ButtonsWrapper = () => {
  return (
    <div className="docs-buttons">
      <DocButton icon={uploadIcon} text="Upload Files" />
      <DocButton icon={qrIcon} text="Show QR Code" />
      <DocButton icon={shareIcon} text="Share files" />
    </div>
  );
};
const MyDocuments = ({ onClose, docs }) => {
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
      <div className="myqrcode-header docs-header flex justify-between">
        <div className="myqrcode-header-title">Documents</div>
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

      <div className="myqrcode-tabs docs-tabs flex justify-between">
        <div className="myqrcode-adhar text-center flex-1">
          <span
            className={`${tab === 0 ? "myqrcode-active-tab" : ""} c-pointer`}
            onClick={() => setTab(0)}
          >
            Documents
          </span>
        </div>
        <div className="myqrcode-org text-center flex-1 ">
          <span
            className={`${tab === 1 ? "myqrcode-active-tab" : ""} c-pointer`}
            onClick={() => setTab(1)}
          >
            Shared with me
          </span>
        </div>
      </div>

      {(tab === 0 && (
        <div className="myqrcode-details docs-details flex fd-column ">
          <div className="verifiable-docs">
            <h1 className="verifiable-docs-title">My Verifiable Documents</h1>
            <div className="docs-panel">
              {docs.map(({ docIcon, docName, docTag, docDate }) => (
                <div className="doc-panel">
                  <img src={docIcon} alt="" />
                  <h1 className="doc-name">{docName}</h1>
                  <span className="doc-tag">{docTag}</span>
                  <h1 className="doc-date">{docDate}</h1>
                </div>
              ))}
            </div>
          </div>
          <div className="verifiable-docs">
            <h1 className="verifiable-docs-title">Signed Document </h1>
            <div className="docs-panel">
              {docs.map(({ docIcon, docName, docTag, docDate }) => (
                <div className="doc-panel">
                  <img src={docIcon} alt="" />
                  <h1 className="doc-name">{docName}</h1>
                  <span className="doc-tag">{docTag}</span>
                  <h1 className="doc-date">{docDate}</h1>
                </div>
              ))}
            </div>
          </div>
          <ButtonsWrapper />
        </div>
      )) || (
        <div className="myqrcode-details docs-details flex fd-column ">
          <div className="verifiable-docs">
            <h1 className="verifiable-docs-title">Files Shared with me</h1>
            <div className="docs-panel">
              {docs.map(({ docIcon, docName, docTag, docDate }) => (
                <div className="doc-panel">
                  <img src={docIcon} alt="" />
                  <h1 className="doc-name">{docName}</h1>
                  <span className="doc-tag">{docTag}</span>
                  <h1 className="doc-date">{docDate}</h1>
                </div>
              ))}
            </div>
          </div>

          <ButtonsWrapper />
        </div>
      )}
    </Dialog>
  );
};

export default MyDocuments;
