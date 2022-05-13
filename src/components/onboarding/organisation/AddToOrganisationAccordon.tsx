import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../../../assets/styles/components/addDevice.scss";
import "../../../assets/styles/components/addOrganisation.scss";
import orgIcon from "../../../assets/images/organisation/organisation.svg";
import FlowButton from "../../flows/common/FlowButton";
import CompleteFacialRegistration from "../../flows/devices/CompleteFacialRegistration";

export default function AddDevice() {
  const [showCompleteProfile, setShowCompleteProfile] =
    useState<boolean>(false);

  const handleCompleteShow = () => {
    setShowCompleteProfile(!showCompleteProfile);
  };

  return (
    <div className="add-device">
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
          <img src={orgIcon} alt="" />
          <Typography>Add to Organisation</Typography>
        </AccordionSummary>
        <AccordionDetails className="add-device-details">
          <div className="add-organisation-content">
            <p>Register to get verified by the organisation you are working</p>
            <FlowButton
              text="Add to Organisation"
              className=""
              onClick={handleCompleteShow}
            />
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
