import "../../../assets/styles/components/packageDetail.scss";

const PackageDetail = ({ icon, header, children }) => {
  return (
    <div className="package_detail">
      <div className="image_container">
        <img src={icon} alt="detail icon" />
      </div>

      <div className="content">
        <div className="content_header">
          <h1>{header}</h1>
        </div>
        {children}
      </div>
    </div>
  );
};

export default PackageDetail;
