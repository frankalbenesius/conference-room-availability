import { useState, useContext, useEffect } from "react";
import { ApiContext } from "../components/ApiProvider";

function useRooms() {
  const { fetchRooms } = useContext(ApiContext);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms().then(setRooms);
  }, [fetchRooms, setRooms]);

  return rooms;
}

export default useRooms;
