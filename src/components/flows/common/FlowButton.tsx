import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { FC } from "react";
import "../../../assets/styles/components/buttons.scss";

const CustomButton = withStyles({
  root: {
    border: 0,
    height: 48,
    padding: "0 30px",
    backgroundColor: "rgba(1, 143, 106, 0.85)",
    borderRadius: "6px",
    fontWeight: 600,
    fontSize: "16px",
    lineHeight: "30px",
    textAlign: "center",
    color: "#E4E4E7",
    "&:hover": {
      backgroundColor: "rgba(1, 143, 106, 0.85)",
    },
  },
  label: {
    textTransform: "capitalize",
  },
})((props) => <Button {...props} />);

interface flowButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
  icon?: string;
}

const FlowButton: FC<flowButtonProps> = ({
  text,
  onClick,
  className,
  icon,
}) => {
  return (
    <CustomButton onClick={onClick} className={`${className} flow-btn`}>
      {icon && <img src={icon} alt="btn icon" className="btn-icon" />}
      {text}
    </CustomButton>
  );
};

export default FlowButton;
