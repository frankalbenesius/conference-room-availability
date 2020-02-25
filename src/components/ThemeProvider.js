import React, { useContext } from "react";
import { Global, css } from "@emotion/core";
import { ThemeProvider as EmotionThemeProvider } from "emotion-theming";

import { DarkModeStateContext } from "./DarkModeProvider";

function ThemeProvider({ children }) {
  const isDark = useContext(DarkModeStateContext);
  const theme = isDark
    ? {
        color: "white",
        background: "black"
      }
    : {
        color: "black",
        background: "white"
      };

  return (
    <EmotionThemeProvider theme={theme}>
      <Global
        styles={css`
          html,
          body {
            background: ${theme.background};
          }
        `}
      />
      {children}
    </EmotionThemeProvider>
  );
}

export default ThemeProvider;
