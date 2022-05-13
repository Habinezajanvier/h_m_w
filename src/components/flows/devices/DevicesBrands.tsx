import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import { Container } from "@mui/material";
import { useStyles } from ".";
import closeImg from "../../../assets/images/icons/close.svg";
import brandImg from "../../../assets/images/devices/brand.jpg";
import DeviceBrand from "./DeviceBrand";

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

      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 24,
          top: 10,
          color: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <img src={closeImg} alt="dialog close icon" />
      </IconButton>
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

interface devicesProps {
  open: boolean;
  handleClose: () => void;
  handleContinue: () => void;
}

const DevicesBrandsDialog: React.FC<devicesProps> = ({
  open,
  handleClose,
  handleContinue,
}) => {
  const classes = useStyles();

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
            width: "375px",
            height: "344px",
            background: "#262832",
            padding: "10px",
          }}
        >
          <h1 className={classes.brands_text}>Choose your device brand</h1>
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
            children={null}
          />

          <DialogContent className={classes.brands_container}>
            {[1, 2, 3, 4, 5, 6, 7].map(() => {
              return <DeviceBrand deviceImg={brandImg} deviceName="Axis" />;
            })}
          </DialogContent>
        </Container>
      </BootstrapDialog>
    </div>
  );
};

export default DevicesBrandsDialog;
