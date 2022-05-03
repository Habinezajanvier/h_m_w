const TextInput = ({ value, handleChange, className, disabled }) => {
  return (
    <input
      value={value}
      onChange={handleChange}
      className={className}
      disabled={disabled}
    />
  );
};

export default TextInput;
