import { useContext, useEffect, useReducer } from "react";
import { ApiContext } from "../components/ApiProvider";

function useRoomEvents(roomId = "") {
  const { fetchEvents } = useContext(ApiContext);

  const [state, dispatch] = useReducer(eventsReducer, {
    hasFetchedOnce: false,
    isFetching: false,
    events: []
  });

  useEffect(() => {
    dispatch({ type: "FETCH_ROOMS_START" });
    fetchEvents(roomId).then(events => {
      dispatch({ type: "FETCH_ROOMS_SUCCESS", events });
    });
  }, [roomId, fetchEvents, dispatch]);

  return state;
}

export default useRoomEvents;

function eventsReducer(state, action) {
  switch (action.type) {
    case "FETCH_ROOMS_START": {
      return {
        ...state,
        isFetching: true
      };
    }
    case "FETCH_ROOMS_SUCCESS": {
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
