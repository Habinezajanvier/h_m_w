import React, { useState } from "react";
import helpIcon from "../../../assets/images/icons/help.svg";
import qrScanImg from "../../../assets/images/how_qr_scan.svg";
import "../../../assets/styles/components/QuickStart.scss";
import PackageAccordion from "./Accordon";
import billGif from "../../../assets/images/help-section/bill.gif";
import scannGif from "url:../../../assets/images/help-section/scan.gif";
import { faker } from "@faker-js/faker";

const QuickStart = () => {
  const [open, setIsOpen] = useState(true);
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => {
    setIsOpen(!open);
    console.log(panel);
    setExpanded(panel);
  };

  const image = faker.image.transport();

  return (
    <div className="quick-start-container">
      <div className="quick-start-header">
        <img src={helpIcon} alt="help icon" /> <h1>Quick Help</h1>
      </div>
      <div className="quickstart-accordon">
        <PackageAccordion
          panel={expanded}
          handleChange={(panel) => handleChange("panel1")}
          expanded={expanded === "panel1" && open}
          title={<h1>How to add package?</h1>}
          content={
            <div className="quickstart">
              <div className="help-video">
                <img src={image} alt="" />
              </div>
              <ol type="1" className="quickstart-list">
                <li>
                  Select your e-way bill number from the dropdown beside or scan
                  QR code to get your bill details.
                </li>
                <li>
                  Add evidences of your cargo in the form of images and videos.
                </li>
                <li>Upload the required documents.</li>
                <li>
                  Enter your preferred service agency and select the date of
                  shipment.
                </li>
                <li>Review your data and send request to the agency.</li>
              </ol>
            </div>
          }
        />
        <PackageAccordion
          panel={expanded}
          expanded={expanded === "panel2" && open}
          handleChange={(panel) => handleChange("panel2")}
          title={<h1>How to find my E-way bill number?</h1>}
          content={
            <div className="quickstart">
              <div className="help-video">
                <img src={image} alt="qr scan" />
              </div>
              <ol type="1" className="quickstart-list">
                <li>
                  Select your e-way bill number from the dropdown beside or scan
                  QR code to get your bill details.
                </li>
                <li>
                  Add evidences of your cargo in the form of images and videos.
                </li>
                <li>Upload the required documents.</li>
                <li>
                  Enter your preferred service agency and select the date of
                  shipment.
                </li>
                <li>Review your data and send request to the agency.</li>
              </ol>
            </div>
          }
        />
        <PackageAccordion
          panel={expanded}
          expanded={expanded === "panel3" && open}
          handleChange={(panel) => handleChange("panel3")}
          title={<h1>How to scan QR code</h1>}
          content={
            <div className="quickstart">
              <div className="help-video">
                <img src={image} alt="qr scan" />
              </div>
              <ol type="1" className="quickstart-list">
                <li>
                  From the list of E-way bill number in the form select the
                  E-way bill number which you want to send as a package and
                  request for transportation.
                </li>
                <li>Or Download the e-way bill generated.</li>
                <li>On the bill the first field is the E-way bill number.</li>
                <li>
                  Enter the 12 digit number which is shown on the e-way bill
                  number.
                </li>
                <div className="e-bill-format">
                  <h1>Format of E-way Bill Number</h1>
                  <button>8010 6789 7865</button>
                </div>
              </ol>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default QuickStart;
