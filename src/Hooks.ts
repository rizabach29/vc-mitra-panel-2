"use client";
import { useEffect, useState } from "react";
import { SetCookie } from "./infrastructures/cookieStore";

interface ICountdownResponse {
  days: number;
  hours: string;
  minutes: string;
  seconds: string;
  isExpired: boolean;
}

export const useCountdown = (
  targetDate: string | number | Date
): ICountdownResponse => {
  const [countDownDate, _] = useState(new Date(targetDate).getTime());

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate, targetDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: number): ICountdownResponse => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  let isExpired = false;
  if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) isExpired = true;

  return {
    days,
    hours: (hours + days * 24).toString().padStart(2, "0"),
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0"),
    isExpired,
  };
};
