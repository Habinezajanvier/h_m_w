import { FC, useState } from "react";
import DialogLayout from "../../layouts/DialogLayout";
import BillMovementDetails from "../common/BillMovementDetails";
import { useStyles } from "../styles";
import "../../../assets/styles/components/packageDetails.scss";
import TransportationDetails from "../common/TransportationDetails";
import PackageDetailsDocuments from "../common/PackageDetailsDocuments";
import FlowButton from "../common/FlowButton";
import ProofDialog from "../common/ProofReport";

interface detailsProps {
  open: boolean;
  handleContinue: () => void;
  handleClose: () => void;
}

const PackageDetailsDialog: FC<detailsProps> = ({
  open,
  handleContinue,
  handleClose,
}) => {
  const classes = useStyles();

  const [reportShow, setReportShow] = useState(false);

  const handleReportShow = () => {
    setReportShow(!reportShow);
  };

  const [successShow, setSuccessShow] = useState(false);

  const handleSuccess = () => {
    setSuccessShow(!successShow);
  };

  return (
    <div>
      <ProofDialog show={reportShow} handleShow={handleReportShow} />

      <DialogLayout
        title={
          <div className={classes.submit_title_container}>
            <h1 className={classes.submit_title}>
              FL5096 With PK3456 Documents
            </h1>
          </div>
        }
        showArrow
        open={open}
        handleClose={handleClose}
        handleContinue={handleContinue}
      >
        <div className="package-details-dialog">
          <BillMovementDetails />
          <TransportationDetails
            vehicle={"666AA6-09"}
            vehicle_health="95%"
            transporter={"DTDC"}
          />
          <PackageDetailsDocuments onClick={handleReportShow} />

          <div className="button-wrapper">
            <FlowButton text="Go to Home" onClick={handleContinue} />
          </div>
        </div>
      </DialogLayout>
    </div>
  );
};

export default PackageDetailsDialog;
