import PackageDetail from "../common/PackageDetail";
import SimpleSelectorInput from "../common/SimpleSelector";
import transporterTruckImg from "../../../assets/images/icons/transporter_truck.svg";
import vehicleInfoImg from "../../../assets/images/icons/vehicle_info.svg";
import cargoInfoImg from "../../../assets/images/icons/cargo_info.svg";
import "../../../assets/styles/components/transportDetails.scss";

const TransportationDetails = ({ transporter, vehicle, vehicle_health }) => {
  return (
    <div className="transport-details">
      <PackageDetail icon={transporterTruckImg} header={"Transporter info"}>
        <div>
          <div className="transporter_dropdown">
            <h1>
              Transporter: <span> {transporter}</span>
            </h1>
          </div>
        </div>
      </PackageDetail>
      <PackageDetail icon={vehicleInfoImg} header={"Vehicle info"}>
        <div className="content">
          <div className="transporter_dropdown">
            <h1>
              Vehicle Number: <span> {vehicle}</span>
            </h1>
          </div>
          <h1>
            Vehicle Health: <span className="green_txt">{vehicle_health}</span>
          </h1>
        </div>
      </PackageDetail>
      <PackageDetail icon={cargoInfoImg} header={"Cargo info"}>
        <div className="content">
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
  );
};

export default TransportationDetails;
