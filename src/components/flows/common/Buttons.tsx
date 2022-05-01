import FlowButton from "./FlowButton";
import rejectIcon from "../../../assets/images/icons/reject.svg";
import acceptIcon from "../../../assets/images/icons/accept.svg";

export const AcceptButton = ({ onClick }) => {
  return (
    <FlowButton
      className="accept-btn"
      icon={acceptIcon}
      text="Accept"
      onClick={onClick}
    />
  );
};

export const RejectButton = ({ onClick }) => {
  return (
    <FlowButton
      className="reject-btn"
      icon={rejectIcon}
      text="Reject"
      onClick={onClick}
    />
  );
};

export const DetailsButton = ({ onClick, text }) => {
  return <FlowButton className="details-btn" text={text} onClick={onClick} />;
};
