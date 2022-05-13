import FlowButton from "../common/FlowButton";
import scannQrIcon from "../../../assets/images/devices/scann-qr.svg";
import "../../../assets/styles/components/addDevice.scss";
import SimpleSelectorInput from "../common/SimpleSelector";
import IndoorOutDoorChoose from "./IndoorOutdoorChoose";
import { FC } from "react";

interface loginProps {
  show: boolean;
  handleStep: (step: string) => void;
}

const DeviceInfoForm: FC<loginProps> = ({ show, handleStep }) => {
  return (
    show && (
      <div className="device-info-form">
        <div className="heading">
          <div className="device-info">
            {" "}
            <h1>Device info</h1>
          </div>

          <div className="scann-qr">
            <h1>Scan QR Code</h1> <img src={scannQrIcon} alt="" />
          </div>
        </div>
        <div className="form-content">
          <div className="content">
            <h1 className="label">Device </h1> <h1 className="data">Dhar</h1>
          </div>
          <div className="content">
            <h1 className="label">Device brand</h1>
          </div>

          <div className="content">
            <h1 className="label">Device model</h1>
          </div>
          <div className="content">
            <h1 className="label">Location of the device</h1>
          </div>
          <div className="content">
            <h1 className="label">Choose</h1>
            <IndoorOutDoorChoose />
          </div>
          <div className="content">
            <h1 className="label">Name of the device</h1>
            <h1 className="data">DM1</h1>
          </div>
          <div className="content">
            <h1 className="label">Device serial number</h1>
            <h1 className="data">Ds1</h1>
          </div>
          <div className="content">
            <h1 className="label">Device MAC ID</h1>
            <h1 className="data">MC101.101.2</h1>
          </div>
        </div>
        <div className="button-container">
          <FlowButton text="Submit" onClick={() => handleStep("")} />
        </div>
      </div>
    )
  );
};

export default DeviceInfoForm;
