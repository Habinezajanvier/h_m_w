import "./index.scss";

const DocButton = ({ icon, text }) => {
  return (
    <button className="doc-button">
      <img src={icon} alt="" className="btn-img" />
      <span className="btn-text">{text}</span>
    </button>
  );
};

export default DocButton;
