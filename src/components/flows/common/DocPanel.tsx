import { FC, ReactElement } from "react";
import infoImg from "../../../assets/images/icons/info.svg";

interface docProps {
  icon: string;
  text: string | ReactElement;
  onClick: () => void;
  actionIcon?: string;
}

const DocPanel: FC<docProps> = ({ icon, text, onClick, actionIcon }) => {
  return (
    <div>
      <img src={icon} alt="icon" />
      <h1>{text}</h1>
      <img
        src={actionIcon || infoImg}
        alt="info icon"
        className="info-icon"
        onClick={onClick}
      />
    </div>
  );
};

export default DocPanel;
