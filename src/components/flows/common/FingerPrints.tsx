import { FC } from "react";
import "../../../assets/styles/components/fingerPrintDetails.scss";

interface fingerPrintProps {
  left: string;
  right: string;
  title: string;
}

const FingerPrintsDetails: FC<fingerPrintProps> = ({ left, right, title }) => {
  return (
    <div className="fingerprint-details">
      {title && <h1 className="header">{title}</h1>}

      <div className="fingerprints-wrapper">
        <div className="left">
          <img src={left} alt="fingerprint" />
          <h1>Left</h1>
        </div>
        <div className="right">
          <img src={right} alt="fingerprint" />
          <h1>Left</h1>
        </div>
      </div>
    </div>
  );
};

export default FingerPrintsDetails;
