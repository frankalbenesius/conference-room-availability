import React from "react";
import styled from "@emotion/styled";
import format from "date-fns/format";

import useRoomEvents from "../hooks/useRoomEvents";

export default function EventList({ roomId }) {
  const { events, isFetching } = useRoomEvents(roomId);

  if (isFetching) {
    return null;
  }

  return (
    <EventListWrapper>
      {events.map(event => {
        const now = new Date();
        const start = new Date(event.start);
        const end = new Date(event.end);
        const isLive = start < now && now < end;
        return (
          <Event key={event.id} isLive={isLive}>
            {formatTime(event.start)}-{formatTime(event.end)}&nbsp;
            {event.title}
          </Event>
        );
      })}
    </EventListWrapper>
  );
}

const EventListWrapper = styled.div`
  text-align: left;
`;

const Event = styled.div`
  ${p => p.isLive && `font-weight: bold;`}
  color: ${p => p.theme.color};
`;

function formatTime(date) {
  return format(date, "h:mma");
}
