import deviceIcon from "../../../../assets/images/devices/green_device.svg";
import greenPlusSign from "../../../../assets/images/devices/green_plus_sign.svg";
import "../../../../assets/styles/components/collapsibleLocationBar.scss";

const AddNewDevice = () => {
  return (
    <div className={`device-item flex justify-between`}>
      <div className="flex items-center location-item-details">
        <div className="location-status">
          <img
            src={deviceIcon}
            alt="signal"
            className="location-status-signalimg"
          />
        </div>
        <div className="location-id c-pointer green-txt">Add New Device</div>
      </div>
      <div>
        <img src={greenPlusSign} alt="add icon" className="c-pointer" />
      </div>
    </div>
  );
};

export default AddNewDevice;
