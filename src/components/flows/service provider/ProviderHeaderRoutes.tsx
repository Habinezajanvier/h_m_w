import routePointIcon from "../../../assets/images/icons/route_point.svg";
import "../../../assets/styles/components/providerHeaderRoutes.scss";

const ProviderHeaderRoutes = ({ routeIcon }) => {
  return (
    <div className="provider-header-routes-container">
      <div className="upper">
        <div className="child top">
          <div className="point"></div>
          <span>From:</span>
          <h1>Mangalore port</h1>
        </div>
        <div className="child dots"></div>
        <div className="child route">
          <img src={routeIcon} alt="" />
          <h1>Route C</h1>
        </div>
        <div className="child dots"></div>
        <div className="child top">
          <div className="point"></div>
          <span>To:</span>
          <h1>Karwar Railway Station</h1>
        </div>
      </div>
    </div>
  );
};

export default ProviderHeaderRoutes;
