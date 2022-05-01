import { FC } from "react";
import "../../../assets/styles/components/agencyConfirmStatus.scss";

interface statusProps {
  icon: string;
  name: string;
  status: string;
  className: string;
}

const AgencyConfirmStatus: FC<statusProps> = ({
  icon,
  name,
  status,
  className,
}) => {
  return (
    <div className="agency-confirm-status">
      <div className="image-wrapper">
        <img src={icon} alt="agency icon" className={className} />
      </div>
      <div className="data-div">
        <h1 className={className}>{name}</h1>
        <span className="status">{status}</span>
      </div>
    </div>
  );
};

export default AgencyConfirmStatus;
