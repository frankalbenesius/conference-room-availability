var API_KEY = process.env.REACT_APP_API_KEY;
var CLIENT_ID =
  "749312304038-dj5vsd6bgdc35f02bfvg5h091q6b28b5.apps.googleusercontent.com";
var DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
];
var SCOPES = [
  "https://www.googleapis.com/auth/calendar.events.readonly",
  "https://www.googleapis.com/auth/admin.directory.resource.calendar.readonly"
].join(" ");

export const GAPI_INIT_OPTS = {
  apiKey: API_KEY,
  clientId: CLIENT_ID,
  discoveryDocs: DISCOVERY_DOCS,
  scope: SCOPES
};
