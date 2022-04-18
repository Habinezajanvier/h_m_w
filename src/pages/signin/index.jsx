import Button from "../../components/Button";
import Card from "../../components/Card";
import AuthHeader from "../../components/AuthHeader";
import SelectableInput from "../../components/SelectableInput";

import "../../assets/styles/master.scss";
import "../../assets/styles/login.scss";
import { useEffect, useState } from "react";
import DashedInput from "../../components/DashedInput";
import loadingImg from "../../assets/images/loading.png";
import closeImage from "../../assets/images/close-red.svg";
import { getSigninTokens } from "./getSigninTokens";
import { useMutation } from "urql";
import SigninWrapper from "./SigninWrapper";
import successImg from "../../assets/images/green-correct-success.png";
import { readIndexedDB } from "../../utils/indexedDBInteraction";
import { getFromCredManager } from "../../utils/storeInCredManager";
import { useNavigate } from "react-router-dom";

const AllowSearchQRCode = ({
  setIsSearchingScreen,
  setisSearchQRCodeScreen,
}) => {
  return (
    <>
      <div className="text-center">
        Allow to search this device to scan QR code?
      </div>
      <div className="login-popup-footer flex">
        <div className="popup-btn dark-blue c-pointer">Deny</div>
        <div
          className="popup-btn dark-blue c-pointer"
          onClick={() => {
            setIsSearchingScreen(true);
            setisSearchQRCodeScreen(false);
          }}
        >
          Allow
        </div>
      </div>
    </>
  );
};

const signinMutation = `
mutation(
  $id: ID!, 
  $did: String!,
  $createdTime: String!,
  $proofOfPossession: JSON,
  $signature: Signature!
) {
 login(login:{
  id: $id,
  createdTime: $createdTime,
  proofOfPossession: $proofOfPossession,
    graph: {},
    root: "",
    did: $did,
    proof:{},
    event: {},
    role: "admin"
    signature: $signature
  }
  ){
    id,
    accesstoken,
    createdTime,
    organisationDID,
    approved,
    approverDid,
    registrationState,
  }
}

`;

