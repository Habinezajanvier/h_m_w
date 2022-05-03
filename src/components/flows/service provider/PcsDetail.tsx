import { FC } from "react";
import "../../../assets/styles/components/pcsDetail.scss";

interface pcsDetail {
  name: string;
  value: string;
}

const PcsDetail: FC<pcsDetail> = ({ name, value }) => {
  return (
    <div className="pcs-detail">
      <h1 className="name">{name}</h1>
      <h1 className="value">{value}</h1>
    </div>
  );
};

export default PcsDetail;
