import React, { useContext } from "react";
import {
  DarkModeDispatchContext,
  DarkModeStateContext
} from "./DarkModeProvider";

function DarkModeToggle() {
  const isDark = useContext(DarkModeStateContext);
  const dispatch = useContext(DarkModeDispatchContext);

  function handleClick() {
    dispatch({
      type: "SET_DARK_MODE",
      isDark: !isDark
    });
  }

  return <button onClick={handleClick}>Toggle Dark Mode</button>;
}

export default DarkModeToggle;
