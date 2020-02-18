import React from "react";
import { ApiProvider } from "./components/ApiProvider";
import RoomList from "./components/RoomList";

function App() {
  return (
    <ApiProvider>
      <h1>Room Status</h1>
      <RoomList />
    </ApiProvider>
  );
}

export default App;
