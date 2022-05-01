import { FC } from "react";
import cryptoImg from "../../../assets/images/icons/crypto_details.svg";
import dropDownImg from "../../../assets/images/icons/drop_down_blue.svg";
import "../../../assets/styles/components/cryptoDetails.scss";

interface cryptoDetailsProps {
  details: {
    type: string;
    created: string;
    verification_key: string;
  };
}

const CryptoDetails: FC<cryptoDetailsProps> = ({ details }) => {
  return (
    <div className="crypto_details_wrapper">
      <div className="heading">
        <img src={cryptoImg} alt="crypto details icon" />{" "}
        <h1>Crypto details</h1>
      </div>

      <div className="crypto_details">
        <h1 className="type">
          Type: <span>"{details?.type}"</span>
        </h1>
        <h1 className="created">
          {" "}
          Created: <span>"{details?.created}"</span>
        </h1>
        <h1 className="proof_value">
          Proof Of Value:{" "}
          <span>
            Key <img src={dropDownImg} alt="dropdown icon" />
          </span>
        </h1>
        <div className="verification_method">
          <h1>Verification Method:</h1>
          <p>"{details?.verification_key}"</p>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;
