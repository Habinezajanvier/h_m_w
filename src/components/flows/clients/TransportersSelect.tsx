import SelectorInput from "../common/SelectorInput";

const TransportersSelect = ({ options, label, className }) => {
  return (
    <SelectorInput options={options} label={label} className={className} />
  );
};

export default TransportersSelect;
