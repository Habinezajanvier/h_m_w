import DialogLayout from "../../layouts/DialogLayout";
import { useStyles } from "../styles";
import "../../../assets/styles/components/serviceProvider.scss";
import VehicleInfo from "./VehicleInfo";
import PcsDetails from "./PcsDetails";
import ProofDialog from "./SignatureProof";
import { useState } from "react";
import DriverVehicleDetails from "./DriverVehicleInfo";
import LdbDetails from "./LdbDetails";
import AcmeDetails from "./AcmeDetails";
import FlowButton from "../common/FlowButton";
import vahanImg from "../../../assets/images/vahan.png";
import HeaderTitle from "./HeaderTitle";
import ConfirmVehicleDetails from "./ConfirmVehicleDetails";
import PcsDetailsForm from "./PcsDetailsForm.";
import FiosConfirmDetails from "./PcsDetailsForm.";
import ConfirmAcmeDetails from "./ConfirmAcmeDetails";
import ConfirmFiosDetails from "./FiosDetailsConfirm";

const DialogTitle = ({ handleContinue }) => {
  const classes = useStyles();

  return (
    <div className={classes.submit_title_container}>
      <img src={vahanImg} alt="" />
      <h1
        className={`${classes.submit_title} ${classes.pointer}`}
        onClick={null}
      >
        VAHAN SARATHI Info
      </h1>

      <div className="agencies-approval-tab">
        <HeaderTitle />
      </div>
    </div>
  );
};

const ServiceProviderMainDialog = ({ open, handleClose, handleContinue }) => {
  const [reportShow, setReportShow] = useState(false);

  const handleReportShow = () => {
    setReportShow(!reportShow);
  };

  return (
    <DialogLayout
      title={<DialogTitle handleContinue={undefined} />}
      open={open}
      handleClose={handleClose}
      handleContinue={handleContinue}
      showArrow
    >
      <ProofDialog show={reportShow} handleShow={handleReportShow} />
      <div className="service-provider-dialog">
        <div className="dialog-container">
          <div className="dialog-left">
            <div className="top">
              {/* <ConfirmVehicleDetails /> */}
              {/* <PcsDetailsForm />  */}
              <ConfirmFiosDetails />
              {/* <ConfirmAcmeDetails /> */}
            </div>
            <div className="bottom">
              <PcsDetails />

              {/* <DriverVehicleDetails /> */}
              {/* <LdbDetails /> */}
              {/* <AcmeDetails /> */}
            </div>
          </div>
          <div className="dialog-right">
            <VehicleInfo
              engine={
                "Accelerator pedal functions properly and shows no signs of excessive wear."
              }
              clutch={
                "Clutch pedal functions normally and shows no signs of excessive wear."
              }
              brake={
                "All brake lines show no evidence of corrosion or other types of excessive wear."
              }
              health={84}
              handleReportShow={handleReportShow}
            />
          </div>
        </div>
        <div className="service-provider-buttons-wrapper">
          <FlowButton text="Confirm" onClick={handleClose} />
        </div>
      </div>
    </DialogLayout>
  );
};

export default ServiceProviderMainDialog;
