import { useState, useEffect } from "react";
import { format } from "date-fns";

export default function() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 5 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return format(date, "h:mma");
}
