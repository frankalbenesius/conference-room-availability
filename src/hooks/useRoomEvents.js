import { useContext, useEffect, useReducer } from "react";
import { ApiContext } from "../components/ApiProvider";

function useRoomEvents(roomId = "") {
  const { fetchRoomEvents } = useContext(ApiContext);

  const [state, dispatch] = useReducer(eventsReducer, {
    hasFetchedOnce: false,
    isFetching: false,
    events: []
  });

  useEffect(() => {
    function updateRoomEvents() {
      if (roomId) {
        dispatch({ type: "FETCH_EVENTS_START" });
        fetchRoomEvents(roomId).then(events => {
          dispatch({ type: "FETCH_EVENTS_SUCCESS", events });
        });
      }
    }
    updateRoomEvents();
    const interval = setInterval(updateRoomEvents, 1000 * 60);
    return () => {
      clearInterval(interval);
    };
  }, [roomId, fetchRoomEvents, dispatch]);

  return state;
}

export default useRoomEvents;

function eventsReducer(state, action) {
  switch (action.type) {
    case "FETCH_EVENTS_START": {
      return {
        ...state,
        isFetching: true
      };
    }
    case "FETCH_EVENTS_SUCCESS": {
      return {
        ...state,
        hasFetchedOnce: true,
        isFetching: false,
        events: action.events
      };
    }
    default: {
      return state;
    }
  }
}
