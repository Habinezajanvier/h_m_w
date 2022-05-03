import submissionSuccessImg from "../../../assets/images/icons/submission_success.svg";
import SuccessDialog from "../common/SuccessDialog";
import ProofOfSignatureDgft from "../common/ProofOfSignature";

const DgftSuccessDialog = ({ handleSuccess, showSuccessDialog }) => {
  return (
    <SuccessDialog
      icon={submissionSuccessImg}
      title="You’ve successfully submitted the details to the government. We will notify you once the verification is approved."
      handleClose={null}
      handleContinue={handleSuccess}
      open={showSuccessDialog}
    >
      <div className="dgft-success-dialog">
        <ProofOfSignatureDgft />
      </div>
    </SuccessDialog>
  );
};

export default DgftSuccessDialog;
