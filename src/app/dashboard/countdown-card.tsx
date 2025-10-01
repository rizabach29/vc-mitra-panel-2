"use client";
import { useCountdown } from "@/Hooks";
import { TimerIcon } from "@radix-ui/react-icons";
import React, { useEffect } from "react";

type theme = "light" | "red";

function CountdownCard({
  date,
  onExpired,
  theme = "red",
}: {
  date: Date;
  onExpired?: () => void;
  theme?: theme;
}) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(date);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (isExpired && onExpired) onExpired();
  }, [seconds, isExpired, onExpired]);

  // Prevent hydration mismatch: render nothing until mounted
  if (!mounted) return null;
  if (isExpired) return null;

  if (days > 0)
    return (
      <div
        className={`flex rounded-xl py-0.5 px-2 space-x-1 text-center text-xs items-center justify-center ${
          theme === "red"
            ? "bg-red-500 text-white"
            : "bg-red-500/10 text-red-500"
        } backdrop-blur  font-medium`}
      >
        <TimerIcon className="text-white" />
        <p className="p-0 text-xs">
          {days > 0
            ? `${days} hari lagi`
            : `${hours}h : ${minutes}m : ${seconds}s`}
        </p>
      </div>
    );

  return (
    <div
      className={`flex rounded-full py-0.5 pr-2 space-x-1 text-center text-xs items-center justify-center ${
        theme === "red"
          ? "bg-red-500 text-white pl-1.5"
          : "bg-red-500/10 text-red-500 pl-2"
      } backdrop-blur font-medium`}
    >
      {theme === "red" ? <TimerIcon className={`text-white`} /> : null}
      <p
        className={`text-xs rounded ${
          theme === "red" ? "text-white" : "text-red-500"
        }`}
      >
        {hours}
      </p>
      <p
        className={`text-xs font-extrabold ${
          theme === "red" ? "text-white" : "text-red-500"
        }`}
      >
        :
      </p>
      <p
        className={`text-xs rounded ${
          theme === "red" ? "text-white" : "text-red-500"
        }`}
      >
        {minutes}
      </p>
      <p
        className={`text-xs font-extrabold ${
          theme === "red" ? "text-white" : "text-red-500"
        }`}
      >
        :
      </p>
      <p
        className={`text-xs rounded ${
          theme === "red" ? "text-white" : "text-red-500"
        }`}
      >
        {seconds}
      </p>
    </div>
  );
}

export default CountdownCard;
