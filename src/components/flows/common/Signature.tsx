import { FC } from "react";
import "../../../assets/styles/components/signature.scss";

interface signatureProps {
  signatures: Array<{
    signed_by: string;
    signed_on: string;
  }>;
}

const Signature: FC<signatureProps> = ({ signatures }) => {
  return signatures.map(({ signed_by, signed_on }) => (
    <div className="content" key={Math.random()}>
      <h1 className="name">{signed_by}</h1>
      <h1 className="date">Signed on {signed_on}</h1>
    </div>
  ));
};

export default Signature;
