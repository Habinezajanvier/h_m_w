import { FC } from "react";
import "../../../assets/styles/components/signature.scss";

interface signatureProps {
  signature: {
    signed_by: string;
    signed_on: string;
    signed_by_company: string;
  };
}

const CampanySignature: FC<signatureProps> = ({ signature }) => {
  const { signed_by, signed_on, signed_by_company } = signature;
  return (
    <div className="campany-signature-wrapper">
      <div className="content" key={Math.random()}>
        <h1 className="name">{signed_by}</h1>
        <h1 className="date">{signed_by_company}</h1>
      </div>
      <div className="date">
        <h1>{signed_on}</h1>
      </div>
    </div>
  );
};

export default CampanySignature;
