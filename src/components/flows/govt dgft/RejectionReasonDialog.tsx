import DialogLayout from "../../layouts/DialogLayout";
import FlowButton from "../common/FlowButton";
import { useStyles } from "../styles";
import "../../../assets/styles/components/flowDialog.scss";
import "../../../assets/styles/common.scss";
import "../../../assets/styles/components/flowDialog.scss";
import "../../../assets/styles/components/agencyFlows.scss";
import { useState } from "react";
import SuccessDialog from "../common/SuccessDialog";
import submissionRejectedImg from "../../../assets/images/icons/submission_rejected.svg";
import AgencyConfirmStatus from "../common/AgencyConfirmStatus";
import icegateImg from "../../../assets/images/icegate.png";
import pcsImg from "../../../assets/images/pcs.png";
import acmeImg from "../../../assets/images/acme.png";
import foisImg from "../../../assets/images/fois.png";
import vahanImg from "../../../assets/images/vahan.png";
import RejectionReasonForm from "../common/RejectionReasonForm";

const DialogTitle = ({ handleContinue }) => {
  const classes = useStyles();

  return (
    <div className={classes.submit_title_container}>
      <h1
        className={`${classes.submit_title} ${classes.pointer}`}
        onClick={null}
      >
        IEC 89765 45678 transporation request
      </h1>
      <div className="agencies-approval-tab">
        <AgencyConfirmStatus
          icon={icegateImg}
          className="icegate_color"
          status=""
          name="ICEGATE"
        />
        <div className="agencies-divider">
          <div className="dashed-divider"></div>
        </div>
        <AgencyConfirmStatus
          icon={acmeImg}
          className="acme_color"
          status="has verified request"
          name="ACME"
        />
        <div className="agencies-divider">
          <div className="dashed-divider"></div>
        </div>
        <AgencyConfirmStatus
          icon={pcsImg}
          className="pcs_color"
          status="Waiing to verify"
          name="PCS"
        />
        <div className="agencies-divider">
          <div className="dashed-divider"></div>
        </div>
        <AgencyConfirmStatus
          icon={foisImg}
          className="fois_color"
          status="has verified request"
          name="FOIS"
        />
        <div className="agencies-divider">
          <div className="dashed-divider"></div>
        </div>
        <AgencyConfirmStatus
          icon={vahanImg}
          className="vahan_color"
          status="has verified request"
          name="VAHAN"
        />
      </div>
    </div>
  );
};

const DgftRejectionReasonDialog = ({ open, handleClose, handleContinue }) => {
  const classes = useStyles();
  return (
    <div>
      <SuccessDialog
        icon={submissionRejectedImg}
        title="You’ve rejected the transportation request of MEM2345."
        handleClose={null}
        handleContinue={handleClose}
        open={open}
      >
        <div className="dgft-success-dialog"></div>
      </SuccessDialog>
      <DialogLayout
        open={open}
        handleClose={handleClose}
        handleContinue={null}
        title={<DialogTitle handleContinue={handleContinue} />}
        showArrow={true}
      >
        <div
          className={`${classes.dialog_content_wrapper} icegate_rejection_reason_container`}
        >
          <RejectionReasonForm />
          <div className="package-agency-action-btns">
            <FlowButton text="Submit" onClick={handleContinue} />
          </div>
        </div>
      </DialogLayout>
    </div>
  );
};

export default DgftRejectionReasonDialog;
