import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import helpIcon from "../../../assets/images/icons/help.svg";
import infraImg from "../../../assets/images/devices/add-infra.svg";
import vehicleImg from "../../../assets/images/devices/add-vehicle.svg";
import "../../../assets/styles/components/addDevice.scss";
import AddDeviceContent from "./AddDeviceContent";
import deviceIcon from "../../../assets/images/devices/add-device.svg";
import CompleteFacialRegistration from "./CompleteFacialRegistration";
import LoginForm from "./LoginForm";
import AddDeviceForm from "./AddDeviceForm";
import DeviceInfoForm from "./DeviceInfoForm";
import DevicesBrandsDialog from "./DevicesBrands";

export default function AddDevice() {
  const [showCompleteProfile, setShowCompleteProfile] =
    useState<boolean>(false);

  const handleCompleteShow = () => {
    setShowCompleteProfile(!showCompleteProfile);
  };

  const [step, setStep] = useState<string>("");

  const handleStep = (kind: string) => {
    setStep(kind);
  };

  return (
    <div className="add-device">
      <CompleteFacialRegistration
        show={showCompleteProfile}
        handleShow={handleCompleteShow}
        handleStep={handleStep}
      />
      <Accordion
        sx={{
          color: "rgba(255, 255, 255, 0.8)",
          backgroundColor: "#24262E",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="accordon-summary"
        >
          <img src={deviceIcon} alt="" />
          <br />
          <Typography>Add device</Typography>
        </AccordionSummary>
        <AccordionDetails className="add-device-details">
          <div className="add-device-header">
            <h1>Add devices to see the Activities</h1>
            <img src={helpIcon} alt="" />
          </div>
          <div className="add-device-content-wrapper">
            <DeviceInfoForm
              show={step === "device-info"}
              handleStep={handleStep}
            />
            <AddDeviceForm
              show={step === "add-device-form"}
              handleStep={handleStep}
            />
            <LoginForm show={step === "login-form"} handleStep={handleStep} />
            {step === "" && (
              <AddDeviceContent
                img={infraImg}
                txt="Add device for Infra"
                onClick={handleCompleteShow}
              />
            )}
            {step === "" && (
              <AddDeviceContent
                img={vehicleImg}
                txt="Add device for vehicle"
                onClick={handleCompleteShow}
              />
            )}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
