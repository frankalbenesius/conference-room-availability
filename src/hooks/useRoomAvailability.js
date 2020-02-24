import { useEffect, useState } from "react";
import useRoomEvents from "./useRoomEvents";

function useRoomAvailability(roomId = "") {
  const [isAvailable, setIsAvailable] = useState(null);

  const { hasFetchedOnce, events } = useRoomEvents(roomId);

  useEffect(() => {
    if (hasFetchedOnce && events.length > 0) {
      const currentEvents = events.filter(event => {
        const now = new Date();
        const start = new Date(event.start);
        const end = new Date(event.end);
        const isLive = start < now && now < end;
        return isLive;
      });
      setIsAvailable(currentEvents.length < 1);
    }
  }, [hasFetchedOnce, events, setIsAvailable]);

  return { isAvailable };
}

export default useRoomAvailability;
