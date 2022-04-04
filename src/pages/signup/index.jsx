import "../../assets/styles/signup.scss";
import Button from "../../components/Button";
import Card from "../../components/Card";
import DashedInput from "../../components/DashedInput";
import AuthHeader from "../../components/AuthHeader";
import SelectableInput from "../../components/SelectableInput";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import otpImg from "../../assets/images/otp.png";
import regLoadingImg from "../../assets/images/registration-loading.png";
import FaceRecoginitionPanel from "../../components/FaceRecoginitionPanel";
import { registerUser } from "./registerUser";

const RegistrationLoading = ({ label }) => {
  return (
    <div className="registrationLoading flex-center-center fd-column min-h-100vh flex-1">
      <img src={regLoadingImg} alt="chokidr" />
      <div className="registrationLabel">Connecting to public network</div>
    </div>
  );
};

const styles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // minHeight: "100vh",
};

const SearchingQRCode = () => {
  return (
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
  );
};

const Signup = ({ ...props }) => {
  const [isMemonicScreen, setIsMemonicScreen] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [memonicPassword, setMemonicPassword] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState("");
  const [invalidOTP, setInvalidOTP] = useState(false);
  const [OTP, setOTP] = useState("");
  const [regProcessing, setRegProcessing] = useState(false);
  const [readyForFaceRegistration, setReadyForFaceRegistration] = useState(
    false
  );
  const navigate = useNavigate();

  useEffect(() => {
    // registerUser();
  }, []);

  // handling data from inputbox
  const handleInput = (data) => {
    const { value, selectedValue } = data;
    if (isOtpSent) {
      // testing invalid otp err text
      if (value === "123456") {
        setInvalidOTP(true);
      } else {
        invalidOTP && setInvalidOTP(false);
      }
      setOTP(value);
    } else {
      setPhone(`${value}${selectedValue}`);
    }
  };

  const handlePhoneInput = (data) => {
    const { value, selectedValue } = data;
    setPhone(`${value}${selectedValue}`);
  };

  return (
    <div className="signup">
      {regProcessing ? (
        <RegistrationLoading />
      ) : (
        <>
          <AuthHeader />
          <div className="chokidr-title">C H O K I D R</div>

          {readyForFaceRegistration ? (
            <div style={styles}>
              <FaceRecoginitionPanel />
            </div>
          ) : (
            <div className="signupCard">
              <Card>
                <div className="container">
                  <div className="signup-card-head flex items-center justify-between w100">
                    <div className="flex items-center ">
                      <KeyboardBackspaceIcon
                        onClick={() => navigate(-1)}
                        className={"c-pointer"}
                      />
                    </div>
                    <div>
                      {isMemonicScreen ? "Mnemonic password" : "Sign Up"}{" "}
                    </div>
                    <div></div>
                  </div>

                  {/* Enter phone number */}
                  {!isOtpSent && !isMemonicScreen && (
                    <div className="signup-card-body">
                      <div>
                        <SelectableInput
                          inputValue={""}
                          placeholder={"Enter Phone Number"}
                          type="number"
                          maxLength={10}
                          getValue={(data) => setPhone(data)}
                          withSelectable={true}
                        />
                      </div>
                      <div className="signup-btn">
                        <Button
                          outlined={false}
                          title={"Verify"}
                          onClick={() => {
                            setIsOtpSent(true);
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Enter OTP */}
                  {
                    //  popup for searching QR Code
                    // <SearchingQRCode />

                    isOtpSent && !isMemonicScreen && (
                      <div className="signup-card-body">
                        <div>
                          <SelectableInput
                            inputValue={OTP}
                            placeholder={"Enter OTP"}
                            type="number"
                            maxLength={6}
                            getValue={({ value }) => setOTP(value)}
                            withSelectable={false}
                            selectIcon={otpImg}
                            errText={
                              invalidOTP && isOtpSent ? "Incorrect OTP" : ""
                            }
                          />
                        </div>
                      </div>
                    )
                  }

                  {
                    // memonic passwork/phone input
                    <div className="signup-card-body">
                      <div>
                        {isMemonicScreen && (
                          <DashedInput
                            getValue={(d) => setMemonicPassword(d)}
                          />
                        )}
                      </div>
                    </div>
                  }

                  {/* Footer */}
                  {isOtpSent && !isMemonicScreen && (
                    <div className="signup-card-footer flex justify-evenly items-center flex-1 fd-column">
                      {OTP.length === 6 && (
                        <div className="signup-btn">
                          <Button
                            outlined={false}
                            title={isMemonicScreen ? "Next" : "Continue"}
                            onClick={() => {
                              setIsMemonicScreen(true);
                            }}
                          />
                        </div>
                      )}

                      <div className="label">
                        <span>Didn’t receive OTP?</span>
                        <span className="color-skyBlue c-pointer"> Resend</span>
                      </div>
                    </div>
                  )}

                  {isMemonicScreen && (
                    <div className="signup-card-footer flex justify-evenly items-center flex-1 fd-column">
                      <div className="signup-btn">
                        <Button
                          outlined={false}
                          title={"Next"}
                          onClick={() => {
                            setReadyForFaceRegistration(true);
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Signup;
