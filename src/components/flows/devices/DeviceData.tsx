import { FC } from "react";
import "../../../assets/styles/components/deviceDetails.scss";

interface DeviceDataProps {
  icon: string;
  classTop: string;
  classBottom: string;
  textTop: string;
  textBottom: string;
}

const DeviceData: FC<DeviceDataProps> = ({
  icon,
  classTop,
  classBottom,
  textTop,
  textBottom,
}) => {
  return (
    <div className="device-data-container">
      <img src={icon} alt="" />
      <div>
        <h1 className={classTop}>{textTop}</h1>
        <h1 className={classBottom}>{textBottom}</h1>
      </div>
    </div>
  );
};

export default DeviceData;
