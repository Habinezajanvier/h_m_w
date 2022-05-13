import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Container } from "@mui/material";
import { useStyles } from ".";
import FlowButton from "../common/FlowButton";
import closeImg from "../../../assets/images/icons/close.svg";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/modules/auth/authSlice";
import { useDispatch } from "react-redux";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 24,
            top: 24,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <img src={closeImg} alt="dialog close icon" />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const LogoutDialog = ({ open, handleClose }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <BootstrapDialog
        onClose={(_, reason) => {
          if (reason !== "backdropClick") {
            handleClose();
          }
        }}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <Container
          sx={{
            width: "428px",
            height: "232px",
            background: "#262832",
          }}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
            children={null}
          />

          <DialogContent className={classes.logout_container}>
            <h1 className={classes.text}>
              Are you sure that you want to log out?
            </h1>
            <FlowButton
              text="Logout"
              className={classes.logout_btn}
              onClick={handleLogout}
            />
          </DialogContent>
        </Container>
      </BootstrapDialog>
    </div>
  );
};

export default LogoutDialog;
