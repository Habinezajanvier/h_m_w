import closeImg from "../../../assets/images/icons/close.svg";
import manInSuitImg from "../../../assets/images/buisness-man-going.png";
import "../../../assets/styles/components/employeeCard.scss";

const EmployeeCard = ({ handleClick, show }) => {
  return (
    show && (
      <div className="employee-card">
        <div className="heading">
          <div className="left">
            <img src={manInSuitImg} alt="" />
            <div>
              <h1>Ramesh</h1>
              <span>Security</span>
            </div>
          </div>

          <img src={closeImg} alt="" onClick={handleClick} />
        </div>
        <div className="content">
          <div className="details">
            <h1>Chokidr ID</h1>
            <span>ABZ883YGFSZHN3</span>
          </div>

          <div className="details">
            <h1>Email</h1>
            <span>ryanbrevel@xyz.com</span>
          </div>
          <div className="details">
            <h1>Designation</h1>
            <span>Security officer</span>
          </div>
          <div className="details">
            <h1>Location</h1>
            <span>J.P.Nagar</span>
          </div>
          <div className="details">
            <h1>Phone</h1>
            <span>+16051346097</span>
          </div>
          <div className="details">
            <h1>City</h1>
            <span>Bengaluru</span>
          </div>
          <div className="details">
            <h1>Company</h1>
            <span>Walmart</span>
          </div>
        </div>
      </div>
    )
  );
};

export default EmployeeCard;
