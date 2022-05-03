import DialogLayout from "../../layouts/DialogLayout";
import FlowButton from "../common/FlowButton";
import { useStyles } from "../styles";
import "../../../assets/styles/components/flowDialog.scss";
import "../../../assets/styles/common.scss";
import docImg from "../../../assets/images/icons/doc.svg";
import calendarImg from "../../../assets/images/icons/calendar.svg";
import fromtoImg from "../../../assets/images/icons/from_to.svg";
import houseImg from "../../../assets/images/icons/houses.svg";
import documentsImg from "../../../assets/images/icons/documents.svg";
import reportImg from "../../../assets/images/icons/report.svg";
import locationImg from "../../../assets/images/icons/location_marker.svg";
import formImg from "../../../assets/images/icons/form.svg";
import performaInvoiceImg from "../../../assets/images/icons/performa_invoice.svg";
import transporterTruckImg from "../../../assets/images/icons/transporter_truck.svg";
import vehicleInfoImg from "../../../assets/images/icons/vehicle_info.svg";
import cargoInfoImg from "../../../assets/images/icons/cargo_info.svg";
import "../../../assets/styles/components/flowDialog.scss";
import "../../../assets/styles/components/agencyFlows.scss";
import CargoEvidence from "../common/CargoEvidence";
import DocPanel from "../common/DocPanel";
import PackageDetail from "../common/PackageDetail";
import SimpleSelectorInput from "../common/SimpleSelector";
import ProofDialog from "../common/ProofReport";
import { useState } from "react";
import { AcceptButton, RejectButton } from "../common/Buttons";
import SuccessDialog from "../common/SuccessDialog";
import submissionSuccessImg from "../../../assets/images/icons/submission_success.svg";
import processingImg from "../../../assets/images/icons/processing.svg";
import scanningImg from "../../../assets/images/icons/scanning.svg";
import packingImg from "../../../assets/images/icons/packing.svg";
import safetyImg from "../../../assets/images/icons/safety.svg";
import importExportImg from "../../../assets/images/icons/import_export.svg";
import loadingImg from "../../../assets/images/icons/loading.svg";
import AgencyConfirmStatus from "../common/AgencyConfirmStatus";
import icegateImg from "../../../assets/images/icegate.png";
import pcsImg from "../../../assets/images/pcs.png";
import acmeImg from "../../../assets/images/acme.png";
import foisImg from "../../../assets/images/fois.png";
import vahanImg from "../../../assets/images/vahan.png";
import InfoCard from "./InfoCard";
import ProofOfSignatureIcegate from "./ProofOfSignature";
import IcegateRejectionReasonDialog from "./RejectionReasonDialog";
import IcegateSuccessDialog from "./IcegateSuccessDialog";
import IcegateRejectionDialog from "./IcegateRejecionDialog";
import processingImage from "../../../assets/images/evidence/processing.svg";
import loadingImage from "../../../assets/images/evidence/loading.svg";
import packingImage from "../../../assets/images/evidence/packing.svg";
import scanningImage from "../../../assets/images/evidence/scanning.svg";
import safetyImage from "../../../assets/images/evidence/safety.svg";
import planeImage from "../../../assets/images/import-export/plane.svg";
import ship1Image from "../../../assets/images/import-export/ship1.svg";
import ship2Image from "../../../assets/images/import-export/ship2.svg";
import evidenceImg from "../../../assets/images/evidence/evidence.png";

