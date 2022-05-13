import { FC } from "react";
import "../../assets/styles/components/popups.scss";

interface componentProps {
  title: string;
  handleAllow: () => void;
  handleDeny: () => void;
  step: Array<number>[];
}

const AllowQRCode: FC<componentProps> = ({
  title,
  handleAllow,
  handleDeny,
  step,
}) => {
  return (
    <div className="qr-popup">
      <div className="title">{title}</div>
      <div className="footer">
        <h1 className="step">
          {step[0]}/{step[1]}
        </h1>
        <div className="action-text">
          <div className="popup-btn dark-blue c-pointer" onClick={handleDeny}>
            Deny
          </div>
          <div className="popup-btn dark-blue c-pointer" onClick={handleAllow}>
            Allow
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllowQRCode;
