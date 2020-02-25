import React from "react";
import styled from "@emotion/styled";

import useRoomAvailability from "../hooks/useRoomAvailability";

function Room({ id, name, capacity, isSelected, onClick }) {
  const { isAvailable } = useRoomAvailability(id);

  let backgroundColor = "#eee";
  let availabilityMessage = "...";
  if (isAvailable !== null) {
    backgroundColor = isAvailable ? "LightGreen" : "LightPink";
    availabilityMessage = isAvailable ? "Available" : "Unavailable";
  }

  return (
    <RoomWrapper
      backgroundColor={backgroundColor}
      isSelected={isSelected}
      onClick={onClick}
    >
      <RoomName>
        {name} ({capacity})
      </RoomName>
      <Availability>{availabilityMessage}</Availability>
    </RoomWrapper>
  );
}

const RoomWrapper = styled.div`
  background: ${p => p.backgroundColor};
  padding: 0.5rem;
  border-right: 0.25em solid white;
  margin-bottom: 0.1rem;
  ${p => p.isSelected && `border-color: black;`}
`;

const RoomName = styled.div`
  text-transform: uppercase;
`;
const Availability = styled.div`
  font-size: 0.8rem;
  text-transform: capitalize;
`;

export default Room;
