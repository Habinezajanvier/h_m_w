import React from "react";
import Button from "../../components/Button";
import SelectableInput from "../../components/SelectableInput";
import { registerUser } from "./registerUser";

const GrabPhone = ({ phone, handlePhoneInput, handleSendOTPRequest }) => {
  return (
    <div className="signup-card-body">
      <div>
        <SelectableInput
          inputValue={phone?.toString()}
          placeholder={"Enter Phone Number"}
          type="number"
          maxLength={10}
          getValue={(phoneNumber) => {
            handlePhoneInput && handlePhoneInput(phoneNumber);
          }}
          withSelectable={true}
        />
      </div>
      <div className="signup-btn">
        {phone?.toString()?.length === 10 && (
          <Button
            outlined={false}
            title={"Verify"}
            onClick={() => {
              handleSendOTPRequest && handleSendOTPRequest();
              registerUser(phone);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default GrabPhone;
