import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import arrowBackImg from "../../assets/images/icons/arrow_back.svg";
import React from "react";
import closeImg from "../../assets/images/icons/close.svg";
import { useStyles } from "./style";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
  className: any;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
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
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <img src={closeImg} alt="dialog close icon" />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function DialogLayout({
  open,
  handleClose,
  children,
  handleContinue,
  title,
  showArrow,
}) {
  const classes = useStyles();
  return (
    <div>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
        scroll="body"
        maxWidth="xl"
        onClose={(_, reason) => {
          reason !== "backdropClick" && handleClose("");
        }}
      >
        <div className="add-package-dialog">
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
            className={classes.dialog_title_container}
          >
            <div onClick={handleContinue} className={classes.title_container}>
              {showArrow && <img src={arrowBackImg} alt="" />}
              {title}
            </div>
          </BootstrapDialogTitle>
          {children}
        </div>
      </BootstrapDialog>
    </div>
  );
}
