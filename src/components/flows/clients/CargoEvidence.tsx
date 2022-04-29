import { FC } from "react";
import "../../../assets/styles/components/flowDialog.scss";

interface CargoProps {
  title: string;
  icon: any;
  images: string[];
}

const CargoEvidence: FC<CargoProps> = ({ title, icon, images }) => {
  return (
    <div className="cargo_evidence_wrapper">
      <div className="left_panel">
        <img src={icon} alt="evidence icon" />
      </div>
      <div className="right_panel">
        <h1>{title}</h1>
        <div className="images_wrapper">
          {images.map((image) => (
            <img src={image} alt="evidence" />
          ))}
        </div>
      </div>
    </div>
  );
};
export default CargoEvidence;
