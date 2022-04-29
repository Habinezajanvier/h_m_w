import DialogLayout from "../../layouts/DialogLayout";
import { useStyles } from "./styles";
import FlowButton from "../common/FlowButton";
import requestEnvelopeImg from "../../../assets/images/icons/request_envelope.svg";
import clearanceCertificateImg from "../../../assets/images/icons/clearance_certificate.svg";
import cargoTruckImg from "../../../assets/images/icons/cargo_truck.svg";
import { useNavigate } from "react-router-dom";
import "../../../assets/styles/components/flowDialog.scss";

export default function SuccessDialog({ open, handleClose, handleContinue }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleGoHome = () => {
    handleClose();
    navigate("/dashboard");
  };
  return (
    <DialogLayout
      open={open}
      handleClose={handleClose}
      handleContinue={handleContinue}
      title={null}
      showArrow={false}
    >
      <div className={classes.dialog_content_wrapper}>
        <div className="success-dailog-wrapper">
          <h1>You will be notified once when your request is accepted.</h1>
          <div className="flow-steps">
            <div className="active">
              <img src={requestEnvelopeImg} alt="request envelop" />
              <h1>Request submitted to customs department</h1>
            </div>
            <div>
              <img src={clearanceCertificateImg} alt="clearance certificate" />
              <h1>Waiting for Clearance Certificate</h1>
            </div>
            <div>
              <img src={cargoTruckImg} alt="cargo truck" />
              <h1>
                Waiting for Ashglow trucks-service provider to accept request
              </h1>
            </div>
          </div>
          <div className="success-dialog-footer">
            <FlowButton text={"Go to Home"} onClick={handleGoHome} />
          </div>
        </div>
      </div>
    </DialogLayout>
  );
}
