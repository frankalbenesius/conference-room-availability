import React from "react";

import { ApiProvider } from "./components/ApiProvider";
import RoomList from "./components/RoomList";
import Header from "./components/Header";
import DarkModeProvider from "./components/DarkModeProvider";
import ThemeProvider from "./components/ThemeProvider";

function App() {
  return (
    <DarkModeProvider>
      <ApiProvider>
        <ThemeProvider>
          <Header />
          <RoomList />
        </ThemeProvider>
      </ApiProvider>
    </DarkModeProvider>
  );
}

export default App;
