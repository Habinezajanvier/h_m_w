import DialogLayout from "../../layouts/DialogLayout";
import { useStyles } from "../styles";
import FlowButton from "./FlowButton";
import requestEnvelopeImg from "../../../assets/images/icons/request_envelope.svg";
import clearanceCertificateImg from "../../../assets/images/icons/clearance_certificate.svg";
import cargoTruckImg from "../../../assets/images/icons/cargo_truck.svg";
import { useNavigate } from "react-router-dom";
import "../../../assets/styles/components/flowDialog.scss";
import { FC, ReactChild, ReactChildren } from "react";

interface successDialogProps {
  open: boolean;
  handleClose: () => void;
  handleContinue: (dialog: string) => void;
  icon?: string;
  title: string;
  children?: ReactChild | ReactChildren;
}

const SuccessDialog = ({
  open,
  handleClose,
  handleContinue,
  icon,
  title,
  children,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleGoHome = () => {
    // handleClose();
    handleContinue("dgftagency");
    // navigate("/dashboard");
  };

  return (
    <DialogLayout
      open={open}
      handleClose={handleClose}
      handleContinue={handleContinue}
      showArrow={false}
      title={null}
    >
      <div className={`${classes.dialog_content_wrapper} success-wrapper`}>
        <div className="success-dialog-wrapper">
          {icon && (
            <img src={icon} alt="success icon" className="header-image" />
          )}
          <h1 className="header-name">{title}</h1>
          <div> {children}</div>

          <div className="success-dialog-footer">
            <FlowButton
              text={"Go to Home"}
              onClick={() => handleContinue("dgftagency")}
            />
          </div>
        </div>
      </div>
    </DialogLayout>
  );
};

export default SuccessDialog;
