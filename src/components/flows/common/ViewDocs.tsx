import infoImg from "../../../assets/images/icons/info_orange.svg";
import "../../../assets/styles/components/viewDocs.scss";
import { DetailsButton } from "./Buttons";

export const ViewDocsDgft = ({ onClick }) => {
  return (
    <div className="view-docs">
      <img src={infoImg} alt="info icon" />
      <div>
        <p>
          <span>MEM2345</span> has requested package for transport, verify and
          approve the clearance certificate.
        </p>
        <DetailsButton text={"View details"} onClick={onClick} />
      </div>
    </div>
  );
};

export const ViewDocsIcegate = ({ onClick }) => {
  return (
    <div className="view-docs">
      <img src={infoImg} alt="info icon" />
      <div>
        <p>
          <span>MEM2345</span> has requested package for transport, verify and
          approve the clearance certificate.
        </p>
        <DetailsButton text={"View details"} onClick={onClick} />
      </div>
    </div>
  );
};
