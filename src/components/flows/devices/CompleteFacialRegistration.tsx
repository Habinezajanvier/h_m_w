import { Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import profileImg from "../../../assets/images/organisation/user-profile-img.svg";
import { FC, useState } from "react";
import FlowButton from "../common/FlowButton";

interface componentProps {
  handleShow: () => void;
  show: boolean;
  handleStep: (step: string) => void;
}

const CompleteFacialRegistration: FC<componentProps> = ({
  handleShow,
  show,
  handleStep,
}) => {
  const [isRemindLater, setIsRemindLater] = useState<boolean>(false);
  const [isAddToOrganisation, setIsAddToOrganisation] =
    useState<boolean>(false);

  const handleReminder = () => {
    setIsRemindLater(!isRemindLater);
  };
  const handleAddToOrganisation = () => {
    setIsAddToOrganisation(true);
    if (isAddToOrganisation) {
      handleShow();
      handleStep("login-form");
    }
  };

  return (
    <Dialog
      maxWidth={"lg"}
      open={show}
      className="myqrcode"
      color="primary"
      PaperProps={{
        style: {
          backgroundColor: "rgba(38, 40, 50, 1)",
          width: "563px",
          height: ((isRemindLater || isAddToOrganisation) && "auto") || "323px",
        },
      }}
      onClose={() => handleShow}
    >
      <div className="complete-profile-dialog-heading">
        <CloseIcon onClick={() => handleShow()} className="c-pointer" />
      </div>
      {(isRemindLater && (
        <div className="complete-registration-content">
          <p className="remind-p">
            Please make sure you complete your Facial and Audio Registration to
            add devices.
          </p>
        </div>
      )) || (
        <div className="complete-registration-content">
          {!isAddToOrganisation && (
            <div className="complete-registration-img">
              <img src={profileImg} alt="" />
            </div>
          )}

          {(isAddToOrganisation && (
            <p>Please register with the organisation to add the devices</p>
          )) || (
            <p>Do Facial and Audio Registration to get recognised by Chokidr</p>
          )}
          <div className="complete-profile-footer">
            {!isAddToOrganisation && (
              <h1 onClick={handleReminder}>Remind me later</h1>
            )}

            <FlowButton
              text="Register Now"
              className={`${isAddToOrganisation && "add-to-organisation-btn"}`}
              onClick={handleAddToOrganisation}
            />
          </div>
        </div>
      )}
    </Dialog>
  );
};

export default CompleteFacialRegistration;
