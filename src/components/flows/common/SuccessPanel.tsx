import FlowButton from "./FlowButton";
import "../../../assets/styles/components/popups.scss";
import successIcon from "../../../assets/images/green-correct-success.png";
import { FC } from "react";

interface successPopupProps {
  description: string;
  handleClick: () => void;
  btnText: string;
}

const SuccessPopup: FC<successPopupProps> = ({
  description,
  handleClick,
  btnText,
}) => {
  return (
    <div className="popup-container">
      <div className="img-container">
        <img src={successIcon} alt="" />
      </div>
      <div className="description">
        <p>{description}</p>
      </div>
      <FlowButton
        className="continue-btn"
        text={btnText}
        onClick={handleClick}
      />
    </div>
  );
};

export default SuccessPopup;
