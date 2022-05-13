import { FC } from "react";

interface deviceContent {
  img: string;
  txt: string;
  onClick: () => void;
}

const AddDeviceContent: FC<deviceContent> = ({ img, txt, onClick }) => {
  return (
    <div className="add-device-content">
      <img src={img} alt="" onClick={onClick} />
      <h1>{txt}</h1>
    </div>
  );
};

export default AddDeviceContent;
