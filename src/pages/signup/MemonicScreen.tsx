import React, { useState } from "react";
import Button from "../../components/Button";
import DashedInput from "../../components/DashedInput";

const MnemonicScreen = ({ btnText, getValue, label, onSubmit, value }) => {
  const [mnemonicPassword, setMnemonicPassword] = useState("");

  return (
    <>
      <div className="signup-card-body">
        <div>
          <DashedInput
            getValue={(d: any) => setMnemonicPassword(d)}
            label={label}
            isForgotHidden={true}
            value={value}
          />
        </div>
      </div>

      <div className="signup-card-footer flex justify-evenly items-center flex-1 fd-column">
        <div className="signup-btn">
          {onSubmit && (
            <Button
              outlined={false}
              title={btnText ? btnText : "Next"}
              onClick={() => {
                getValue(mnemonicPassword);
                onSubmit(mnemonicPassword);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MnemonicScreen;