const Signin = ({ ...props }) => {
  const [isMemonicScreen, setIsMemonicScreen] = useState(false);
  const [isSearchQRCodeScreen, setisSearchQRCodeScreen] = useState(false);
  const [isSearchingScreen, setIsSearchingScreen] = useState(false);
  const [isResetPinScreen, setIsResetPinScreen] = useState(false);
  const [isConfirmResetPinScreen, setIsConfirmResetPinScreen] = useState(false);
  const [isSuccessScreen, setIsSuccessScreen] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState();
  const [isPhoneScreen, setIsPhoneScreen] = useState(true);
  const [searchingPassOnDevice, setSearchingPassOndevice] = useState(false);
  const [memonicPasswordNotFound, setMemonicPasswordNotFound] = useState(false);
  const [allowMemonicPassSearch, setAllowMemonicPassSearch] = useState(false);
  const [updateSigninReq, signinReq] = useMutation(signinMutation);
  const naviate = useNavigate();
  // user data from device
  const [userData, setUserData] = useState(null);

  const handlePhone = (value, selectedValue) => {
    setPhone(value);
    setCountryCode(selectedValue);
  };

  useEffect(() => {
    isSearchingScreen &&
      setTimeout(() => {
        setIsSearchingScreen(false);
        setIsResetPinScreen(true);
      }, 3000);
  }, [isSearchingScreen]);

  useEffect(() => {}, []);

  const handleLogin = () => {
    let request = window.indexedDB.open("userTokens", 1);
    request.onsuccess = (e) => {
      let db = e.target.result;
      let tx = db.transaction("user_store", "readonly");
      let userStore = tx.objectStore("user_store");
      let openRequest = userStore.openCursor();
      openRequest.onsuccess = (r) => {
        const cursor = r.target.result;

        if (cursor) {
          let value = cursor.value?.userData;
          let userDataObj = JSON.parse(atob(value));

          navigator.credentials
            .get({
              password: true,
              federated: {
                provider: ["http://localhost:1234/"],
              },
              unmediated: true,
            })
            .then(function (credentialInfoAssertion) {
              let did = credentialInfoAssertion.password;
              userDataObj.did = did;

              console.log("userData:", userDataObj);

              setUserData(userDataObj);
              // making login request
              signinReq(userDataObj)
                .then((res) => {
                  if (res.data) {
                    console.log(res.data?.login);
                  }

                  setIsSuccessScreen(true);
                  setIsConfirmResetPinScreen(false);
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch(function (err) {
              console.error(err);
            });
        }
      };
    };
  };

  return (
    <div className="login">
      <AuthHeader />
      <div className="title">C H O K I D R</div>
      <SigninWrapper
        isMemonicScreen={isMemonicScreen}
        setIsMemonicScreen={setIsMemonicScreen}
      >
        {/* // memonic passwork/phone input */}
        <div className="login-card-body">
          <div>
            {isMemonicScreen && (
              <DashedInput
                getValue={(d) => console.log(d)}
                label={"Enter Mnemonic password pin"}
              />
            )}

            {isPhoneScreen && (
              <SelectableInput
                placeholder="Enter Phone Number"
                type="number"
                maxLength={10}
                value={phone}
                getValue={({ value, selectedValue }) =>
                  handlePhone(value, selectedValue)
                }
              />
            )}

            {isResetPinScreen && (
              <div className="reset-pin-label">
                Your mnemonic password is found in the device DELL8937
              </div>
            )}

            {isConfirmResetPinScreen && (
              <div className="reset-pin-label">
                Your mnemonic password is found in the device DELL8937
              </div>
            )}

            {/* popups */}
            <div className="login-popup-container">
              {isSearchQRCodeScreen && (
                <div className="login-popup">
                  {!allowMemonicPassSearch && (
                    <AllowSearchQRCode
                      setIsSearchingScreen={setIsSearchingScreen}
                      setisSearchQRCodeScreen={setisSearchQRCodeScreen}
                    />
                  )}
                </div>
              )}

              {/* searching screen */}

              {isSearchingScreen && (
                <div className="password-searching">
                  <div className="text-center">
                    <img
                      src={loadingImg}
                      alt="loading"
                      className={"loading-img"}
                    />
                  </div>
                  <div className={"text-center  gray-200 "}>
                    Searching for the mnemonic password QR code stored on this
                    device
                  </div>
                </div>
              )}

              {/* success screen */}
              {isSuccessScreen && (
                <div className="success-panel">
                  <div className="text-center">
                    <img src={successImg} alt="loading" className={""} />
                  </div>
                  <div className={"text-center  gray-200 "}>
                    Your mnemonic password’s QR code has been successfully
                    stored in the device RX45632
                  </div>
                </div>
              )}

              {/* reset Pin */}
              {isResetPinScreen && (
                <>
                  <DashedInput
                    getValue={(d) => console.log(d)}
                    label={"Reset the 6 digit secure pin"}
                    isForgotHidden={true}
                  />
                </>
              )}

              {isConfirmResetPinScreen && (
                <>
                  <DashedInput
                    getValue={(d) => console.log(d)}
                    label={"Confirm the 6 digit secure pin"}
                    isForgotHidden={true}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="login-card-footer">
          {isPhoneScreen && (
            <Button
              outlined={false}
              title={"Continue"}
              onClick={() => {
                setIsPhoneScreen(false);
                setIsMemonicScreen(true);
              }}
            />
          )}
          {isMemonicScreen && (
            <Button
              outlined={false}
              title={"Proceed"}
              onClick={() => {
                setIsMemonicScreen(false);
                setisSearchQRCodeScreen(true);
              }}
            />
          )}

          {isResetPinScreen && (
            <Button
              outlined={false}
              title={"Next"}
              onClick={() => {
                setIsResetPinScreen(false);
                setIsConfirmResetPinScreen(true);
              }}
            />
          )}

          {isConfirmResetPinScreen && (
            <Button
              outlined={false}
              title={"Login"}
              onClick={() => {
                handleLogin();
              }}
            />
          )}

          {isSuccessScreen && (
            <Button
              outlined={false}
              title={"Continue"}
              onClick={() => {
                naviate("/dashboard");
              }}
            />
          )}

          {isMemonicScreen && (
            <div className="label">
              <span>Don’t have an account? </span>
              <span className="color-skyBlue c-pointer">Sign up</span>
            </div>
          )}

          {isPhoneScreen && (
            <div className="label">
              <span>Don’t have an account? </span>
              <span className="color-skyBlue c-pointer" onClick={() => naviate("/signup")}>Sign up</span>
            </div>
          )}
        </div>
      </SigninWrapper>
    </div>
  );
};

export default Signin;
