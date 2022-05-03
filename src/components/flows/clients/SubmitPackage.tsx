import DialogLayout from "../../layouts/DialogLayout";
import FlowButton from "../common/FlowButton";
import { useStyles } from "../styles";
import "../../../assets/styles/components/flowDialog.scss";
import "../../../assets/styles/common.scss";
import calendarImg from "../../../assets/images/icons/calendar.svg";
import docImg from "../../../assets/images/icons/doc.svg";
import fromtoImg from "../../../assets/images/icons/from_to.svg";
import houseImg from "../../../assets/images/icons/houses.svg";
import processingImg from "../../../assets/images/icons/processing.svg";
import scanningImg from "../../../assets/images/icons/scanning.svg";
import packingImg from "../../../assets/images/icons/scanning.svg";
import safetyImg from "../../../assets/images/icons/safety.svg";
import loadingImg from "../../../assets/images/icons/loading.svg";
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
import SubmitPackageSuccess from "./SubmiPackageSuccess";
import BillMovementDetails from "../common/BillMovementDetails";
import { useQuery } from "urql";
import { ewayBillsQuery } from "../../../GQLQueries";
import faker from "@faker-js/faker";

const DialogTitle = ({ handleContinue, handleAddPackage }) => {
  const classes = useStyles();

  return (
    <div className={classes.submit_title_container}>
      <h1 className={classes.submit_title}>Add Package</h1>
      <FlowButton
        text="Submit"
        onClick={handleContinue}
        icon={null}
        className=""
      />
    </div>
  );
};

const SubmitPackageDialog = ({ open, handleClose, handleContinue }) => {
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
      label: "Ashglow Trucks and Logistics",
    },
    {
      value: "DTDC",
      label: "DTDC",
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

  const [successShow, setSuccessShow] = useState(false);

  const handleSuccess = () => {
    handleClose();
    setSuccessShow(!successShow);
  };
  return (
    <div>
      <SubmitPackageSuccess
        open={successShow}
        handleClose={handleSuccess}
        handleContinue={() => {
          handleClose();
          handleSuccess();
        }}
      />
      <DialogLayout
        open={open}
        handleClose={handleClose}
        handleContinue={null}
        title={
          <DialogTitle
            handleContinue={handleSuccess}
            handleAddPackage={() => handleContinue("addpackage")}
          />
        }
        showArrow={true}
      >
        <ProofDialog show={reportShow} handleShow={handleReportShow} />
        <div
          className={`${classes.dialog_content_wrapper} dialog_submit_package_container`}
        >
          <div className="upper_panel">
            <BillMovementDetails />
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
            <CargoEvidence
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
              icon={safetyImg}
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
              icon={scanningImg}
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
              icon={packingImg}
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
              icon={loadingImg}
              images={[
                faker.image.transport(),
                faker.image.transport(),
                faker.image.transport(),
                faker.image.transport(),
                faker.image.transport(),
              ]}
            />
            <div className="package_submit_btn">
              <FlowButton text={"Submit"} onClick={handleSuccess} />
            </div>
          </div>
        </div>
      </DialogLayout>
    </div>
  );
};

export default SubmitPackageDialog;
