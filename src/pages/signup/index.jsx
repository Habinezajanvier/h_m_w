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
import SignUpWrapper from "./SignUpWrapper";
import { testRegisterUser } from "./testRigister";
import { useMutation } from "urql";
import { storeInCredManager } from "../../utils/storeInCredManager";
import QRCode from "qrcode.react";

import { storeTokensInLevelDB } from "../../utils/levelDB";
import {
  registerMutation,
  sendOTPMutation,
  verifyOTPMutation,
} from "../../GQLQueries";
import GrabPhone from "./GrabPhone";
import { signupScreen } from "../../utils/screenOrder";
import { useDispatch, useSelector } from "react-redux";
import SendingOTP from "./SendingOTP";
import MnemonicScreen from "./MemonicScreen";
import {
  signupBackToPreviousView,
  signupCurrentView,
  signupValues,
} from "../../redux/modules/signup/signupSlice";

const styles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // minHeight: "100vh",
};

const Signup = ({ ...props }) => {
  const [isOtpSent, setIsOtpSent] = useState(false);

  const [mnenominPassword, setMnenominPassword] = useState("");
  const [mnenominPassword2, setMnenominPassword2] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [invalidOTP, setInvalidOTP] = useState(false);
  const [OTP, setOTP] = useState("");
  const [regProcessing, setRegProcessing] = useState(false);
  const [showMnemonicPhrase, setShowMnemonicPhrase] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [mnenominPhrase, setMnenominPhrase] = useState("");
  const [readyForFaceRegistration, setReadyForFaceRegistration] = useState(
    false
  );
  const navigate = useNavigate();

  const [updateResult, update] = useMutation(registerMutation);
  const [updateOTPResult, sendOTP] = useMutation(sendOTPMutation);
  const [updateVerifyOTPResult, verifyOTP] = useMutation(verifyOTPMutation);

  // redux
  const currentView = useSelector((state) => state.signup.currentView);
  const signupState = useSelector((state) => state.signup.signupData);
  const dispatch = useDispatch();

  // sendOTP mutation
  const handleSendOTPRequest = () => {
    sendOTP({ target: `${countryCode}${phone}` })
      .then((res) => {
        console.log("OTP sent", res);
        if (res.data !== undefined) {
          dispatch(signupCurrentView(1));
          dispatch(
            signupValues({
              phone: phone,
            })
          );

          let newOTP = res?.data?.otp;
          dispatch(
            signupValues({
              otp: newOTP,
            })
          );
          setTimeout(() => {
            setOTP(newOTP);
          }, 1000);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handlePhoneInput = (phoneNumber) => {
    const { value, selectedValue } = phoneNumber;
    setPhone(value);
    // setCountryCode(selectedValue);
  };

  const handleVerifyOTP = () => {
    let otpVerificationPayload = phone
      ? `${countryCode}${phone}`
      : `${countryCode}${signupState.phone}`;
    verifyOTP({ token: OTP, target: otpVerificationPayload })
      .then((res) => {
        if (res?.data?.verifyotp) {
          console.log("OTP verification", res);
          dispatch(signupCurrentView(2));
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleKeyPairGeneration = async () => {
    let registerObj = await testRegisterUser(
      `${countryCode}${phone}`,
      mnenominPassword
    );
    setMnenominPhrase(registerObj?.mnemonicPhrase);

    // delete registerObj?.mnemonicPhrase;

    update(registerObj)
      .then((res) => {
        console.log(res?.data);

        if (res?.data) {
          const storedInCred = storeInCredManager(
            registerObj.id,
            registerObj.metaInformation.firstName,
            registerObj.did
          );

          if (storedInCred) {
            console.log("user cred stored");
          }

          delete registerObj?.did;

          let stringifiedRegisterObj = JSON.stringify(registerObj);
          console.log(stringifiedRegisterObj);

          let registeredBuffer = Buffer.from(stringifiedRegisterObj).toString(
            "base64"
          );
          console.log(registeredBuffer);

          // createIndexedDB({ id: registerObj.id, userData: registeredBuffer });
          storeTokensInLevelDB(registerObj.id, registeredBuffer);

          console.log("after idb stoage");

          setShowMnemonicPhrase(true);
          console.log(registerObj);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
            <SignUpWrapper>
              {/* Enter phone number */}
              {signupScreen.phoneNumber === currentView && (
                <GrabPhone
                  phone={phone ? phone : signupState.phone}
                  handleSendOTPRequest={handleSendOTPRequest}
                  handlePhoneInput={handlePhoneInput}
                />
              )}

              {/* Enter OTP */}
              {signupScreen.otp === currentView && (
                <SendingOTP
                  OTP={OTP ? OTP : signupState.otp}
                  setOTP={setOTP}
                  otpImg={otpImg}
                  handleVerifyOTP={handleVerifyOTP}
                />
              )}

              {/* <div className="signup-card-body">
                  <div> */}
              {/* mnemonic password screen */}

              {signupScreen.mnemonic === currentView && (
                <MnemonicScreen
                  value={
                    mnenominPassword
                      ? mnenominPassword
                      : signupState.mnenominPassword
                  }
                  label={
                    "Set up a 6 digit pin to secure your mnemonic password"
                  }
                  getValue={(d) => setMnenominPassword(d)}
                  onSubmit={(value) => {
                    dispatch(signupCurrentView(3));
                    dispatch(signupValues({ mnenominPassword: value }));
                  }}
                />
              )}

              {/* confirm mnemonic password screen */}
              {signupScreen.confirmMnemonic === currentView && (
                <MnemonicScreen
                  value={
                    mnenominPassword2
                      ? mnenominPassword2
                      : signupState.confirmMnenominPassword
                  }
                  label={"Re-enter the 6 digit password"}
                  getValue={(d) => setMnenominPassword2(d)}
                  onSubmit={(value) => {
                    signupState.mnenominPassword === value &&
                      dispatch(signupCurrentView(4));
                    signupState.mnenominPassword === value &&
                      handleKeyPairGeneration();
                    signupState.mnenominPassword === value &&
                      dispatch(
                        signupValues({
                          confirmMnenominPassword: value,
                        })
                      );
                  }}
                />
              )}

              {signupScreen.mnemonicPhrase === currentView &&
                (mnenominPhrase ? (
                  <>
                    <label className="mnemonicPhraseLabel">
                      Your mnemonic phrase is
                    </label>
                    <div className="mnemonicPhraseContainer">
                      {mnenominPhrase}
                    </div>
                  </>
                ) : (
                  dispatch(signupBackToPreviousView())
                ))}

              {signupScreen.QRCode === currentView && (
                //  mnenominPhrase ? (
                <>
                  <label className="mnemonicPhraseLabel">
                    Your mnemonic password is encrypted as a QR code
                  </label>
                  <div className="mnemonicQRCodeContainer">
                    <QRCode value={mnenominPassword} level={"H"} size={170} />
                  </div>
                </>
                //  ) : (
                // dispatch(signupCurrentView(3))
                // ))}
              )}

              {/* Footer */}

              {signupScreen.mnemonicPhrase === currentView && (
                <div className="signup-card-footer flex justify-evenly items-center flex-1 fd-column">
                  <div className="signup-btn">
                    <Button
                      outlined={false}
                      title={"Next"}
                      onClick={() => {
                        // setShowMnemonicPhrase(false);
                        // setShowQRCode(true);
                        dispatch(signupCurrentView(5));
                      }}
                    />
                  </div>
                </div>
              )}

              {signupScreen.QRCode === currentView && (
                <div className="signup-card-footer flex justify-evenly items-center flex-1 fd-column">
                  <div className="signup-btn">
                    <Button
                      outlined={false}
                      title={"Save QR code on this device"}
                      onClick={() => {
                        setReadyForFaceRegistration(true);
                        setShowQRCode(false);
                        // dispatch(signupCurrentView(6))
                      }}
                    />
                  </div>
                </div>
              )}
            </SignUpWrapper>
          )}
        </>
      )}
    </div>
  );
};

export default Signup;
