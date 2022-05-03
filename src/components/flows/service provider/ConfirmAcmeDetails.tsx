import "../../../assets/styles/components/confirmVehicleDetails.scss";
import TextInput from "../common/TextInput";

const ConfirmAcmeDetails = () => {
  const handleChange = () => {
    console.log("changed");
  };
  return (
    <div className="confirm-vehicle-details">
      <h1>Confirm ACME details </h1>
      <div className="details-container">
        <div className="left">
          <div className="drop-down">
            <h1>Flight Date</h1>
            <TextInput
              className="selector"
              value="23rd March 2022"
              disabled
              handleChange={handleChange}
            />
          </div>
          <div className="drop-down">
            <h1>Flight from and to</h1>
            <TextInput
              className="selector"
              value="9W 64"
              disabled
              handleChange={handleChange}
            />
          </div>
        </div>
        <div className="right">
          <div className="drop-down">
            <h1>Air way bill no.</h1>
            <TextInput
              className="selector"
              value="23453456678"
              disabled
              handleChange={handleChange}
            />
          </div>
          <div className="drop-down">
            <h1>House air way bill no.</h1>
            <TextInput
              className="selector"
              value={"EWQ33456780"}
              disabled
              handleChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAcmeDetails;
