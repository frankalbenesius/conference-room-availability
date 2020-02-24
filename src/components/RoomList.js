import React, { useEffect, useState } from "react";
import { css } from "emotion";

import Room from "./Room";
import useRooms from "../hooks/useRooms";
import EventList from "./EventList";

function RoomList() {
  const rooms = useRooms();

  const [selectedRoomId, setSelectedRoomId] = useState(null);
  useEffect(() => {
    if (rooms.length > 0 && selectedRoomId === null) {
      setSelectedRoomId(rooms[0].id);
    }
  }, [rooms, selectedRoomId, setSelectedRoomId]);

  return (
    <div
      className={css`
        display: flex;
      `}
    >
      <div
        className={css`
          display: flex;
          flex-direction: column;
          max-width: 14rem;
          margin-right: 1rem;
        `}
      >
        {rooms.sort(sortRoomsByFloorAndSection).map(room => (
          <Room
            key={room.id}
            isSelected={selectedRoomId === room.id}
            onClick={() => {
              setSelectedRoomId(room.id);
            }}
            {...room}
          />
        ))}
      </div>
      <EventList roomId={selectedRoomId} />
    </div>
  );
}

function sortRoomsByFloorAndSection(a, b) {
  if (a.floorName !== b.floorName) {
    return a.floorName.localeCompare(b.floorName);
  }
  if (a.floorSection !== b.floorSection) {
    return a.floorSection.localeCompare(b.floorSection);
  }
  return a.name.localeCompare(b.name);
}

export default RoomList;
