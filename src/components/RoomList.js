import React from "react";
import { css } from "emotion";

import Room from "./Room";
import useRooms from "../hooks/useRooms";

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
      {rooms.sort(sortRoomsByFloorAndSection).map(room => (
        <Room key={room.id} {...room} />
      ))}
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
