import { useState } from "react";
import "../../../assets/styles/components/deviceDetails.scss";
import deviceOnIcon from "../../../assets/images/devices/device_on.svg";
import deviceOffIcon from "../../../assets/images/devices/device_off.svg";
import deviceRefreshIcon from "../../../assets/images/devices/device_refresh.svg";
import macIdIcon from "../../../assets/images/devices/mac_id.svg";
import locationIcon from "../../../assets/images/devices/location.svg";
import stakeholderIcon from "../../../assets/images/devices/stakeholder.svg";
import operationIcon from "../../../assets/images/devices/operation.svg";
import incidentIcon from "../../../assets/images/devices/incident.svg";
import DeviceData from "./DeviceData";
import SensorView from "./SensorView";

const DeviceDetails = () => {
  const [active, setActive] = useState("device");
  const [deviceState, setDeviceState] = useState("on");

  const handleActive = (status) => {
    setActive(status);
  };

  const handleDeviceState = () => {
    setActive("device");
    if (deviceState === "on") {
      setDeviceState("off");
    } else {
      setDeviceState("on");
    }
  };
  return (
    <div className="device-details">
      <div className="details-heading">
        <div className="device" onClick={() => handleActive("device")}>
          <h1>Device</h1>
          <div className={(active === "device" && "active") || ""}></div>
        </div>

        <div className="sensors" onClick={() => handleActive("sensors")}>
          <h1>Sensors</h1>
          <div className={(active === "sensors" && "active") || ""}></div>
        </div>
      </div>
      <div className="details-content">
        <div className="details-buttons">
          {(deviceState === "on" && (
            <img src={deviceOnIcon} alt="" onClick={handleDeviceState} />
          )) || <img src={deviceOffIcon} alt="" onClick={handleDeviceState} />}
          <img src={deviceRefreshIcon} alt="" />
        </div>
        <div className="details-data">
          {(active === "device" && (
            <div className="device-data">
              <DeviceData
                icon={macIdIcon}
                classTop="grey-text"
                textTop="MAC ID"
                classBottom="white-text"
                textBottom="CINV6612 "
              />
                 <DeviceData
                icon={incidentIcon}
                classTop="grey-text"
                textTop="Current state"
                classBottom={
                  (deviceState === "on" && "green-text") || "red-text"
                }
                textBottom={(deviceState === "on" && "Enabled") || "Disabled"}
              />
              <DeviceData
                icon={locationIcon}
                classTop="grey-text"
                textTop="Current location"
                classBottom="white-text"
                textBottom="YJ2, Altro Towers"
              />

              <DeviceData
                icon={locationIcon}
                classTop="grey-text"
                textTop="Geospatial"
                classBottom="white-text"
                textBottom="12.979119,
77.591299"
              />
              <DeviceData
                icon={macIdIcon}
                classTop="grey-text"
                textTop="Stakeholders"
                classBottom="blue-text"
                textBottom="Kevin Daves +3"
              />
               <DeviceData
                icon={operationIcon}
                classTop="grey-text"
                textTop="Operation"
                classBottom="green-text"
                textBottom="Assigned"
              />
              <DeviceData
                icon={incidentIcon}
                classTop="grey-text"
                textTop="Incident updation"
                classBottom="white-text"
                textBottom="Sensor"
              />
                <DeviceData
                icon={stakeholderIcon}
                classTop="grey-text"
                textTop="Added by"
                classBottom="blue-text"
                textBottom="Kevin Daves"
              />
           
           
             
            
            </div>
          )) || (
            <div className="sensors-data">
              <SensorView
                cameraName="Camera_1 "
                cameraId="CINV6611 "
                status="Inactive"
              />
              <SensorView
                cameraName="Camera_2 "
                cameraId="CINV6612 "
                status="Active"
              />
              <SensorView
                cameraName="Camera_3 "
                cameraId="CINV6613 "
                status="Inactive"
              />
              <SensorView
                cameraName="Camera_4 "
                cameraId="CINV6614 "
                status="Active"
              />
              <SensorView
                cameraName="Camera_5 "
                cameraId="CINV6615 "
                status="Inactive"
              />
              <SensorView
                cameraName="Camera_6 "
                cameraId="CINV6616 "
                status="Inactive"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviceDetails;
