import "../../../assets/styles/components/billDetails.scss";
import orSeparatorImg from "../../../assets/images/or_separator.svg";
import qrScanImg from "../../../assets/images/qr_scan.svg";
import SelectorInput from "../common/SelectorInput";

const BillDetails = () => {
  const options = [
    {
      value: "8907 7865 7456",
      label: "8907 7865 7456",
      valid_from: "07/05/2022",
      delivery_loc: "West Bengal",
    },
    {
      value: "4567 8976 4532",
      label: "4567 8976 4532",
      valid_from: "05/05/2022",
      delivery_loc: "Odissa",
    },
    {
      value: "3456 5678 4567",
      label: "3456 5678 4567",
      valid_from: "08/03/2022",
      delivery_loc: "Karnataka",
    },
    {
      value: "8979 6789 4567",
      label: "8979 6789 4567",
      valid_from: "10/04/2022",
      delivery_loc: "Russia",
    },
    {
      value: "8123 3456 6789",
      label: "8123 3456 6789",
      valid_from: "23/04/2022",
      delivery_loc: "Switzerland",
    },
    {
      value: "9876 6543 4321",
      label: "9876 6543 4321",
      valid_from: "24/04/2022",
      delivery_loc: "West Bengal",
    },
    {
      value: "8976 5674 5673",
      label: "8976 5674 5673",
      valid_from: "28/04/2022",
      delivery_loc: "Dubai",
    },
  ];

  return (
    <div className="bill-details-container">
      <h1 className="bill-details-title">Enter E-way bill details</h1>
      <div className="bill-type-selector">
        <h1>Enter E-way bill number</h1>
        <SelectorInput
          label={null}
          options={options}
          className="selector-input"
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