const DialogTitle = ({ handleContinue }) => {
  const classes = useStyles();

  return (
    <div className={classes.submit_title_container}>
      <h1
        className={`${classes.submit_title} ${classes.pointer}`}
        onClick={null}
      >
        IEC 89765 45678 transporation request
      </h1>
      <div className="agencies-approval-tab">
        <AgencyConfirmStatus
          icon={icegateImg}
          className="icegate_color"
          status=""
          name="ICEGATE"
        />
        <div className="agencies-divider">
          <div className="dashed-divider"></div>
        </div>
        <AgencyConfirmStatus
          icon={acmeImg}
          className="acme_color"
          status="has verified request"
          name="ACME"
        />
        <div className="agencies-divider">
          <div className="dashed-divider"></div>
        </div>
        <AgencyConfirmStatus
          icon={pcsImg}
          className="pcs_color"
          status="Waiing to verify"
          name="PCS"
        />
        <div className="agencies-divider">
          <div className="dashed-divider"></div>
        </div>
        <AgencyConfirmStatus
          icon={foisImg}
          className="fois_color"
          status="has verified request"
          name="FOIS"
        />
        <div className="agencies-divider">
          <div className="dashed-divider"></div>
        </div>
        <AgencyConfirmStatus
          icon={vahanImg}
          className="vahan_color"
          status="has verified request"
          name="VAHAN"
        />
      </div>
    </div>
  );
};
const IcegateAgencyDialog = ({ open, handleClose, handleContinue }) => {
  const classes = useStyles();

  const vehicles = [
    {
      value: "666AA6-09",
      label: "666AA6-09",
    },
    {
      value: "874AA6-73",
      label: "729AA6-92",
    },
    {
      value: "820AA6-27",
      label: "640AA6-89",
    },
    {
      value: "840AA6-64",
      label: "749AA6-02",
    },
    {
      value: "082AA9-00",
      label: "937AA1-63",
    },
  ];

  const transporters = [
    {
      value: "Ashglow Trucks and Logistics",
      label: "",
    },
    {
      value: "DTDC",
      label: "",
    },
    {
      value: "Speed Delivery ",
      label: "Speed Delivery ",
    },
    {
      value: "Big trucks ",
      label: "Big trucks ",
    },
    {
      value: "Truckz India",
      label: "Truckz India",
    },
    {
      value: "Express",
      label: "Express",
    },
  ];

  const import_export = [
    {
      name: "Import general Manifest no:",
      value: "3456782",
    },

    {
      name: "Voyage Number:",
      value: " V.284",
    },

    {
      name: "Port Code:",
      value: " INPAV1",
    },

    {
      name: "Expected Date and Time of Arrival:",
      value: " 08 April, 2022 | 06:32 AM",
    },
  ];

  const import_export1 = [
    {
      name: "Import general Manifest no:",
      value: "XXXX",
    },
    {
      name: "Import general Manifest no:",
      value: "3456782",
    },
    {
      name: "Gross weight:",
      value: "4 Gallons",
    },
    {
      name: "Expected Date and Time of Arrival:",
      value: "24 March, 2022 | 06:32 AM",
    },
  ];

  const [reportShow, setReportShow] = useState(false);

  const handleReportShow = () => {
    setReportShow(!reportShow);
  };

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showReasontDialog, setShowReasonDialog] = useState(false);

  const handleSuccess = () => {
    handleClose();
    setShowSuccessDialog(!showSuccessDialog);
  };

  const handleRejectReason = () => {
    handleClose();
    setShowReasonDialog(!showRejectDialog);
  };

  const handleReject = () => {
    handleClose();
    setShowReasonDialog(!showRejectDialog);
    setShowRejectDialog(!showRejectDialog);
  };

  return (
    <div>
      <IcegateSuccessDialog
        handleSuccess={handleSuccess}
        showSuccessDialog={showSuccessDialog}
      />
      <IcegateRejectionReasonDialog
        handleClose={handleRejectReason}
        handleContinue={handleReject}
        open={showReasontDialog && !showRejectDialog}
      />
      <IcegateRejectionDialog
        open={showRejectDialog}
        handleClose={handleReject}
      />
      <DialogLayout
        open={open}
        handleClose={handleClose}
        handleContinue={null}
        title={<DialogTitle handleContinue={handleContinue} />}
        showArrow={true}
      >
        <ProofDialog show={reportShow} handleShow={handleReportShow} />
        <div
          className={`${classes.dialog_content_wrapper} dialog_submit_package_container`}
        >
          <div className="upper_panel">
            <div className="child">
              <div className="child_header">
                <img src={docImg} alt="doc icon" />
                <h1>E-Way Bill Number - 8976 4567 3456</h1>
              </div>
              <div className="destination_container">
                <div className="destination">
                  <div className="from_to">
                    <span>From</span>
                    <span>To</span>
                  </div>
                  <div className="location_img_container">
                    <img src={fromtoImg} alt="location img" />
                  </div>
                  <div className="location_name">
                    <h1>Kerwan Refinery Center, Iran</h1>
                    <h1>Dehli Petrocheimcals ltd, Delhi</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="child">
              <div className="child_header">
                <img src={calendarImg} alt="calendar icon" />
                <h1>Valid Date</h1>
              </div>
              <div className="destination_container">
                <div className="destination">
                  <div className="from_to">
                    <span>From</span>
                    <span>To</span>
                  </div>
                  <div className="location_name">
                    <h1>22nd March 2022 09:18 PM</h1>
                    <h1>23rd April 2022</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="child">
              <div className="child_header">
                <img src={houseImg} alt="house icon" />
                <h1>Generated by</h1>
              </div>
              <div className="destination_container">
                <div className="destination">
                  <div className="from_to">
                    <span>From</span>
                    <span>To</span>
                  </div>
                  <div className="location_name">
                    <h1>Ram Enterprises</h1>
                    <h1>234516</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="middle_panel">
            <div className="child left">
              <PackageDetail
                icon={transporterTruckImg}
                header={"Transporter info"}
              >
                <div>
                  <div className="transporter_dropdown">
                    <h1>Transporter:</h1>
                    <SimpleSelectorInput
                      options={transporters}
                      label={null}
                      className="transporter_select"
                    />
                  </div>
                </div>
              </PackageDetail>
              {/* <PackageDetail icon={vehicleInfoImg} header={"Vehicle info"}>
                <div>
                  <div className="transporter_dropdown">
                    <h1>Vehicle Number:</h1>

                    <SimpleSelectorInput
                      options={vehicles}
                      label={null}
                      className="vehicle_number_select"
                    />
                  </div>
                  <h1>
                    Vehicle Health: <span className="green_txt">90%</span>
                  </h1>
                </div>
              </PackageDetail> */}
              <PackageDetail icon={cargoInfoImg} header={"Cargo info"}>
                <div>
                  <h1>
                    Category of cargo: <span>Chemical Materials</span>
                  </h1>
                  <h1>
                    Total Weight of cargo: <span>4 Gallons</span>
                  </h1>
                  <h1>
                    Contents of cargo: <span>Petroleum Product</span>
                  </h1>
                </div>
              </PackageDetail>

              <div className="child_header">
                <img src={documentsImg} alt="documents icon" />
                <div className="content">
                  <h1>Generated Documents</h1>
                  <div className="child_content">
                    <div className="left_side">
                      <DocPanel
                        text={"Quality Check Report"}
                        icon={reportImg}
                        onClick={handleReportShow}
                      />
                      <DocPanel
                        text={"Certificate of origin"}
                        icon={locationImg}
                        onClick={handleReportShow}
                      />
                      <DocPanel
                        text={"Proforma Invoice"}
                        icon={performaInvoiceImg}
                        onClick={handleReportShow}
                      />
                      <DocPanel
                        text={"Declaration Form"}
                        icon={formImg}
                        onClick={handleReportShow}
                      />
                      <DocPanel
                        text={"Bill of lading"}
                        icon={formImg}
                        onClick={handleReportShow}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="child">
              <div className="lower_panel icegate-cargo-evidence-wrapper">
                <h1>Evidences of Cargo</h1>
                <div className="cargo-evidence">
                  <img src={evidenceImg} style={{ maxWidth: "700px" }} />
                  {/* <CargoEvidence
                    title="Processing"
                    icon={processingImg}
                    images={[processingImage]}
                  />
                  <CargoEvidence
                    title="Safety"
                    icon={safetyImg}
                    images={[safetyImage]}
                  />
                  <CargoEvidence
                    title="Scanning"
                    icon={scanningImg}
                    images={[scanningImage]}
                  />
                  <CargoEvidence
                    title="Packing"
                    icon={packingImg}
                    images={[packingImage]}
                  />
                  <CargoEvidence
                    title="Loading"
                    icon={loadingImg}
                    images={[loadingImage]}
                  /> */}
                </div>
              </div>
            </div>
          </div>

          <div className="low-panel">
            <div className="left-side">
              <InfoCard
                data={import_export}
                title="Export Import info"
                icon={importExportImg}
              />
            </div>
            <div className="right-side">
              <InfoCard
                data={import_export}
                title="Export Import info"
                icon={importExportImg}
              />
              <div className="videos-wrapper">
                <div className="videos-container">
                  <h1>Videos</h1>
                  <div className="videos-wrapper">
                    <img src={ship1Image} alt="package" />
                    <img src={ship2Image} alt="package" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="low-panel">
            <div className="left-side">
              <InfoCard
                data={import_export1}
                title="Export Import info"
                icon={importExportImg}
              />
            </div>
            <div className="right-side">
              {" "}
              <InfoCard
                data={import_export}
                title="Export Import info"
                icon={importExportImg}
              />
              <div className="videos-wrapper">
                <div className="videos-container">
                  <h1>Images</h1>
                  <div className="videos-wrapper">
                    <img src={planeImage} alt="package" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="package-agency-action-btns">
            <AcceptButton onClick={handleSuccess} />
            <RejectButton onClick={handleRejectReason} />
          </div>
        </div>
      </DialogLayout>
    </div>
  );
};

export default IcegateAgencyDialog;
