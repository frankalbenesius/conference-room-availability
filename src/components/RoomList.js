import React from "react";
import Room from "./Room";
import useRooms from "../hooks/useRooms";
import { css } from "emotion";

function RoomList() {
  const rooms = useRooms();
  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        max-width: 20rem;
        margin: 0 auto;
      `}
    >
      {rooms.sort(roomSort).map(room => (
        <Room key={room.id} {...room} />
      ))}
    </div>
  );
}

function roomSort(a, b) {
  const capacityDiff = a.capacity - b.capacity;
  if (capacityDiff !== 0) {
    return capacityDiff;
  } else {
    return a.name.localeCompare(b.name);
  }
}

export default RoomList;
