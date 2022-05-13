import TextInput from "../common/TextInput";
import deviceImg from "../../../assets/images/devices/add_device.svg";
import { useState } from "react";
import FlowButton from "../common/FlowButton";
import "../../../assets/styles/components/addDevice.scss";
import { FC } from "react";

interface loginProps {
  show: boolean;
  handleStep: (step: string) => void;
}

const AddDeviceForm: FC<loginProps> = ({ show, handleStep }) => {
  const [deviceId, setDeviceId] = useState("");

  return (
    show && (
      <div className="add-device-form">
        <div className="img-container">
          <img src={deviceImg} alt="" />
        </div>
        <div className="input-container">
          <TextInput
            type="text"
            placeholder="Enter device id"
            handleChange={(e) => setDeviceId(e.target.value)}
            value={deviceId}
          />
          <span>Ex: Device2345@Chokidr</span>
        </div>
        <div className="button-container">
          <FlowButton text="Next" onClick={() => handleStep("device-info")} />
        </div>
      </div>
    )
  );
};

export default AddDeviceForm;
