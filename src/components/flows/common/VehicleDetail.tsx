import { FC } from "react";
import "../../../assets/styles/components/vehicleDetail.scss";

interface detailProps {
  icon: string;
  title: string;
  description: string;
}

const VehicleDetail: FC<detailProps> = ({ icon, title, description }) => {
  return (
    <div className="vehicle-detail-wrapper">
      <img src={icon} alt="" />
      <div className="vehicle-detail-content">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default VehicleDetail;
