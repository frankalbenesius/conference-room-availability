import React from "react";
import { css } from "emotion";
import format from "date-fns/format";

import useRoomEvents from "../hooks/useRoomEvents";

function formatTime(date) {
  return format(date, "h:mma");
}

function EventList({ roomId }) {
  const { events, isFetching } = useRoomEvents(roomId);
  if (isFetching) {
    return null;
  }
  return (
    <div
      className={css`
        text-align: left;
      `}
    >
      {events.map(event => (
        <div key={event.id}>
          {formatTime(event.start)}-{formatTime(event.end)}&nbsp;
          {event.title}
        </div>
      ))}
    </div>
  );
}

export default EventList;
