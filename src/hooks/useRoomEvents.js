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
    if (roomId) {
      dispatch({ type: "FETCH_ROOMS_START" });
      fetchRoomEvents(roomId).then(events => {
        dispatch({ type: "FETCH_ROOMS_SUCCESS", events });
      });
    }
  }, [roomId, fetchRoomEvents, dispatch]);

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
