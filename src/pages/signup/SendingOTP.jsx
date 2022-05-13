import React from "react";
import Button from "../../components/Button";
import SelectableInput from "../../components/SelectableInput";

const SendingOTP = ({ OTP, setOTP, invalidOTP, otpImg, handleVerifyOTP, isOtpSent, isLoading }) => {

  console.log("CHECK OTP    ===========> ", invalidOTP)
  return (
    <>
      <div className="signup-card-body">
        <div>
          <SelectableInput
            inputValue={OTP?.toString()}
            placeholder={"Enter OTP"}
            type="number"
            maxLength={6}
            getValue={({ value }) => setOTP(value)}
            withSelectable={false}
            selectIcon={otpImg}
            errText={invalidOTP ? "Incorrect OTP" : ""}
          />
        </div>
      </div>

      <div className="signup-card-footer flex justify-evenly items-center flex-1 fd-column">
        {OTP?.toString()?.length === 6 && (
          <div className="signup-btn">
            <Button
              outlined={false}
              title={"Continue"}
              disabled={isLoading}
              onClick={() => {
                handleVerifyOTP();
              }}
            />
          </div>
        )}

        <div className="label">
          <span>Didn’t receive OTP?</span>
          <span className="color-skyBlue c-pointer"> Resend</span>
        </div>
      </div>
    </>
  );
};

export default SendingOTP;
