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
    intrusion: "Unkown person found entering",
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
    organisation_registration_end: "happymonk@chokidr (organization ID) registration is completed",
    reducer_action: "",
    
}