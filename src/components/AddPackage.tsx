import packageImg from "../assets/images/icons/add_package.svg";
import "../assets/styles/components/addPackage.scss";

const AddPackage = ({ onClick }) => {
  return (
    <div className="packageBtn" onClick={onClick}>
      <img src={packageImg} alt="packag img" />
      <h1>Add Package</h1>
    </div>
  );
};

export default AddPackage;
