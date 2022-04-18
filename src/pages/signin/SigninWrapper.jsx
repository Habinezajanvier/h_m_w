import React from "react";
import Card from "../../components/Card";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const SigninWrapper = ({ isMemonicScreen, setIsMemonicScreen, children }) => {
  return (
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
            {children}
        </div>
      </Card>
    </div>
  );
};

export default SigninWrapper;
