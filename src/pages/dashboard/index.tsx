/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import "../../assets/styles/dashboard.scss";
import Header from "../../components/Header";
import Map from "../../components/DrawMap";
import filterIc from "../../assets/images/filter-icon.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import redLocIc from "../../assets/images/icons/red-loc-icon.png";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import smallCCTVIc from "../../assets/images/cctv-camera-icon.png";
import smallManPic from "../../assets/images/man-sm.png";
import menInteranceImg from "../../assets/images/men-interance.png";
import manInSuitImg from "../../assets/images/buisness-man-going.png";
import cryptoIc from "../../assets/images/crypto-icon.svg";
import { Avatar, Badge, menuItemClasses } from "@mui/material";
import CollapsibleLocationBar from "../../components/CollapsibleLocationBar";
import crystalIcon from "../../assets/images/hexgon-crystal.png";
import { useQuery, useSubscription } from "urql";
import { activitiesIcons, activitiesTitle } from "../../utils/activitiesList";
import moment from "moment";
import { testVCGeneration } from "../../utils/testVCGeneration";
import AddPackage from "../../components/AddPackage";
import AddPackageDialog from "../../components/flows/clients/AddPackage";
import SubmitPackageDialog from "../../components/flows/clients/SubmitPackage";
import SubmitPackageSuccessDialog from "../../components/flows/common/SuccessDialog";
import { faker } from "@faker-js/faker";
import DgftAgencyDialog from "../../components/flows/govt dgft/AgencyViewDocs";
import trafficRepresentationImg from "../../assets/images/traffic_representation.svg";
import {
  ViewDocsDgft,
  ViewDocsIcegate,
} from "../../components/flows/common/ViewDocs";
import IcegateAgencyDialog from "../../components/flows/govt icegate/AgencyVIewDocs";
import PackageDetailsDialog from "../../components/flows/clients/PackageDetailsDialog";
import DocsNotification from "../../components/flows/common/DocsNotification";
import ServiceProviderMainDialog from "../../components/flows/service provider/ProviderMainDialog";
import ProviderDetailsReview from "../../components/flows/service provider/ProviderDetailsReviewDialog";
import loadingImg from "../../assets/images/loading.jpg";
import infoImg from "../../assets/images/icons/info_orange.svg";
import packageImg from "../../assets/images/icons/package.svg";
import {
  saveBills,
  saveActivitiesList,
  saveActivity,
  saveActivityLocation,
} from "../../redux/modules/dashboard/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import { getEwayBills } from "../../GQLQueries/ewayBills";
import useProtectedRoute from "../../hooks/UseProtectedRoute";
import { persistor } from "../../redux/store";
import VideoPlayer from "../../components/flows/activities/VideoPlayer";
import EmployeeCard from "../../components/flows/activities/EmployeeCard";
import AddNewDevice from "../../components/flows/activities/locations/AddNewDevice";
import CollapsibleDevicesBar from "../../components/CollapsibleDevicesBar";
import { saveSideBarView } from "../../redux/modules/dashboard/dashboardSlice";
import timestamp from "time-stamp";
import AddDevice from "../../components/flows/devices/AddDevice";
import AddToOrganisationAccordon from "../../components/onboarding/organisation/AddToOrganisationAccordon";
import DevicesBrandsDialog from "../../components/flows/devices/DevicesBrands";

const memberdid =
  "did:ckdr:Ee3qAFcbDNAdq9GvYG9pBPkgr3Q3C2NqbScjdxhXymoF53VNkyVbR8p1O3jgtIVRhb6Yv9QRNFdsf1uPfANviuR5pH0BoJdmCOcZitfZvcXmp5+gF1KHlRaUTb7PRBws+9iUcmPCl166ad8Q10TCTC8FapG5nonsv071Z30ODSHCYPGm";

const activitiesSubscription = `
subscription(
  $topic: String!,
  $memberdid: String
){
  activities(topic: $topic ,memberdid: $memberdid ){
    id,
    type,
    timestamp,
    notified,
    state,
    incidentID,
    isIncident,
    device_stream_id,
    location{longitude, kinect,latitude},
    subActivity,
    activity_start_time,
    activity_end_time,
    detections{totalNumberOfPeople,totalNumberOfUnknowns, known, actions,totalNumberOfFleet,severity_score, priority},
    related_sensors,
    documentList,
    relatedActivity,
    signature,
    proof,
    witness,
  }
}
`;

