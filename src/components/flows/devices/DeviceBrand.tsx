import { FC } from "react";

interface deviceBrandProps {
  deviceImg: string;
  deviceName: string;
}

const DeviceBrand: FC<deviceBrandProps> = ({ deviceImg, deviceName }) => {
  return (
    <div>
      <div className="brand-image-container">
        <img src={deviceImg} alt="device brand" />
      </div>
      <h1 className="device-name">{deviceName}</h1>
    </div>
  );
};

export default DeviceBrand;
