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

const styles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // minHeight: "100vh",
};

const registerMutation = `
mutation(
  $id: ID!, 
  $did: String!,
  $role: String!,
  $createdTime: String!,
  $metaInformation: MetaData!,
  $proofOfPossession: JSON,
  $signature: Signature!

  
  ){
  register(signup: 
    {
    id: $id,
    
    did: $did,
    
    role: $role,
    
    createdTime: $createdTime,
    
    metaInformation: $metaInformation,
    
    proofOfPossession: $proofOfPossession,
    signature: $signature,
    
  }
  
  ){
    id,
    peerId,
    createdTime,
    controller,
    approverDid,
    system_approved,
    organisationDID,
    organisation_approved,
    registrationState,
    root,
    graph,
    proof,
    blacklisted,
    signature,
  }
}
`;

const sendOTPMutation = `
mutation(
  $target: String!, 
){
  otp(target: $target, regenerate: true)
}
`;

const verifyOTPMutation = `
mutation(
  $token: String!,
  $target: String!, 
){
  verifyotp(token: $token, target: $target)
}
`;

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
  const [generateMnenominPhrase, setGenerateMnenominPhrase] = useState(false);
  const [showMnemonicPhrase, setShowMnemonicPhrase] = useState(false);
  const [mnenominPhrase, setMnenominPhrase] = useState("");
  const [readyForFaceRegistration, setReadyForFaceRegistration] = useState(
    false
  );
  const navigate = useNavigate();

  const [updateResult, update] = useMutation(registerMutation);
  const [updateOTPResult, sendOTP] = useMutation(sendOTPMutation);
  const [updateVerifyOTPResult, verifyOTP] = useMutation(verifyOTPMutation);

  useEffect(async () => {
    // const registerObj = testRegisterUser();
    // console.log("testRegisterUser", await registerObj);
    // registerUser("+911234567890")
    //   .then((res) => {
    //     const {
    //       id,
    //       did,
    //       role,
    //       createdTime,
    //       metaInformation,
    //       proofOfPossession,
    //       signature,
    //     } = res;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  // sendOTP mutation
  const handleSendOTPRequest = () => {
    sendOTP({ target: `${countryCode}${phone}` })
      .then((res) => {
        console.log("OTP sent", res);
        if (res.data !== undefined) {
          setIsOtpSent(true);
          let newOTP = res?.data?.otp;
          setTimeout(() => {
            setOTP(newOTP);
          }, 1000);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

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

  const handlePhoneInput = (phoneNumber) => {
    const { value, selectedValue } = phoneNumber;
    setPhone(value);
    setCountryCode(selectedValue);
  };

  // mutating user
  const registerUser = async () => {
    // const registerObj = await testRegisterUser();
    // update(registerObj)
    //   .then((res) => {
    //     (res) => {
    //       console.log(res);
    //     };
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const handleVerifyOTP = () => {
    verifyOTP({ token: OTP, target: `${countryCode}${phone}` })
      .then((res) => {
        if (res?.data?.verifyotp) {
          console.log("OTP verification", res);
          setIsMemonicScreen(true);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleKeyPairGeneration = async () => {
    let registerObj = await testRegisterUser(
      `${countryCode}${phone}`,
      memonicPassword
    );
    setMnenominPhrase(registerObj?.mnemonicPhrase);

    delete registerObj?.mnemonicPhrase;

    update(registerObj)
      .then((res) => {
        console.log(res?.data);

        if (res?.data) {
          // const storedInCred = storeInCredManager(
          //   registerObj.id,
          //   registerObj.did,
          //   registerObj.metaInformation.firstName,

          // );
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
              {!isOtpSent && !isMemonicScreen && (
                <div className="signup-card-body">
                  <div>
                    <SelectableInput
                      inputValue={phone?.toString()}
                      placeholder={"Enter Phone Number"}
                      type="number"
                      maxLength={10}
                      getValue={(phoneNumber) => {
                        handlePhoneInput(phoneNumber);
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
                          handleSendOTPRequest();
                          // registerUser();
                        }}
                      />
                    )}
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
                        inputValue={OTP?.toString()}
                        placeholder={"Enter OTP"}
                        type="number"
                        maxLength={6}
                        getValue={({ value }) => setOTP(value)}
                        withSelectable={false}
                        selectIcon={otpImg}
                        errText={invalidOTP && isOtpSent ? "Incorrect OTP" : ""}
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
                    {isMemonicScreen2 && !showMnemonicPhrase && (
                      <DashedInput
                        getValue={(d) => setMemonicPassword2(d)}
                        label="Re-enter the 6 digit password"
                      />
                    )}
                  </div>
                </div>
              }

              {showMnemonicPhrase && (
                <>
                  <label className="mnemonicPhraseLabel">
                    Your mnemonic phrase is
                  </label>
                  <div className="mnemonicPhraseContainer">
                    {mnenominPhrase}
                  </div>
                </>
              )}

              {/* Footer */}
              {isOtpSent && !isMemonicScreen && (
                <div className="signup-card-footer flex justify-evenly items-center flex-1 fd-column">
                  {OTP?.toString()?.length === 6 && (
                    <div className="signup-btn">
                      <Button
                        outlined={false}
                        title={isMemonicScreen ? "Next" : "Continue"}
                        onClick={() => {
                          isMemonicScreen
                            ? setIsMemonicScreen(true)
                            : handleVerifyOTP();
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
              {isMemonicScreen2 && !showMnemonicPhrase && (
                <div className="signup-card-footer flex justify-evenly items-center flex-1 fd-column">
                  <div className="signup-btn">
                    <Button
                      outlined={false}
                      title={"Next"}
                      onClick={() => {
                        // setReadyForFaceRegistration(true);
                        handleKeyPairGeneration();
                      }}
                    />
                  </div>
                </div>
              )}

              {showMnemonicPhrase && (
                <div className="signup-card-footer flex justify-evenly items-center flex-1 fd-column">
                  <div className="signup-btn">
                    <Button
                      outlined={false}
                      title={"Next"}
                      onClick={() => {
                        setReadyForFaceRegistration(true);
                        setShowMnemonicPhrase(false);
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
