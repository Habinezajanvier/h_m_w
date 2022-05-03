import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import "./index.scss";

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
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function DocsDialog() {
  return (
    <div>
      <BootstrapDialog
        onClose={null}
        aria-labelledby="customized-dialog-title"
        open={false}
        className="documents-dialog"
      >
        <div style={{ width: "754px", height: "" }}>
          <BootstrapDialogTitle id="customized-dialog-title" onClose={null}>
            Documents
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <div className="tabs-panel">
              <h1>Documents</h1>
              <h1>Shared with me</h1>
            </div>
            <div className="content-container">CONTENT HERE</div>
          </DialogContent>
        </div>
      </BootstrapDialog>
    </div>
  );
}