const handleSubscription = (activities = [], response: { activities: any }) => {
  return [response.activities, ...activities];
};

const Dashboard = () => {
  const [detailView, setDetailVidew] = useState(false);
  const [isActivityShutterDown, setIsActivityShutterDown] = useState(true);
  const [isLocationView, setIsLocationView] = useState(false);
  const [isDevicesView, setIsDevicesView] = useState(true);
  const [LocTrackerIcon, setLocTrackerIcon] = useState(null);
  const [isActivitySubPaused, setIsActivitySubPaused] = useState(false);
  const [activityList, setActivityList] = useState([]);
  const [markerCoords, setMarkerCoords] = useState([]);
  const [dialogOpen, setDialogOpen] = useState<string>("");

  const [employeeCardShow, setEmployeeCardShow] = useState(false);

  const [isOnboarding, setIsOnboarding] = useState(true);

  const handleEmployeeCard = () => {
    setEmployeeCardShow(!employeeCardShow);
  };

  const [{ fetching: billsLoading, data: ewayBills, error: billsError }] =
    useQuery({
      query: getEwayBills,
      variables: {
        limit: 5,
      },
    });

  const timeOut = Math.floor(Math.random() * 3) + 0.5;
  const dispatch = useDispatch();

  const handleDialogOpen = (dialog) => {
    console.log(dialog);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setDialogOpen(dialog);
    }, timeOut * 1000);
  };

  const handleDialogClose = () => {
    setDialogOpen("");
  };

  const subscriptionVariables = {
    topic: "activities",
    memberdid,
  };

  const [res] = useSubscription(
    {
      query: activitiesSubscription,
      variables: subscriptionVariables,
      pause: isActivitySubPaused,
    },
    handleSubscription
  );

  useEffect(() => {
    if (res?.data) {
      setActivityList(res.data);
      dispatch(saveActivitiesList(res.data));
    }
  }, [res]);

  useEffect(() => {
    setTimeout(() => {
      setIsActivitySubPaused(true);
    }, 8000);
  }, []);

  useEffect(() => {
    // console.log("activityList", activityList);
    let newCoordsArray = [];
    activityList?.map((e, i) => {
      newCoordsArray.push(e.location);
    });

    setMarkerCoords(newCoordsArray);
  }, [activityList]);

  useEffect(() => {
    console.log("vc testing");
    testVCGeneration();
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (ewayBills) {
      dispatch(saveBills(ewayBills?.getEWayBills));
    }
  }, [ewayBills]);

  const {
    activitiesList: activities,
    activity,
    sideBar,
    location,
  } = useSelector((state) => state.dashboard);

  //ACTIVITY VIDEO PLAYER

  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      },
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      player.log("player is waiting");
    });

    player.on("dispose", () => {
      player.log("player will dispose");
    });
  };
  const handleSidebarShow = (show: string) => {
    dispatch(saveSideBarView(show));
  };

  const locations = isActivitySubPaused
    ? activities.map((item) => {
        return {
          long: item?.location?.longitude,
          lat: item?.location?.latitude,
        };
      })
    : [];

  return (
    <div className="dashboard">
      <AddPackageDialog
        open={dialogOpen === "addpackage"}
        handleClose={handleDialogClose}
        handleContinue={() => handleDialogOpen("subpackage")}
      />
      <SubmitPackageSuccessDialog
        open={dialogOpen === "subpackagesuccess"}
        handleClose={handleDialogClose}
        handleContinue={handleDialogOpen}
        title={null}
        children={null}
        icon={null}
      />

      <SubmitPackageDialog
        open={dialogOpen === "subpackage"}
        handleClose={handleDialogClose}
        handleContinue={() => handleDialogOpen("subpackagesuccess")}
      />
      <DgftAgencyDialog
        open={dialogOpen === "dgftagency"}
        handleClose={handleDialogClose}
        handleContinue={() => handleDialogOpen("subpackagesuccess")}
      />
      <IcegateAgencyDialog
        open={dialogOpen === "icegateagency"}
        handleClose={handleDialogClose}
        handleContinue={(dialog: string) => handleDialogOpen(dialog)}
      />
      <PackageDetailsDialog
        open={dialogOpen === "packdetails"}
        handleClose={handleDialogClose}
        handleContinue={handleDialogClose}
      />
      <ServiceProviderMainDialog
        open={dialogOpen === "serviceprovider"}
        handleClose={handleDialogClose}
        handleContinue={handleDialogClose}
      />
      <ProviderDetailsReview
        open={dialogOpen === "provider-details-review"}
        handleClose={handleDialogClose}
        handleContinue={handleDialogClose}
      />
      <div className="headerContainer">
        <Header onLocationClick={() => setIsLocationView(true)} />
      </div>
      {isLoading && (
        <div
          className="loader-image"
          style={{ position: "absolute", top: "40%", right: "60%" }}
        >
          <img src={loadingImg} alt="loaidng" />
        </div>
      )}
      <div className="dashboard-map-bg">
        <Map
          trackerIcon={isLocationView ? crystalIcon : false}
          markerCoords={markerCoords}
          activityLocation={location}
          locations={locations}
        />
        {detailView && sideBar === "activities" && (
          <VideoPlayer
            show={detailView}
            timestamp={timestamp.utc("YYYY/MM/DD:mm:ss")}
            options={videoJsOptions}
            onReady={handlePlayerReady}
          />
        )}

        {/* Side Panel */}
        <div>
          {sideBar === "activities" && (
            <div
              className={`dashboard-side-panel ${
                detailView ? "detail-side-panel" : ""
              }`}
            >
              {!detailView ? (
                <div className="dashboard">
                  <div>
                    <div className="panel-header flex items-center justify-between">
                      <div className="panel-header-label">All Activities</div>

                      <div className="flex items-center panel-header-ext">
                        <div className="activities-filter c-pointer">
                          <img src={filterIc} alt="filter icon" />
                        </div>
                        <div className="close-activity c-pointer">
                          <KeyboardArrowDownIcon
                            style={{ color: "lightgray" }}
                          />
                        </div>
                      </div>
                    </div>

                    <ul className="activities-list">
                      {activities?.map((item, i) => (
                        <li
                          className="activity-item"
                          key={i}
                          onClick={() => {
                            setDetailVidew(true);
                            dispatch(saveActivity(item));
                            dispatch(saveActivityLocation(item?.location));
                          }}
                        >
                          <div className="activity-label">
                            <div className="activity-title">
                              <img
                                src={
                                  activitiesIcons[item.type]
                                    ? activitiesIcons[item.type]
                                    : redLocIc
                                }
                                alt="red location"
                                className="c-pointer"
                              />
                              <span className="c-pointer">
                                {activitiesTitle[item.type]}
                              </span>
                            </div>
                            <div className="activity-time c-pointer">
                              {moment().diff(
                                moment(item.activity_start_time),
                                "days"
                              ) > 0
                                ? `${moment().diff(
                                    moment(item.activity_start_time),
                                    "days"
                                  )} mins ago`
                                : moment().diff(
                                    moment(item.activity_start_time),
                                    "hours"
                                  ) > 0
                                ? `${moment().diff(
                                    moment(item.activity_start_time),
                                    "hours"
                                  )} hrs ago`
                                : `${moment().diff(
                                    moment(item.activity_start_time),
                                    "minutes"
                                  )} min ago`}
                            </div>
                          </div>
                          <div className="activity-info">
                            <div className="activity-info-labels">
                              <div className="activity-member c-pointer">
                                Fleet
                              </div>
                              <div className="activity-priority c-pointer">
                                {"Priority "}
                                {item?.detections?.priority
                                  ? item.detections.priority
                                  : 0}
                              </div>
                            </div>
                            <div
                              className="acitivity-viewDoc c-pointer"
                              onClick={() => setDetailVidew(true)}
                            >
                              View Docs
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="activity-detail-view">
                  <div className="panel-header">
                    <div className="panel-header-label flex items-center">
                      <KeyboardBackspaceIcon
                        className="activitydetail-back-icon c-pointer"
                        onClick={() => setDetailVidew(false)}
                        style={{ color: "#fff" }}
                      />
                      <span>Fleet</span>
                    </div>
                  </div>
                  <div className="activity-label">
                    <div className="activity-title">
                      <img
                        src={redLocIc}
                        alt="red location"
                        className="c-pointer"
                      />
                      <span className="c-pointer">
                        Activity: {activity?.type}
                      </span>
                    </div>
                    <div className="device-name c-pointer">
                      {faker.vehicle.vin()}
                    </div>
                  </div>
                  <div className="flex justify-between device-details-list">
                    <div className="device-details flex-1">
                      <div className="flex items-center justify-center">
                        <img src={smallCCTVIc} alt="cctv" />
                        <span className="device-detials-label">Camera no.</span>
                      </div>
                      <div className="device-details-info">
                        {faker.vehicle.vin()}
                      </div>
                    </div>
                    <div className="device-details flex-1 rec-border">
                      <div className="flex items-center justify-center">
                        <img src={smallCCTVIc} alt="cctv" />
                        <span className="device-detials-label">Rec. time</span>
                      </div>
                      <div className="device-details-info">
                        {new Date().getDay()}
                      </div>
                    </div>
                    <div className="device-details flex-1">
                      <div className="flex items-center justify-center">
                        <img src={smallCCTVIc} alt="cctv" />
                        <span className="device-detials-label">Area</span>
                      </div>
                      <div className="device-details-info">Jefferson sq.</div>
                    </div>
                  </div>

                  {/* more info */}
                  <div className="moreInfo">
                    <div className="moreInfo-title">More information</div>
                    <ul className="moreInfo-details flex items-center justify-between">
                      <li>
                        <div className="moreInfoLabel">Identity</div>
                        <div className="moreInfoValue">ID7651</div>
                      </li>
                      <li>
                        <div className="moreInfoLabel">Facial identity</div>
                        <div className="moreInfoValue">
                          <Badge
                            badgeContent={0}
                            color="success"
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                          >
                            <Avatar alt="Cindy Baker" src={smallManPic} />
                          </Badge>
                        </div>
                      </li>
                      <li>
                        <div className="moreInfoLabel">Category</div>
                        <div className="moreInfoValue">Known</div>
                      </li>
                      <li>
                        <div className="moreInfoLabel">Name</div>
                        <div className="moreInfoValue">Rajesh</div>
                      </li>
                    </ul>

                    {/* images */}
                    <div className="infoImages">
                      <div className="infoImgTitle">Images</div>
                      <ul className="infoImgList">
                        <li className="infoImgItem">
                          <img
                            src={menInteranceImg}
                            alt="camera photos"
                            className="c-pointer"
                          />
                        </li>
                        <li className="infoImgItem">
                          <img
                            src={manInSuitImg}
                            alt="camera photos"
                            className="c-pointer"
                          />
                        </li>
                      </ul>
                    </div>

                    {/* people involved */}
                    <EmployeeCard
                      handleClick={handleEmployeeCard}
                      show={employeeCardShow}
                    />
                    {!employeeCardShow && (
                      <div className="peopleInvolved">
                        <div className="moreInfo-title">People invovled</div>
                        <ul
                          className="moreInfo-details flex items-center justify-between"
                          onClick={handleEmployeeCard}
                        >
                          <li>
                            <div className="moreInfoValue">ID7651</div>
                          </li>
                          <li>
                            <div className="moreInfoValue">
                              <Badge
                                badgeContent={0}
                                color="success"
                                anchorOrigin={{
                                  vertical: "top",
                                  horizontal: "right",
                                }}
                              >
                                <Avatar alt="Cindy Baker" src={smallManPic} />
                              </Badge>
                            </div>
                          </li>
                          <li>
                            <div className="moreInfoValue">Employee</div>
                          </li>
                          <li>
                            <div className="moreInfoValue">Trevor A.</div>
                          </li>
                        </ul>
                        <ul
                          className="moreInfo-details flex items-center justify-between"
                          onClick={handleEmployeeCard}
                        >
                          <li>
                            <div className="moreInfoValue">ID7651</div>
                          </li>
                          <li>
                            <div className="moreInfoValue">
                              <Badge
                                badgeContent={0}
                                color="success"
                                anchorOrigin={{
                                  vertical: "top",
                                  horizontal: "right",
                                }}
                              >
                                <Avatar alt="Cindy Baker" src={smallManPic} />
                              </Badge>
                            </div>
                          </li>
                          <li>
                            <div className="moreInfoValue">Employee</div>
                          </li>
                          <li>
                            <div className="moreInfoValue">Trevor A.</div>
                          </li>
                        </ul>
                        <ul
                          className="moreInfo-details flex items-center justify-between"
                          onClick={handleEmployeeCard}
                        >
                          <li>
                            <div className="moreInfoValue">ID7651</div>
                          </li>
                          <li>
                            <div className="moreInfoValue">
                              <Badge
                                badgeContent={0}
                                color="success"
                                anchorOrigin={{
                                  vertical: "top",
                                  horizontal: "right",
                                }}
                              >
                                <Avatar alt="Cindy Baker" src={smallManPic} />
                              </Badge>
                            </div>
                          </li>
                          <li>
                            <div className="moreInfoValue">Employee</div>
                          </li>
                          <li>
                            <div className="moreInfoValue">Trevor A.</div>
                          </li>
                        </ul>
                      </div>
                    )}

                    {/* crypto details */}
                    <div className="cryptoDetails">
                      <div className="cryptoDetails-header flex items-center">
                        <img
                          src={cryptoIc}
                          alt="crypto icon"
                          width={30}
                          height={32}
                        />
                        <span className="cryptoDetails-title">
                          Crypto details
                        </span>
                      </div>
                      <ul className="cryptoDetails-list">
                        <li className="cryptoDetail-item">
                          <span className="cryptoDetails-key">Type:</span>
                          <span className="cryptoDetails-value">
                            "BbsBlsSignatureProof2020"
                          </span>
                        </li>
                        <li className="cryptoDetail-item">
                          <span className="cryptoDetails-key">Created:</span>
                          <span className="cryptoDetails-value">
                            {" "}
                            "2020-04-25"
                          </span>
                        </li>
                        <li className="cryptoDetail-item">
                          <div className="cryptoDetails-key">Proof Value:</div>
                          <div className="cryptoDetails-value">
                            "kTTbA3pmDa6Qia/JkOnIXDLmoBz3vsi7L5t3DWySI/VLmBqleJ/Tbus5RoyiDERDBEh5rnACXlnOqJ/U8yFQFtcp/mBCc2FtKNPHae9jKIv1dm9K9QK1F3GI1AwyGoUfjLWrkGDObO1ouNAhpEd0+et+qiOf2j8p3MTTtRRx4Hgjcl0jXCq7C7R5/nLpgimHAAAAdAx4ouhMk7v9dXijCIMaG0deicn6fLoq3GcNHuH5X1j22LU/hDu7vvPnk/6JLkZ1xQAAAAIPd1tu598L/K3NSy0zOy6obaojEnaqc1R5Ih/6ZZgfEln2a6tuUp4wePExI1DGHqwj3j2lKg31a/6bSs7SMecHBQdgIYHnBmCYGNQnu/LZ9TFV56tBXY6YOWZgFzgLDrApnrFpixEACM9rwrJ5ORtxAAAAAgE4gUIIC9aHyJNa5TBklMOh6lvQkMVLXa/vEl+3NCLXblxjgpM7UEMqBkE9/QcoD3Tgmy+z0hN+4eky1RnJsEg="
                          </div>
                        </li>
                        <li className="cryptoDetail-item">
                          <span className="cryptoDetails-key">
                            Verification Method:
                          </span>
                          <span className="cryptoDetails-value">
                            {" "}
                            "did:example:489398593#test"
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* Location Panel */}
          {sideBar === "location" && (
            <>
              <div
                className="location-panel-exit flex items-center justify-center c-pointer"
                onClick={() => handleSidebarShow("activities")}
              >
                <KeyboardBackspaceIcon />
              </div>
              <div className={"location-panel"}>
                <ul className="location-list flex fd-column">
                  {[...Array(10)].map((e, i) => (
                    <React.Fragment key={i}>
                      <li>
                        <CollapsibleLocationBar isActive={true} />
                      </li>

                      <li>
                        <CollapsibleLocationBar isActive={false} />
                      </li>
                    </React.Fragment>
                  ))}
                </ul>
              </div>
            </>
          )}

          {/* Devices Panel */}
          {sideBar === "devices" && (
            <>
              <div
                className="location-panel-exit flex items-center justify-center c-pointer"
                onClick={() => handleSidebarShow("activities")}
              >
                <KeyboardBackspaceIcon />
              </div>
              <div className={"location-panel"}>
                <ul className="location-list flex fd-column">
                  <AddToOrganisationAccordon />
                  <AddDevice />
                  <AddNewDevice />
                  {[...Array(10)].map((e, i) => (
                    <React.Fragment key={i}>
                      <li>
                        <CollapsibleDevicesBar isActive={true} />
                      </li>

                      <li>
                        <CollapsibleDevicesBar isActive={false} />
                      </li>
                    </React.Fragment>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default useProtectedRoute(Dashboard);
