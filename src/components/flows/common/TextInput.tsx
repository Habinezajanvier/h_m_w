import { ChangeEvent, ChangeEventHandler, FC } from "react";

interface inputProps {
  value: string | number;
  handleChange: (e:ChangeEvent<HTMLInputElement>) => void;
  className?:string;
  disabled?:boolean;
  type?:string;
  placeholder?:string
}

const TextInput:FC<inputProps> = ({ value, handleChange, className, disabled,type,placeholder }) => {
  return (
    <input
      value={value}
      onChange={handleChange}
      className={className}
      disabled={disabled}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default TextInput;
