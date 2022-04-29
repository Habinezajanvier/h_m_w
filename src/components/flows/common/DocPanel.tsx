import infoImg from "../../../assets/images/icons/info.svg";

const DocPanel = ({ icon, text }) => {
  return (
    <div>
      <img src={icon} alt="icon" />
      <h1>{text}</h1>
      <img src={infoImg} alt="info icon" className="info-icon" />
    </div>
  );
};

export default DocPanel;
