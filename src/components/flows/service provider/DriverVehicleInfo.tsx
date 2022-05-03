import "../../../assets/styles/components/driverVehicleDetails.scss";
import driverIcon from "../../../assets/images/icons/driver.svg";
import fingerPrintIcon from "../../../assets/images/icons/finger_print.svg";
import vehicleInfoIcon from "../../../assets/images/icons/truck_info.svg";
import PcsDetail from "./PcsDetail";
import FingerPrintsDetails from "../common/FingerPrints";

const DriverVehicleDetails = () => {
  return (
    <div className="driver-vehicle-details-wrapper">
      <div className="left-side">
        <div className="heading">
          <img src={driverIcon} alt="" /> <h1>Driver Info</h1>
        </div>
        <div className="driver-vehicle-details-content">
          <PcsDetail name="Aadhar Card number:" value="1603 4567 8901" />
          <PcsDetail name="Driving license number:" value="KA202208987645" />
          <PcsDetail name="Date of birth:" value="26-07-1982" />
          <FingerPrintsDetails
            left={fingerPrintIcon}
            right={fingerPrintIcon}
            title="Thumb minutia:"
          />
        </div>
      </div>
      <div className="left-side">
        <div className="heading">
          <img src={vehicleInfoIcon} alt="" /> <h1>Vehicle Info</h1>
        </div>
        <div className="driver-vehicle-details-content">
          <PcsDetail
            name="Registration certificate number:"
            value="KA08987654321"
          />
          <PcsDetail
            name="Registration certificate date:"
            value="22nd March 2017"
          />
          <PcsDetail
            name="Registration certificate owner name:"
            value="Sundar"
          />
        </div>
      </div>
      <div className="right-side">
        <div>
          <h1>Driver Facial video:</h1>
          <img src="https://source.unsplash.com/user/c_v_r" alt="" />
        </div>
        <div>
          <h1>Vehicle Video</h1>
          <img src="https://source.unsplash.com/user/c_v_r" alt="" />
        </div>
      </div>
    </div>
  );
};

export default DriverVehicleDetails;
