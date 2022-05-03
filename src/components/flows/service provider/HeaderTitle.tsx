import "../../../assets/styles/components/serviceProviderHeader.scss";
import ProviderHeaderRoutes from "./ProviderHeaderRoutes";
import truckIcon from "../../../assets/images/icons/truck_provider.svg";

const HeaderTitle = () => {
  return (
    <div className="service-provider-header">
      <div className="left-side">
        <ProviderHeaderRoutes routeIcon={truckIcon} />
      </div>
      <div className="right-side">
        <h1>Save</h1>
      </div>
    </div>
  );
};

export default HeaderTitle;
