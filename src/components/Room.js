import React from "react";
import { css } from "emotion";

import useRoomAvailability from "../hooks/useRoomAvailability";

function Room({ id, name, capacity, isSelected, onClick }) {
  const { isAvailable } = useRoomAvailability(id);
  let backgroundColor = "#eee";
  if (isAvailable !== null) {
    backgroundColor = isAvailable ? "LightGreen" : "LightPink";
  }

  return (
    <div
      onClick={onClick}
      className={css`
        background: ${backgroundColor};
        padding: 0.5rem;
        border-right: 0.25em solid white;
        ${isSelected && `border-color: black;`}
      `}
    >
      <div
        className={css`
          font-weight: bold;
          text-transform: uppercase;
        `}
      >
        {name} ({capacity})
      </div>
    </div>
  );
}

export default Room;
