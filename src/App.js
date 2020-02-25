import React from "react";
import { ApiProvider } from "./components/ApiProvider";
import RoomList from "./components/RoomList";
import Header from "./components/Header";

function App() {
  return (
    <ApiProvider>
      <Header />
      <RoomList />
    </ApiProvider>
  );
}

export default App;
