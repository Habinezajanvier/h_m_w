import signatureImg from "../../../assets/images/icons/signature.svg";
import "../../../assets/styles/components/proofOfSignature.scss";
import CampanySignature from "../common/CampanySignature";

const ProofOfSignature = () => {
  return (
    <div className="dgft-signature-proof">
      <div className="signature-header">
        <img src={signatureImg} alt="signature icon" />
        <h1 className="header-name">Proof of signatures</h1>
      </div>
      <div className="signature-original">
        <h1 className="header">Original Signature</h1>
        <div className="signature-content">
          <CampanySignature
            signature={{
              signed_by: "MEM346 - Shankar",
              signed_by_company: "Ashglow Logistics",
              signed_on: "Signed on 24 March 2022",
            }}
          />
        </div>
      </div>
      <div className="signature-multiple">
        <h1 className="header">Multiple Signatures</h1>
        <div className="signature-content">
          <CampanySignature
            signature={{
              signed_by: "MEM346 - Shankar",
              signed_by_company: "Ashglow Logistics",
              signed_on: "Signed on 24 March 2022",
            }}
          />
          <CampanySignature
            signature={{
              signed_by: "MEM346 - Shankar",
              signed_by_company: "Ashglow Logistics",
              signed_on: "Signed on 24 March 2022",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProofOfSignature;
