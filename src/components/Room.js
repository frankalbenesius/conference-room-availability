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
    <Wrapper
      backgroundColor={backgroundColor}
      isSelected={isSelected}
      onClick={onClick}
    >
      <TextWrapper
        backgroundColor={backgroundColor}
        isSelected={isSelected}
        onClick={onClick}
      >
        <RoomName>
          {name} ({capacity})
        </RoomName>
        <Availability>{availabilityMessage}</Availability>
      </TextWrapper>
      {isSelected && (
        <ArrowWrapper>
          <img src="https://icon.now.sh/triangleRight" />
        </ArrowWrapper>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TextWrapper = styled.div`
  background: ${p => p.backgroundColor};
  padding: 0.5rem;
  margin-bottom: 0.1rem;
  flex: 0 0 10rem;
  width: 10rem;
`;

const ArrowWrapper = styled.div`
  flex: 0 0 auto;
`;

const RoomName = styled.div`
  text-transform: uppercase;
`;
const Availability = styled.div`
  font-size: 0.8rem;
  text-transform: capitalize;
`;

export default Room;
