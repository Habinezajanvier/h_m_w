import { FC } from "react";
import VehicleDetail from "../common/VehicleDetail";
import engineIcon from "../../../assets/images/icons/engine.svg";
import clutchIcon from "../../../assets/images/icons/clutch.svg";
import brakeIcon from "../../../assets/images/icons/brake.svg";
import sensorIcon from "../../../assets/images/icons/sensor.svg";
import signatureProofCheckIcon from "../../../assets/images/icons/signature_proof_check.svg";
import "../../../assets/styles/components/vehicleInfo.scss";
import VehicleHealth from "../common/VehicleHealth";
import cryptoImg from "../../../assets/images/icons/crypto_details.svg";
import { ClassNames } from "@emotion/react";
import { useStyles } from "../styles";

interface vehicleInfoProps {
  engine: string;
  clutch: string;
  brake: string;
  health: number;
  handleReportShow: () => void;
}

const VehicleInfo: FC<vehicleInfoProps> = ({
  engine,
  clutch,
  brake,
  health,
  handleReportShow,
}) => {
  const classes = useStyles();
  return (
    <div className="info-wrapper">
      <div className="heading">
        <img src={sensorIcon} alt="" />
        <h1>Sensor info</h1>
      </div>
      <div className="vehicle-data">
        <VehicleDetail
          title={"Engine"}
          description={engine}
          icon={engineIcon}
        />
        <VehicleDetail
          title={"Clutch"}
          description={clutch}
          icon={clutchIcon}
        />
        <VehicleDetail title={"Brake"} description={brake} icon={brakeIcon} />
      </div>

      <VehicleHealth title="Overall Health of the Vehicle" value={health} />

      <div className="proof-of-signature">
        <img src={cryptoImg} alt="" />
        <h1>Proof of Signature</h1>
        <img
          src={signatureProofCheckIcon}
          alt=""
          onClick={handleReportShow}
          className={classes.pointer}
        />
      </div>
    </div>
  );
};

export default VehicleInfo;
