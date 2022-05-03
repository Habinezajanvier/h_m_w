import "../../../assets/styles/components/billDetails.scss";
import orSeparatorImg from "../../../assets/images/or_separator.svg";
import qrScanImg from "../../../assets/images/qr_scan.svg";
import SelectorInput from "../common/SelectorInput";
import { useQuery } from "urql";
import { getEwayBills } from "../../../api/clients/graphql/query";
import { useSelector } from "react-redux";

const BillDetails = ({ handleContinue }) => {
  // const [{ fetching, data, error }] = useQuery({
  //   query: getEwayBills,
  //   variables: {
  //     limit: 5,
  //   },
  // });

  const { bills } = useSelector((state) => state.dashboard);

  return (
    <div className="bill-details-container">
      <h1 className="bill-details-title">Enter E-way bill details</h1>
      <div className="bill-type-selector">
        <h1>Enter E-way bill number</h1>
        <SelectorInput
          label={null}
          options={bills}
          className="selector-input"
          onChange={handleContinue}
        />
      </div>
      <span className="example-text">Example</span>
      <div className="bill-details-format">
        <h1>Format of E-way Bill Number</h1>
        <button>8010 6789 7865</button>
      </div>

      <div className="or-separator">
        <img src={orSeparatorImg} alt="or" />
      </div>
      <div className="scan-qr">
        <h1 className="scan-title">Scan QR code</h1>
        <span className="example-text">Example</span>
        <div className="bill-details-format">
          <img src={qrScanImg} alt="qr code scan" />
        </div>
      </div>
    </div>
  );
};

export default BillDetails;
