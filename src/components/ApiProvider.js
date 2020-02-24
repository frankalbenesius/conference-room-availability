import React, { createContext, useState, useEffect } from "react";
import { GAPI_INIT_OPTS } from "../constants";

export const ApiContext = createContext({
  isInitialized: false,
  isSignedIn: false,
  handleSignIn: () => {},
  handleSignOut: () => {},
  fetchRooms: () => Promise.resolve([]),
  fetchEvents: () => Promise.resolve([])
});

export function ApiProvider(props) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    function initClient() {
      window.gapi.client.init(GAPI_INIT_OPTS).then(
        function() {
          // Signal to component that it can display sign-in and sign-off buttons.
          setIsInitialized(true);
          // Listen for sign-in state changes.
          window.gapi.auth2.getAuthInstance().isSignedIn.listen(setIsSignedIn);
          // Handle the initial sign-in state.
          setIsSignedIn(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        },
        function(error) {
          console.error(error);
        }
      );
    }

    window.gapi.load("client:auth2", initClient);
  }, [setIsSignedIn]);

  function handleSignIn() {
    if (isInitialized) {
      window.gapi.auth2.getAuthInstance().signIn();
    }
  }

  function handleSignOut() {
    if (isInitialized) {
      window.gapi.auth2.getAuthInstance().signOut();
    }
  }

  function fetchRooms() {
    if (!isSignedIn) {
      return Promise.resolve([]);
    } else {
      return window.gapi.client
        .request({
          path:
            "https://www.googleapis.com/admin/directory/v1/customer/my_customer/resources/calendars"
        })
        .then(x => x.result.items)
        .then(calendars => {
          const rooms = calendars
            .filter(calendar => {
              return calendar.resourceCategory === "CONFERENCE_ROOM";
            })
            .map(calendar => {
              return {
                name: calendar.resourceName,
                id: calendar.resourceEmail,
                capacity: calendar.capacity,
                floorName: calendar.floorName,
                floorSection: calendar.floorSection,
                buildingId: calendar.buildingId
              };
            });
          return rooms;
        });
    }
  }

  function fetchEvents(roomId) {
    if (!isSignedIn) {
      return Promise.resolve([]);
    } else {
      return window.gapi.client
        .request({
          path: `https://www.googleapis.com/calendar/v3/calendars/${roomId}/events`,
          params: {
            singleEvents: true,
            orderBy: "startTime",
            maxResults: 2,
            timeMin: new Date().toISOString()
          }
        })
        .then(response => {
          return response.result.items.map(item => {
            return {
              id: item.id,
              title: item.summary,
              creator: item.creator.email,
              // organizer: item.organizer.email,
              start: new Date(item.start.dateTime),
              end: new Date(item.end.dateTime)
            };
          });
        });
    }
  }

  return (
    <ApiContext.Provider
      value={{
        isInitialized,
        isSignedIn,
        handleSignIn,
        handleSignOut,
        fetchRooms,
        fetchEvents
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
}
