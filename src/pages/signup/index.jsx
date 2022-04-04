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

import FaceRecoginitionPanel from "../../components/FaceRecoginitionPanel";
import { registerUser } from "./registerUser";
import SearchQRCode from "./SearchQRCode";
import RegistrationLoading from "./RegistrationLoading";

const styles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // minHeight: "100vh",
};

const Signup = ({ ...props }) => {
  const [isMemonicScreen, setIsMemonicScreen] = useState(false);
  const [isMemonicScreen2, setIsMemonicScreen2] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [memonicPassword, setMemonicPassword] = useState("");
  const [memonicPassword2, setMemonicPassword2] = useState("");
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
    registerUser("+911234567890");
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
                          getValue={({ value, selectedValue }) => {
                            setPhone(value);
                            setCountryCode(selectedValue);
                          }}
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
                    // <SearchQRCode />

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
                        {isMemonicScreen && !isMemonicScreen2 && (
                          <DashedInput
                            getValue={(d) => setMemonicPassword(d)}
                            label="Set up a 6 digit pin to secure your mnemonic password"
                          />
                        )}
                        {isMemonicScreen2 && (
                          <DashedInput
                            getValue={(d) => setMemonicPassword2(d)}
                            label="Re-enter the 6 digit password"
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

                  {isMemonicScreen && !isMemonicScreen2 && (
                    <div className="signup-card-footer flex justify-evenly items-center flex-1 fd-column">
                      <div className="signup-btn">
                        <Button
                          outlined={false}
                          title={"Next"}
                          onClick={() => {
                            setIsMemonicScreen2(true);
                          }}
                        />
                      </div>
                    </div>
                  )}
                  {isMemonicScreen2 && (
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
