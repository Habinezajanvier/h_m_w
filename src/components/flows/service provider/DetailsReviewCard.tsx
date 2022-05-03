import editIcon from "../../../assets/images/icons/edit.svg";
import locationGrayIcon from "../../../assets/images/icons/location_gray.svg";
import "../../../assets/styles/components/detailsReviewCard.scss";

const MemberDetails = () => {
  return (
    <div className="content">
      <div className="member-details">
        <h1>
          Member DID: <span>MEM3478</span>
        </h1>
        <h1>
          Member ID: <span>ramesh@ulip</span>
        </h1>
      </div>
    </div>
  );
};

const TruckContent = () => {
  return (
    <>
      <div className="content truck">
        <div className="vehicle-details">
          <h1>
            Vehicle DID: <span>VH3456</span>
          </h1>
          <h1>
            Vehicle No: <span>KA-19-1756</span>
          </h1>
          <h1>
            Vehicle Health: <span className="green-txt">80%</span>
          </h1>
        </div>
      </div>
      <MemberDetails />
    </>
  );
};

const FleetContent = () => {
  return (
    <div className="content truck">
      <div className="vehicle-details">
        <h1>
          Import General Manifest Number: <span>3345678</span>
        </h1>
        <h1>
          Shipping Bill Number: <span>7005705 </span>
        </h1>
        <h1>
          Bill of Entry Number : <span>645789</span>
        </h1>
      </div>
    </div>
  );
};

const RailWayContent = () => {
  return (
    <div className="content truck">
      <div className="vehicle-details">
        <h1>
          Freight name record no: <span>1234 4567 890</span>
        </h1>
        <h1>
          Container Number: <span>AEMI1236744</span>
        </h1>
      </div>
    </div>
  );
};

const AirplaneContent = () => {
  return (
    <>
      {" "}
      <div className="content airplane">
        <div className="vehicle-details">
          <h1>
            Flight no: <span>9W 64</span>
          </h1>
          <h1>
            Air way bill no: <span>23453456678</span>
          </h1>
          <h1>
            House air way bill no: <span>EWQ33456780</span>
          </h1>
        </div>
      </div>
      <MemberDetails />
    </>
  );
};

const DetailsReviewCard = ({ transportIcon, routeName, transportMode }) => {
  return (
    <div className="provider-details-review-card-wrapper ">
      <div className="top">
        <div className="content">
          <div className="child">
            <img src={locationGrayIcon} alt="" />
            <h1>
              <span>From:</span> Kerman refinary center
            </h1>
          </div>
        </div>
        <div className="content">
          <div className="child">
            <img src={locationGrayIcon} alt="" />
            <h1>
              <span>From:</span> Kerman refinary center
            </h1>
          </div>
        </div>
        <div className="edit-icon">
          <img src={editIcon} alt="" className="edit-icon" />
        </div>
      </div>
      <div className="bottom">
        <div className="content transport">
          <img src={transportIcon} alt="" />
          <h1>{routeName}</h1>
        </div>

        {transportMode === "truck" ? (
          <TruckContent />
        ) : transportMode === "fleet" ? (
          <FleetContent />
        ) : transportMode === "railway" ? (
          <RailWayContent />
        ) : (
          <AirplaneContent />
        )}
      </div>
    </div>
  );
};

export default DetailsReviewCard;
