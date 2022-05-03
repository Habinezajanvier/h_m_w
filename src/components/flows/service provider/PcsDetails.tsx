import "../../../assets/styles/components/pcsDetails.scss";
import shipIcon from "../../../assets/images/icons/ship.svg";
import PcsDetail from "./PcsDetail";

const PcsDetails = () => {
  return (
    <div className="pcs-details-wrapper">
      <div className="left-side">
        <div className="heading">
          <img src={shipIcon} alt="" /> <h1>PCS details</h1>
        </div>
        <div className="details-content">
          <PcsDetail name="Voyage Number:" value="V.284" />
          <PcsDetail name="Site ID:" value="INBOM4" />
          <PcsDetail name="Port Code:" value="INPAV1" />
          <PcsDetail name="Container number:" value="ECMU 467897 6" />
          <PcsDetail name="Last Port of Call:" value="INPAV2" />
          <PcsDetail
            name="Expected Date and Time of Arrival:"
            value="24 April, 2022 06:32 AM"
          />
          <PcsDetail name="Vessel Code: " value="TAUV1" />
          <PcsDetail name="Port of loading:" value="Chabhar Port, Iran" />
          <PcsDetail name="IMO Code:" value="3452367" />
          <PcsDetail name="Port of loading:" value="Karwar port, Mangalore" />
        </div>
      </div>
      <div className="right-side">
        <div className="heading">
          <h1>Videos</h1>
        </div>
        <div className="videos-wrapper">
          <img src={"https://source.unsplash.com/user/c_v_r"} alt="" />
          <img src={"https://source.unsplash.com/user/c_v_r"} alt="" />
        </div>
      </div>
    </div>
  );
};

export default PcsDetails;
