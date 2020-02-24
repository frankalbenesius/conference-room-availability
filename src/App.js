import React from "react";
import { ApiProvider } from "./components/ApiProvider";
import RoomList from "./components/RoomList";
import AuthButton from "./components/AuthButton";

function App() {
  return (
    <ApiProvider>
      <h1>Room Status</h1>
      <RoomList />
      <AuthButton />
    </ApiProvider>
  );
}

export default App;
