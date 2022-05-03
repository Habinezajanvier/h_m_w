import "../../../assets/styles/components/pcsDetails.scss";
import ldbIcon from "../../../assets/images/icons/ldb.svg";
import PcsDetail from "./PcsDetail";

const LdbDetails = () => {
  return (
    <div className="pcs-details-wrapper">
      <div className="left-side">
        <div className="heading">
          <img src={ldbIcon} alt="" /> <h1>LDB Details</h1>
        </div>
        <div className="details-content">
          <div className="left">
            <PcsDetail name="Container type:" value="Special Containers" />

            <PcsDetail name="ISO code:" value="42G 1" />

            <PcsDetail name="Container size:" value="40 ft" />
            <PcsDetail name="Container number:" value="ECMU 467897 6" />
            <PcsDetail name="Mode of Transportation:" value="Railways" />
          </div>
          <div className="right">
            <PcsDetail name="Refrigerated:" value="No" />
            <PcsDetail name="Direct port export:" value="No" />
            <PcsDetail name="Direct port delivery:" value="No" />
          </div>
        </div>
      </div>
      <div className="right-side">
        <div className="heading">
          <h1>Video</h1>
        </div>
        <div className="videos-wrapper">
          <img src="https://source.unsplash.com/user/c_v_r" alt="" />
        </div>
      </div>
    </div>
  );
};

export default LdbDetails;
