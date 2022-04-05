import React from "react";

const ShowMnemonic = () => {
  return (
    <div>
        abcd
      <div className="login-popup-container">
        <div className="login-popup">
          <div>{/* <img src={loadingImg} alt="loading" /> */}</div>
          <div className="text-center">
            Searching for the mnemonic password QR code stored on this device
          </div>
          <div>Allow to search this device to scan QR code?</div>
          <div className="login-popup-footer flex">
            <div className="popup-btn dark-blue c-pointer">Deny</div>
            <div className="popup-btn dark-blue c-pointer">Allow</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowMnemonic;
