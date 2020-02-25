import React from "react";
import { css } from "emotion";

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
    <div
      onClick={onClick}
      className={css`
        background: ${backgroundColor};
        padding: 0.5rem;
        border-right: 0.25em solid white;
        margin-bottom: 0.1rem;
        ${isSelected && `border-color: black;`}
      `}
    >
      <div
        className={css`
          text-transform: uppercase;
        `}
      >
        {name} ({capacity})
        <div
          className={css`
            font-size: 0.8rem;
            text-transform: capitalize;
          `}
        >
          {availabilityMessage}
        </div>
      </div>
    </div>
  );
}

export default Room;
