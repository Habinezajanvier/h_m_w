import { TextField } from "@mui/material";
import { useState } from "react";
import "../../../assets/styles/components/confirmVehicleDetails.scss";
import SelectableInput from "../../SelectableInput";
import SimpleSelectorInput from "../common/SimpleSelector";
import TextInput from "../common/TextInput";

const ConfirmVehicleDetails = () => {
  const vehicles = [
    {
      value: "666AA6-09",
      label: "666AA6-09",
    },
    {
      value: "874AA6-73",
      label: "729AA6-92",
    },
    {
      value: "820AA6-27",
      label: "640AA6-89",
    },
    {
      value: "840AA6-64",
      label: "749AA6-02",
    },
    {
      value: "082AA9-00",
      label: "937AA1-63",
    },
  ];
  const [showCompanion, setShowCompanion] = useState(false);

  const handleShowCompanion = () => {
    setShowCompanion(!showCompanion);
  };

  const handleChange = () => {
    console.log("changed");
  };

  return (
    <div className="confirm-vehicle-details">
      <h1>Confirm vehicle and driver details </h1>
      <div className="details-container">
        <div className="left">
          <div className="drop-down">
            <h1>Vehicle number</h1>
            <SimpleSelectorInput
              label={null}
              options={vehicles}
              className="selector"
            />
          </div>
          <div className="drop-down">
            <h1>Driver ID</h1>
            <SimpleSelectorInput
              label={null}
              options={vehicles}
              className="selector"
            />
          </div>
        </div>
        <div className="right">
          {showCompanion && (
            <>
              {" "}
              <div className="drop-down">
                <h1>Companion Name/ ID</h1>
                <TextInput
                  disabled
                  className="selector"
                  value="krishna@chokidr"
                  handleChange={handleChange}
                />
              </div>
              <div className="drop-down">
                <h1>Phone number (optional)</h1>
                <TextField
                  id="standard-basic"
                  variant="standard"
                  className="selector"
                />
                {/* <SelectableInput /> */}
              </div>
            </>
          )}
          {!showCompanion && (
            <div className="add-companion" onClick={handleShowCompanion}>
              <h1>Add Companion</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmVehicleDetails;
