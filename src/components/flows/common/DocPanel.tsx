import { FC } from "react";
import infoImg from "../../../assets/images/icons/info.svg";

interface docProps {
  icon: string;
  text: string;
  onClick: () => void;
}

const DocPanel: FC<docProps> = ({ icon, text, onClick }) => {
  return (
    <div>
      <img src={icon} alt="icon" />
      <h1>{text}</h1>
      <img
        src={infoImg}
        alt="info icon"
        className="info-icon"
        onClick={onClick}
      />
    </div>
  );
};

export default DocPanel;
