import DialogLayout from "../../layouts/DialogLayout";
import { useStyles } from "../styles";
import DetailsReviewCard from "./DetailsReviewCard";
import truckIcon from "../../../assets/images/icons/truck_provider.svg";
import "../../../assets/styles/components/providerDetailsReview.scss";
import ButtonsWrapper from "../common/ButtonsWrapper";
import FlowButton from "../common/FlowButton";
import ProviderSuccess from "./ProviderSuccess";
import { useState } from "react";

const DialogTitle = () => {
  const classes = useStyles();

  return (
    <div className={classes.submit_title_container}>
      <h1 className={`${classes.submit_title} ${classes.pointer}`}>
        Review Details
      </h1>
    </div>
  );
};

const ProviderDetailsReview = ({ open, handleClose, handleContinue }) => {
  const handleClick = () => {
    handleClose();
  };

  const [successShow, setSuccessShow] = useState(false);

  const handleSuccessShow = () => {
    handleClose();
    setSuccessShow(!successShow);
  };

  return (
    <div>
      <ProviderSuccess
        open={successShow}
        handleClose={handleSuccessShow}
        handleContinue={handleSuccessShow}
      />
      <DialogLayout
        title={<DialogTitle />}
        open={open}
        handleClose={handleClose}
        handleContinue={handleContinue}
        showArrow
      >
        <div className="provider-details-container">
          <div className="provider-details-review-wrapper">
            <DetailsReviewCard
              transportMode={"truck"}
              transportIcon={truckIcon}
              routeName="Route A"
            />
            <DetailsReviewCard
              transportMode={"truck"}
              transportIcon={truckIcon}
              routeName="Route A"
            />
            <DetailsReviewCard
              transportMode={"airplane"}
              transportIcon={truckIcon}
              routeName="Route A"
            />
            <DetailsReviewCard
              transportMode={"truck"}
              transportIcon={truckIcon}
              routeName="Route A"
            />
            <DetailsReviewCard
              transportMode={"fleet"}
              transportIcon={truckIcon}
              routeName="Route A"
            />
          </div>
          <div className="action-button">
            <FlowButton text="Submit" onClick={handleSuccessShow} />
          </div>
        </div>
      </DialogLayout>
    </div>
  );
};

export default ProviderDetailsReview;
