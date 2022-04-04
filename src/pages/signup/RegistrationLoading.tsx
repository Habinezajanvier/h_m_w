import React from "react";
import regLoadingImg from "../../assets/images/registration-loading.png";

const RegistrationLoading = ({ label }) => {
  return (
    <div className="registrationLoading flex-center-center fd-column min-h-100vh flex-1">
      <img src={regLoadingImg} alt="chokidr" />
      <div className="registrationLabel">Connecting to public network</div>
    </div>
  );
};

export default RegistrationLoading;
