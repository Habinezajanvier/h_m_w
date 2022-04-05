import React from "react";
import Card from "../../components/Card";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";

const SignUpWrapper = ({ children, headText }) => {
  const navigate = useNavigate();
  return (
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
            <div>{headText ? headText : "Sign Up"} </div>
            <div></div>
          </div>

          {
              children
          }
        </div>
      </Card>
    </div>
  );
};

export default SignUpWrapper;
