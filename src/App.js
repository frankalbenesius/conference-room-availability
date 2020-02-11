import React from "react";
import { AuthProvider } from "./components/AuthProvider";
import RoomList from "./components/RoomList";

function App() {
  return (
    <AuthProvider>
      <h1>Rooms</h1>
      <RoomList />
    </AuthProvider>
  );
}

export default App;
