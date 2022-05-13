import { FC, useState } from "react";
import FlowButton from "../common/FlowButton";
import TextInput from "../common/TextInput";
import "../../../assets/styles/components/addDevice.scss";

interface loginProps {
  show: boolean;
  handleStep: (step: string) => void;
}
const LoginForm: FC<loginProps> = ({ show, handleStep }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    show && (
      <div className="device-login-form">
        <div className="form-inputs">
          <TextInput
            value={username}
            handleChange={(e) => setUserName(e.target.value)}
            type="text"
            className=""
            placeholder="Username"
          />
          <TextInput
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
            type="password"
            className=""
            placeholder="Password"
          />
          <span>Forgot password</span>
        </div>

        <FlowButton
          text="Login"
          onClick={() => handleStep("add-device-form")}
        />
      </div>
    )
  );
};

export default LoginForm;
