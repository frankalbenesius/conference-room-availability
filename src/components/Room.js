import React, { useEffect, useState } from "react";
import { css } from "emotion";

function Room({ id, name, capacity }) {
  // TODO: store upcoming events and display more info
  const [status, setStatus] = useState({
    message: "Loading...",
    isAvailable: null
  });

  useEffect(() => {
    window.gapi.client
      .request({
        path: `https://www.googleapis.com/calendar/v3/calendars/${id}/events`,
        params: {
          singleEvents: true,
          orderBy: "startTime",
          maxResults: 1,
          timeMin: new Date().toISOString()
        }
      })
      .then(response => {
        const [nextMeeting] = response.result.items;
        const { message, isAvailable } = getAvailability(nextMeeting);
        setStatus({
          message,
          isAvailable
        });
      });
  }, [id]);

  let backgroundColor = "#eee";
  if (status.isAvailable !== null) {
    backgroundColor = status.isAvailable ? "LightGreen" : "LightPink";
  }

  return (
    <div
      className={css`
        background: ${backgroundColor};
        margin-bottom: 0.25rem;
        padding: 0.5rem;
      `}
    >
      <div
        className={css`
          font-weight: bold;
          text-transform: uppercase;
        `}
      >
        {name} ({capacity})
      </div>
      <div>{status.message}</div>
    </div>
  );
}

export default Room;

function getAvailability(nextMeeting) {
  let availabilityMessage = "Available forever.";
  let isAvailable = true;
  if (nextMeeting) {
    const start = new Date(nextMeeting.start.dateTime);
    const now = new Date();
    isAvailable = now < start;

    if (isAvailable) {
      const meetingIsTomorrow = start.getDay() > now.getDay();
      if (meetingIsTomorrow) {
        availabilityMessage = "Available";
      } else {
        const msAvailable = start - now;
        const secsAvailable = msAvailable / 1000;
        const minsAvailable = secsAvailable / 60;
        if (minsAvailable < 60) {
          availabilityMessage = `Available for ${Math.floor(
            minsAvailable
          )} minutes.`;
        } else {
          const hour = start.getHours() % 12;
          const isAM = start.getHours() < 12;
          const minutes = ("0" + start.getMinutes()).slice(-2);
          availabilityMessage = `Available until ${hour}:${minutes}${
            isAM ? "AM" : "PM"
          }.`;
        }
      }
    } else {
      availabilityMessage = `Unavailable`;
    }
  }
  return { message: availabilityMessage, isAvailable };
}
