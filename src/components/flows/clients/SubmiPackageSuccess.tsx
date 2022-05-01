import SuccessDialog from "../common/SuccessDialog";
import submissionSuccessImg from "../../../assets/images/icons/submission_success.svg";
import requestEnvelopeImg from "../../../assets/images/icons/request_envelope.svg";
import clearanceCertificateImg from "../../../assets/images/icons/clearance_certificate.svg";
import cargoTruckImg from "../../../assets/images/icons/cargo_truck.svg";
import "../../../assets/styles/components/flowDialog.scss";

const SubmitPackageSuccess = ({ handleClose, handleContinue, open }) => {
  return (
    <SuccessDialog
      title="You will be notified once when your request is accepted."
      icon={submissionSuccessImg}
      handleClose={handleClose}
      handleContinue={handleContinue}
      open={open}
    >
      <div className="success-dailog-wrapper">
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
      </div>
    </SuccessDialog>
  );
};

export default SubmitPackageSuccess;
