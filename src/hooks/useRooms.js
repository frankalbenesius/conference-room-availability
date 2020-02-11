import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../components/AuthProvider";

function useRooms() {
  // TODO: periodically refresh this data
  const { isSignedIn } = useContext(AuthContext);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (isSignedIn) {
      window.gapi.client
        .request({
          path:
            "https://www.googleapis.com/admin/directory/v1/customer/my_customer/resources/calendars"
        })
        .then(x => x.result.items)
        .then(calendars => {
          const rooms = calendars
            .filter(calendar => {
              return calendar.resourceCategory === "CONFERENCE_ROOM";
            })
            .map(calendar => {
              return {
                name: calendar.resourceName,
                id: calendar.resourceEmail,
                capacity: calendar.capacity
              };
            });
          setRooms(rooms);
        });
    }
  }, [isSignedIn, setRooms]);

  return rooms;
}

export default useRooms;
