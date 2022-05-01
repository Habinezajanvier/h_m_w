import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CryptoDetails from "./CryptoDetails";
import signatureImg from "../../../assets/images/icons/signature.svg";
import "../../../assets/styles/components/proofReport.scss";
import Signature from "./Signature";

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

const crypto_details = {
  type: "BbsBlsSignatureProof2020",
  created: "2020-04-25",
  verification_key:
    "did:ckdr:Ee3qAD5dqNbKxyYMhPXPMLzyc1zRxSS48kIKPxZ8qGMEcr+Cptba4Hdu7AfeHUPcHZzt03GzZUvGRhmBV2fTbpICQ55xgc7b/5su65SYYMXOgA7ODFz7Z6ApgAz8EQ67bQzCGEDyS6M3xaLiLjZMYC6h/WnF0vLSgIvMOnYraJHHutmG",
};

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{ m: 0, p: 2 }}
      {...other}
      className="proof-report-dialog-title"
    >
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

interface reportProps {
  show: boolean;
  handleShow: () => void;
}

const ProofDialog: React.FC<reportProps> = ({ show, handleShow }) => {
  return (
    <div>
      <BootstrapDialog
        onClose={handleShow}
        aria-labelledby="customized-dialog-title"
        open={show}
        className="proof-report-dialog-container"
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleShow}>
          <div className="report-heading">
            <img src={signatureImg} alt="signature report" />
            <h1>Proof of signatures</h1>
          </div>
        </BootstrapDialogTitle>
        <DialogContent className="proof-report-dialog">
          <div className="upper">
            <div className="top">
              <h1 className="sub-header">Original Signature</h1>
              <Signature
                signatures={[
                  {
                    signed_by: "Trevor A.",
                    signed_on: "23 March 2022",
                  },
                ]}
              />
            </div>
            <div className="bottom">
              <h1 className="sub-header">Multiple Signatures</h1>
              <div className="content-wrapper">
                <div className="content-left">
                  <Signature
                    signatures={[
                      {
                        signed_by: "Trevor A.",
                        signed_on: "23 March 2022",
                      },
                      {
                        signed_by: "Trevor A.",
                        signed_on: "23 March 2022",
                      },
                    ]}
                  />
                </div>
                <div className="content-right">
                  <Signature
                    signatures={[
                      {
                        signed_by: "Trevor A.",
                        signed_on: "23 March 2022",
                      },
                      {
                        signed_by: "Trevor A.",
                        signed_on: "23 March 2022",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="lower">
            <CryptoDetails details={crypto_details} />
          </div>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default ProofDialog;
