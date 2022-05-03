import { TextField } from "@mui/material";
import React, { useState } from "react";
import "../../../assets/styles/components/confirmVehicleDetails.scss";
import SimpleSelectorInput from "../common/SimpleSelector";
import TextInput from "../common/TextInput";

const FiosConfirmDetails = () => {
  const [entryBillNumber, setEntryBillNumber] = useState("");
  const [shoppingBillNumber, setShoppingBillNumber] = useState("");

  const handleShoppingBillNumber = ({ target }) => {
    const { value } = target;
    setShoppingBillNumber(value);
  };

  const handleEntryBillNumber = ({ target }) => {
    const { value } = target;
    setEntryBillNumber(value);
  };

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

  return (
    <div className="confirm-vehicle-details">
      <h1>Enter PCS details </h1>
      <div className="details-container">
        <div className="left">
          <div className="drop-down">
            <h1>Import General Manifest Number</h1>
            <SimpleSelectorInput
              label={null}
              options={vehicles}
              className="selector"
            />
          </div>
          <div className="drop-down">
            <h1>Bill of Entry Number</h1>
            <TextInput
              disabled={false}
              value={entryBillNumber}
              className="selector"
              handleChange={handleEntryBillNumber}
            />
          </div>
        </div>
        <div className="right">
          <div className="drop-down">
            <h1>Shipping Bill Number </h1>
            <TextInput
              disabled={false}
              value={shoppingBillNumber}
              className="selector"
              handleChange={handleShoppingBillNumber}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiosConfirmDetails;
