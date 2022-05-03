const DocsNotification = ({ onClick, title, icon }) => {
  return (
    <div className="activity-item" title={title}>
      <div className="activity-label">
        <div className="activity-title">
          <img src={icon} alt="red location" className="c-pointer" />
          <p>
            <span className="c-pointer">PK5096 </span>
            Details has been submitted to
            <br />
            Ashglow Trucks
          </p>
        </div>
        <div className="activity-time c-pointer">2 mins ago</div>
      </div>
      <div className="activity-info">
        <div className="activity-info-labels">
          <div className="activity-member c-pointer">Fleet</div>
          <div className="activity-priority c-pointer">{"Priority "}1</div>
        </div>
        <div className="acitivity-viewDoc c-pointer" onClick={onClick}>
          View Docs
        </div>
      </div>
    </div>
  );
};

export default DocsNotification;
