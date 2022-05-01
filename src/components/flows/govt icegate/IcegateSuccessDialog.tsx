import SuccessDialog from "../common/SuccessDialog";
import submissionSuccessImg from "../../../assets/images/icons/submission_success.svg";
import ProofOfSignatureIcegate from "./ProofOfSignature";

const IcegateSuccessDialog = ({ handleSuccess, showSuccessDialog }) => {
  return (
    <SuccessDialog
      icon={submissionSuccessImg}
      title="You’ve successfully submitted the details to DFGT and Ashglow logistics. "
      handleClose={null}
      handleContinue={handleSuccess}
      open={showSuccessDialog}
    >
      <div className="">
        <ProofOfSignatureIcegate />
      </div>
    </SuccessDialog>
  );
};

export default IcegateSuccessDialog;
