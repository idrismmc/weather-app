"use client";

import { calculateLocalTime } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ClockProps {
  initial: number;
  timezone: number;
}

export default function Clock({ initial, timezone }: ClockProps) {
  const [time, setTime] = useState(
    calculateLocalTime(new Date(initial), timezone)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateLocalTime(new Date(), timezone));
    }, 1000);

    return () => clearInterval(timer);
  }, [timezone]);

  return (
    <div className="tabular-nums">
      {time.toLocaleTimeString("en-US", {
        timeZone: "UTC",
        hour12: true,
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      })}
    </div>
  );
}
