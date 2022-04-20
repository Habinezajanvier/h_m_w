import React from "react";
import Card from "../../components/Card";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupBackToPreviousView } from "../../redux/modules/signup/signupSlice";

const SignUpWrapper = ({ children, headText }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="signupCard">
      <Card>
        <div className="container">
          <div className="signup-card-head flex items-center justify-between w100">
            <div className="flex items-center ">
              <KeyboardBackspaceIcon
                onClick={() => dispatch(signupBackToPreviousView())}
                className={"c-pointer"}
              />
            </div>
            <div>{headText ? headText : "Sign Up"} </div>
            <div></div>
          </div>

          {children}
        </div>
      </Card>
    </div>
  );
};

export default SignUpWrapper;
