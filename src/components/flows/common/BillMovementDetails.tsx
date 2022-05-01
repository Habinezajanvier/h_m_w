import docImg from "../../../assets/images/icons/doc.svg";
import fromtoImg from "../../../assets/images/icons/from_to.svg";
import "../../../assets/styles/components/billMovementDetails.scss";

const BillMovementDetails = () => {
  return (
    <div className="bill-details">
      <img src={docImg} alt="doc icon" />
      <div className="details-wrapper">
        <div className="child_header">
          <h1>E-Way Bill Number - 8976 4567 3456</h1>
        </div>
        <div className="details-container">
          <div className="destination">
            <div className="from_to">
              <span>From</span>
              <span>To</span>
            </div>
            <div className="location_img_container">
              <img src={fromtoImg} alt="location img" />
            </div>
            <div className="location_name">
              <h1>Kerwan Refinery Center, Iran</h1>
              <h1>Dehli Petrocheimcals ltd, Delhi</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillMovementDetails;
