import camImg from "../../../assets/images/devices/cam_img.svg";
import activeIndicatorDot from "../../../assets/images/devices/active_dot.svg";
import inactiveIndicatorDot from "../../../assets/images/devices/inactive_dot.svg";

const SensorView = ({ status, cameraId, cameraName }) => {
  return (
    <div className="sensor-details">
      <div className="cam-img">
        <img src={camImg} alt="camera" />
        <div className="dot">
          {(status === "Active" && (
            <img src={activeIndicatorDot} alt="active" />
          )) || <img src={inactiveIndicatorDot} alt="inactive" />}
        </div>
      </div>

      <div className="camera-heading">
        <h1 className="upper-text">{cameraId}</h1>
        <h1 className="lower-text">{cameraName}</h1>
      </div>
      <h1 className={`status ${status === "Active" ? "active" : "inactive"}`}>
        {status}
      </h1>
    </div>
  );
};

export default SensorView;
