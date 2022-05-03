import SuccessDialog from "../common/SuccessDialog";
import submissionSuccessImg from "../../../assets/images/icons/submission_success.svg";
import ProofOfSignature from "./ProofOfSignature";

const ProviderSuccess = ({ open, handleClose, handleContinue }) => {
  return (
    <SuccessDialog
      open={open}
      handleClose={handleClose}
      handleContinue={handleContinue}
      title="You’ve successfully submitted the details to the government. We will notify you once the verification is approved."
      icon={submissionSuccessImg}
    >
      <ProofOfSignature />
    </SuccessDialog>
  );
};

export default ProviderSuccess;
