import { FC } from "react";
import "../../../assets/styles/components/vehicleHealth.scss";
import CircularProgressbar from "./CircularProgressBar";

interface healthProps {
  title: string;
  value: number;
}

const VehicleHealth: FC<healthProps> = ({ title, value }) => {
  return (
    <div className="vehicle-health-wrapper">
      <div>
        <CircularProgressbar value={value} className="vehicle-health" />
      </div>

      <h1>{title}</h1>
    </div>
  );
};

export default VehicleHealth;
