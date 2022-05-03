import "../../../assets/styles/components/pcsDetails.scss";
import airPlaneIcon from "../../../assets/images/icons/airplane_left.svg";
import airPlaneImg from "../../../assets/images/airplane.png";
import PcsDetail from "./PcsDetail";

const AcmeDetails = () => {
  return (
    <div className="pcs-details-wrapper">
      <div className="left-side">
        <div className="heading">
          <img src={airPlaneIcon} alt="" /> <h1>ACME Details</h1>
        </div>
        <div className="details-content">
          <div className="left">
            <PcsDetail name="CExport general manifest no:" value="1245789" />

            <PcsDetail name="Shipping bill no:" value="G.284" />

            <PcsDetail name="Shipping bill date:" value="22nd March 2022" />
            <PcsDetail name="Gate pass no:" value="G.284" />
            <PcsDetail name="Container number:" value="ECMU 467897 6" />
          </div>
          <div className="right">
            <PcsDetail name="Segregation Date:" value="23 April, 2022" />
            <PcsDetail
              name="Expected Date and Time of Arrival:"
              value="24 April, 2022 | 06:32 AM"
            />
            <PcsDetail name="Gross weight:" value="4 Gallons" />
            <PcsDetail name="Import general Manifest no:" value="2345678" />
            <PcsDetail
              name="Actual time of arrival:"
              value="24 April, 2022 |  06:30"
            />
          </div>
        </div>
      </div>
      <div className="right-side">
        <div className="heading">
          <h1>Images</h1>
        </div>
        <div className="videos-wrapper">
          <img src={airPlaneImg} alt="" />
          <img src={airPlaneImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AcmeDetails;
