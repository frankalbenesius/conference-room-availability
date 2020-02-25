import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

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
    <TwoColumnFlex>
      <RoomListFlex>
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
      </RoomListFlex>
      <EventList roomId={selectedRoomId} />
    </TwoColumnFlex>
  );
}

const TwoColumnFlex = styled.div`
  display: flex;
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
`;
const RoomListFlex = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  max-width: 14rem;
  margin-right: 1rem;
`;

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
