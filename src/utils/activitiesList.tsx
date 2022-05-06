import greenCorrect from "../assets/images/icons/green-correct.svg";
import greenCorrectStar from "../assets/images/icons/green-correct-start.svg";
import greenDash from "../assets/images/icons/green-dash.svg";
import greenExclamation from "../assets/images/icons/yellow-exclamation.svg";
import yellowExclamation from "../assets/images/icons/yellow-exclamation.svg";
import redWarning from "../assets/images/icons/read-warning.svg";
import greenLoc from "../assets/images/icons/green-loc.svg"
import yellowLoc from "../assets/images/icons/yellow-loc.svg"
import redLoc from "../assets/images/icons/red-loc-icon.png"



export enum ActivityType {
  "CAR_IN" = "person_in",
  "CAR_OUT" = "person_in",
  "PERSON_IN" = "person_in",
  "PERSON_OUT" = "person_out",
  "INTRUSION" = "intrusion",
  "NOACTIVITY" = "no_activity",
  "MULTI_INTRUSION" = "multiple_intrusion",
  "TRIP_START" = "trip_start",
  "TRIP_END" = "trip_end",
  "TRIP_ABORTED" = "trip_aborted",
  "REGISTRATION_STARTED" = "registration_starting",
  "REGISTRATION_PENDING" = "registration_pending",
  "LOCATION_TRACKING_START" = "locations_tracking_start",
  "LOCATION_TRACKING_PAUSED" = "locations_tracking_paused",
  "LOCATION_TRACKING_END" = "locations_tracking_end",
  "ORGANISATION_REGISTRATION_START" = "organisation_registration_start",
  "ORGANISATION_REGISTRATION_END" = "organisation_registration_end",
  "REDUCER_ACTION" = "reducer_action",
}

export const activitiesTitle = {
  person_in: "ID7651 found entering",
  person_out: "ID7651 found exiting",
  car_in: "Vehicle KA001234(vehicle number) found entering",
  car_out: "Vehicle KA001234(vehicle number) found exiting",
  intrusion: "Package, Reported at Velor,TN.",
  no_activity: "No activity detected",
  multiple_intrusion: "4 unkown people found entering",
  trip_start: "FL2345(Fleet ID) has begun the trip",
  trip_end: "FL2345(Fleet ID) has ended the trip",
  trip_aborted: "FL2345(Fleet ID) trip is aborted",
  registration_starting: "ID7651(Person ID) registration started",
  registration_pending: "ID7651(Person ID) registration pending",
  locations_tracking_start: "Your Geolocation is being tracked",
  locations_tracking_paused: "Your Geolocation tracking is paused",
  locations_tracking_end: "Your Geolocation tracking is ended",
  organisation_registration_start: "New organisation registration has begun",
  organisation_registration_end:
    "happymonk@chokidr (organization ID) registration is completed",
  reducer_action: "",
};

export const activitiesIcons = {
  person_in: greenExclamation,
  person_out: greenExclamation,
  car_in: greenExclamation,
  car_out: greenExclamation,
  intrusion: redWarning,
  no_activity: greenDash,
  multiple_intrusion: redWarning,
  trip_start: greenExclamation,
  trip_end: greenCorrect,
  trip_aborted: redWarning,
  registration_starting: greenExclamation,
  registration_pending: yellowExclamation,
  locations_tracking_start: greenLoc,
  locations_tracking_paused: yellowLoc,
  locations_tracking_end: redLoc,
  organisation_registration_start: greenExclamation,
  organisation_registration_end: greenCorrectStar,
  reducer_action: "",
};
