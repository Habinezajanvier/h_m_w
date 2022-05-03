import DialogLayout from "../../layouts/DialogLayout";
import { useStyles } from "../styles";
import "../../../assets/styles/components/flowDialog.scss";
import "../../../assets/styles/common.scss";
import docImg from "../../../assets/images/icons/doc.svg";
import calendarImg from "../../../assets/images/icons/calendar.svg";
import fromtoImg from "../../../assets/images/icons/from_to.svg";
import houseImg from "../../../assets/images/icons/houses.svg";
import processingImg from "../../../assets/images/icons/processing.svg";
import documentsImg from "../../../assets/images/icons/documents.svg";
import reportImg from "../../../assets/images/icons/report.svg";
import locationImg from "../../../assets/images/icons/location_marker.svg";
import formImg from "../../../assets/images/icons/form.svg";
import performaInvoiceImg from "../../../assets/images/icons/performa_invoice.svg";
import transporterTruckImg from "../../../assets/images/icons/transporter_truck.svg";
import vehicleInfoImg from "../../../assets/images/icons/vehicle_info.svg";
import cargoInfoImg from "../../../assets/images/icons/cargo_info.svg";
import "../../../assets/styles/components/flowDialog.scss";
import CargoEvidence from "../common/CargoEvidence";
import DocPanel from "../common/DocPanel";
import PackageDetail from "../common/PackageDetail";
import SimpleSelectorInput from "../common/SimpleSelector";
import ProofDialog from "../common/ProofReport";
import { useState } from "react";
import { AcceptButton, RejectButton } from "../common/Buttons";

import icegateImg from "../../../assets/images/icegate.png";
import pcsImg from "../../../assets/images/pcs.png";
import acmeImg from "../../../assets/images/acme.png";
import foisImg from "../../../assets/images/fois.png";
import vahanImg from "../../../assets/images/vahan.png";
import AgencyConfirmStatus from "../common/AgencyConfirmStatus";
import DgftSuccessDialog from "./DgftSuccessDialog";
import DgftRejectionDialog from "./DgftRejectionDialog";
import DgftRejectionReasonDialog from "./RejectionReasonDialog";
import evidenceImg from "../../../assets/images/evidence/evidence.png";
import faker from "@faker-js/faker";

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
          name="DGFT"
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
const DgftAgencyDialog = ({ open, handleClose, handleContinue }) => {
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
      <DgftSuccessDialog
        handleSuccess={handleSuccess}
        showSuccessDialog={showSuccessDialog}
      />
      <DgftRejectionReasonDialog
        handleClose={handleRejectReason}
        handleContinue={handleReject}
        open={showReasontDialog && !showRejectDialog}
      />
      <DgftRejectionDialog open={showRejectDialog} handleClose={handleReject} />
      <DgftSuccessDialog
        handleSuccess={handleSuccess}
        showSuccessDialog={showSuccessDialog}
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
              <PackageDetail icon={vehicleInfoImg} header={"Vehicle info"}>
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
              </PackageDetail>
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
            </div>
            <div className="child">
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
                    </div>
                    <div className="left_side">
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
          </div>
          <div className="lower_panel">
            <h1>Evidences of Cargo</h1>
            {/* <CargoEvidence
              title="Processing"
              icon={processingImg}
              images={[
                faker.image.transport(),
                faker.image.transport(),
                faker.image.transport(),
                faker.image.transport(),
                faker.image.transport(),
              ]}
            />
            <CargoEvidence
              title="Safety"
              icon={processingImg}
              images={[
                faker.image.transport(),
                faker.image.transport(),
                faker.image.transport(),
                faker.image.transport(),
                faker.image.transport(),
              ]}
            />
            <CargoEvidence
              title="Scanning"
              icon={processingImg}
              images={[
                faker.image.transport(),
                faker.image.transport(),
                faker.image.transport(),
                faker.image.transport(),
                faker.image.transport(),
              ]}
            />
            <CargoEvidence
              title="Packing"
              icon={processingImg}
              images={[
                faker.image.transport(),
                faker.image.transport(),
                faker.image.transport(),
                faker.image.transport(),
                faker.image.transport(),
              ]}
            />
            <CargoEvidence
              title="Loading"
              icon={processingImg}
              images={[
                faker.image.transport(),
                faker.image.transport(),
                faker.image.transport(),
                faker.image.transport(),
                faker.image.transport(),
              ]}
            /> */}
            <img style={{ maxWidth: "700px" }} src={evidenceImg} />
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

export default DgftAgencyDialog;
