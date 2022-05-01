import SuccessDialog from "../common/SuccessDialog";
import submissionRejectedImg from "../../../assets/images/icons/submission_rejected.svg";

const IcegateRejectionDialog = ({ open, handleClose }) => {
  return (
    <SuccessDialog
      icon={submissionRejectedImg}
      title="You’ve rejected the transportation request of MEM2345."
      handleClose={null}
      handleContinue={handleClose}
      open={open}
      children={null}
    />
  );
};

export default IcegateRejectionDialog;
