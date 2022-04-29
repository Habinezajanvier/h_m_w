import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import caretImg from "../../../assets/images/icons/caret.svg";
import "../../../assets/styles/components/QuickStart.scss";

export default function PackageAccordion({
  title,
  content,
  handleChange,
  expanded,
  panel,
}) {
  return (
    <div className="package-accordon">
      <Accordion
        className="package-accordon"
        onClick={() => handleChange(panel)}
        expanded={expanded}
      >
        <AccordionSummary
          expandIcon={<img src={caretImg} alt="caret icon" />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="accordon-heading"
        >
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails className="package-accordon-content">
          {content}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
