const BillDestination = () => {
  return (
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
  );
};

export default BillDestination;
