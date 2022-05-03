import "../../../assets/styles/components/confirmVehicleDetails.scss";
import TextInput from "../common/TextInput";

const ConfirmFiosDetails = () => {
  const handleChange = () => {
    console.log("changed");
  };
  return (
    <div className="confirm-vehicle-details">
      <h1>Confirm FOIS Details </h1>
      <div className="details-container">
        <div className="left">
          <div className="drop-down">
            <h1>Freight name record no.</h1>
            <TextInput
              className="selector"
              value="1234 4567 890"
              disabled
              handleChange={handleChange}
            />
          </div>
          <div className="drop-down">
            <h1>Container Number</h1>
            <TextInput
              className="selector"
              value="AEMI1236744"
              disabled
              handleChange={handleChange}
            />
          </div>
        </div>
        <div className="right">
          <div className="drop-down">
            <h1>FOIS Station from</h1>
            <TextInput
              className="selector"
              value="Karwar, Mangalore, Karnataka"
              disabled
              handleChange={handleChange}
            />
          </div>
          <div className="drop-down">
            <h1>Station to</h1>
            <TextInput
              className="selector"
              value={"KSR Bangalore, Karnataka"}
              disabled
              handleChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmFiosDetails;
