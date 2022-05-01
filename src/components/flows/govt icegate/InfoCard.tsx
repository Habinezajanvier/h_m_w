import { FC } from "react";
import "../../../assets/styles/components/agencyPackagenfoCard.scss";

interface cardProps {
  data: Array<{
    name: string;
    value: string;
  }>;
  title: string;
  icon: string;
}

const InfoCard: FC<cardProps> = ({ data, title, icon }) => {
  return (
    <div className="info-container">
      <div className="info-icon">
        <img src={icon} alt="data icon" />
      </div>
      <div className="info-content">
        <div className="info-content-header">
          <h1>{title}</h1>
        </div>
        {data?.map(({ name, value }) => (
          <div className="info-content-data" key={Math.random()}>
            <h1 className="info-name">{name}</h1>
            <h1 className="info-value">{value}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoCard;
