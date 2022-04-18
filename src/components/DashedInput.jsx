import { useEffect, useRef, useState } from "react";
import "../assets/styles/components/dashedInput.scss";

const DashedInput = ({ getValue, label, isForgotHidden }) => {
  const [input, setInput] = useState([]);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);
  const inputRef6 = useRef(null);

  // input fields ref array
  const refArr = [
    inputRef1,
    inputRef2,
    inputRef3,
    inputRef4,
    inputRef5,
    inputRef6,
  ];

  // returning value when all input filled
  useEffect(() => {
    input.join("").length > 5 && getValue && getValue(input.join(""));
  }, [input]);

  const handleInput = (value, nextref, id) => {
    let updatedInput = input;
    updatedInput[id] = value;
    setInput([...updatedInput]);

    // switching focus to the next input box
    value !== "" && nextref && nextref.current.focus();
  };

  return (
    <div className="dashedInput">
      <div className="label c-pointer text-center">
        {label ? label : "Enter Mnemonic password pin"}
      </div>
      <div className="input justify-center">
        {refArr.map((e, i) => (
          <input
            key={i}
            ref={e}
            type="text"
            maxLength={1}
            onChange={(e) => handleInput(e.target.value, refArr[i + 1], i)}
          />
        ))}
      </div>
      {!isForgotHidden && (
        <div className="color-skyBlue c-pointer bottomText">
          Forgot password?
        </div>
      )}
    </div>
  );
};

export default DashedInput;
