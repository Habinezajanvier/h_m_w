import packageImg from "../assets/images/icons/add_package.svg";
import "../assets/styles/components/addPackage.scss";

const AddPackage = ({ onClick }) => {
  return (
    <div className="packageBtn" onClick={onClick}>
      <img src={packageImg} alt="packag img" />
    </div>
  );
};

export default AddPackage;
