import React, { useReducer } from "react";

export const DarkModeStateContext = React.createContext(false);
export const DarkModeDispatchContext = React.createContext(() => {});

function darkModeReducer(state, action) {
  switch (action.type) {
    case "SET_DARK_MODE": {
      return action.isDark;
    }
    default: {
      return state;
    }
  }
}

function DarkModeProvider({ children }) {
  const [state, dispatch] = useReducer(darkModeReducer, false);

  return (
    <DarkModeDispatchContext.Provider value={dispatch}>
      <DarkModeStateContext.Provider value={state}>
        {children}
      </DarkModeStateContext.Provider>
    </DarkModeDispatchContext.Provider>
  );
}

export default DarkModeProvider;
