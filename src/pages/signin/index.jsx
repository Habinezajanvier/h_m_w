import Button from "../../components/Button";
import Card from "../../components/Card";
import AuthHeader from "../../components/AuthHeader";
import SelectableInput from "../../components/SelectableInput";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "../../assets/styles/master.scss";
import "../../assets/styles/login.scss";
import { useState } from "react";
import DashedInput from "../../components/DashedInput";
import loadingImg from "../../assets/images/loading.png";
import closeImage from "../../assets/images/close-red.svg";

const Signin = ({ ...props }) => {
  const [isMemonicScreen, setIsMemonicScreen] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState("");
  const [searchingPassOnDevice, setSearchingPassOndevice] = useState(true);
  const [memonicPasswordNotFound, setMemonicPasswordNotFound] = useState(true);
  const [allowMemonicPassSearch, setAllowMemonicPassSearch] = useState(false);

  return (
    <div className="login">
      <AuthHeader />
      <div className="title">C H O K I D R</div>
      <div className="loginCard">
        <Card>
          <div className="container">
            <div className="login-card-head flex items-center justify-between w100">
              <div className="flex items-center ">
                {isMemonicScreen && (
                  <KeyboardBackspaceIcon
                    onClick={() => setIsMemonicScreen(false)}
                    className={"c-pointer"}
                  />
                )}
              </div>
              <div>Sign in</div>
              <div></div>
            </div>

            {
              //  popup for searching QR Code
              <div className="login-popup-container">
                {searchingPassOnDevice && allowMemonicPassSearch ? (
                  <div className="password-searching">
                    <div className="text-center">
                      <img
                        src={memonicPasswordNotFound ? closeImage : loadingImg}
                        alt="loading"
                        className={memonicPasswordNotFound ? "" : "loading-img"}
                      />
                    </div>
                    {memonicPasswordNotFound ? (
                      <div className="red-dark text-center">
                        QR code not found on this device you cannot proceed
                        further
                      </div>
                    ) : (
                      <div className={"text-center  gray-200 "}>
                        Searching for the mnemonic password QR code stored on
                        this device
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="login-popup">
                    {!allowMemonicPassSearch && (
                      <>
                        <div className="text-center">Allow to search this device to scan QR code?</div>
                        <div className="login-popup-footer flex">
                          <div className="popup-btn dark-blue c-pointer">
                            Deny
                          </div>
                          <div className="popup-btn dark-blue c-pointer" onClick={() => setAllowMemonicPassSearch(true)}>
                            Allow
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              // memonic passwork/phone input
              /* <div className="login-card-body">
              <div>
                {isMemonicScreen ? (
                  <DashedInput getValue={(d) => console.log(d)} />
                ) : (
                  <SelectableInput
                    placeholder="Enter Phone Number"
                    type="number"
                  />
                )}
              </div>
            </div> */
            }

            {/* Footer */}
            {/* <div className="login-card-footer">
              <Button
              outlined={false}
                title={isMemonicScreen ? "Proceed" : "Continue"}
                onClick={() => {
                  setIsMemonicScreen(true);
                }}
              />
              <div className="label">
                <span>Don’t have an account? </span>
                <span className="color-skyBlue c-pointer">Sign up</span>
              </div>
            </div> */}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Signin;
