import QuickStart from "./QuickStart";
import BillDetails from "./BillDetails";
import DialogLayout from "../../layouts/DialogLayout";
import { useStyles } from "./styles";
import "../../../assets/styles/components/flowDialog.scss";

export default function AddPackageDialog({
  open,
  handleClose,
  handleContinue,
}) {
  const classes = useStyles();
  return (
    <DialogLayout
      open={open}
      handleClose={handleClose}
      handleContinue={handleContinue}
      title={
        <h1 className={`${classes.dialog_title} ${classes.pointer}`}>
          Add Package
        </h1>
      }
      showArrow={true}
    >
      <div className={classes.dialog_content_wrapper}>
        <div className="dialog-content-container">
          <div className="left-side">
            <BillDetails />
          </div>
          <div className="right-side">
            <QuickStart />
          </div>
        </div>
      </div>
    </DialogLayout>
  );
}
