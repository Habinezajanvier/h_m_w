import DocPanel from "./DocPanel";
import documentsImg from "../../../assets/images/icons/documents.svg";
import reportImg from "../../../assets/images/icons/report.svg";
import truckImg from "../../../assets/images/icons/truck_doc.svg";
import viewImg from "../../../assets/images/icons/view.svg";
import "../../../assets/styles/components/packageDetailsDocuments.scss";

const PackageDetailsDocuments = ({ onClick }) => {
  return (
    <div className="package_documents">
      <img src={documentsImg} alt="documents icon" />
      <div className="content">
        <h1>Generated Documents</h1>
        <div className="child_content">
          <div className="left_side">
            <DocPanel
              text={
                <h1>
                  Clearance Certificate &nbsp; &nbsp;
                  <span className="gray-txt italic-txt">New</span>
                </h1>
              }
              icon={reportImg}
              onClick={onClick}
              actionIcon={viewImg}
            />
            <DocPanel
              text={"Quality Check Report"}
              icon={reportImg}
              onClick={onClick}
              actionIcon={viewImg}
            />
            <DocPanel
              text={"Certificate of origin"}
              icon={truckImg}
              onClick={onClick}
              actionIcon={viewImg}
            />
            <DocPanel
              text={"Proforma Invoice"}
              icon={truckImg}
              onClick={onClick}
              actionIcon={viewImg}
            />
            <DocPanel
              text={"Declaration form"}
              icon={truckImg}
              onClick={onClick}
              actionIcon={viewImg}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailsDocuments;
