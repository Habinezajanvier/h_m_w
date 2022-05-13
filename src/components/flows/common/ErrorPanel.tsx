import FlowButton from "./FlowButton";
import "../../../assets/styles/components/popups.scss";
import errorIcon from "../../../assets/images/close-red.svg";
import { FC } from "react";

interface errorProps {
  description: string;
  handleClick: () => void;
  btnText: string;
}

const ErrorPopup: FC<errorProps> = ({ description, handleClick, btnText }) => {
  return (
    <div className="popup-container">
      <div className="img-container">
        <img src={errorIcon} alt="" />
      </div>
      <div className="description">
        <p className="error-text">{description}</p>
      </div>
      <FlowButton
        className="continue-btn"
        text={btnText}
        onClick={handleClick}
      />
    </div>
  );
};

export default ErrorPopup;
