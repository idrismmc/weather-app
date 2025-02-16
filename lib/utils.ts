import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToDate(dt: number, format: "short" | "long"): string {
  let local_time = new Date(dt * 1000);
  const options = {
    weekday: format,
  };
  const dateFormatter = new Intl.DateTimeFormat("en-US", options);

  return dateFormatter.format(local_time);
}

export function formatSunTimeWithAMPM(
  timestamp: number,
  timezoneOffset: number
): string {
  const date = new Date((timestamp + timezoneOffset) * 1000);
  const formattedTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
  return formattedTime;
}

export function convertToFahrenheit(kelvin: number): number {
  return (kelvin - 273.15) * (9 / 5) + 32;
}

export function convertToCelsius(kelvin: number): number {
  return kelvin - 273.15;
}

export function extractHoursFromDate(dt: number): number {
  const date = new Date(dt * 1000);
  return date.getHours();
}

export function extractMinutesFromDate(dt: number): number {
  const date = new Date(dt * 1000);
  return date.getMinutes();
}

export function calculateLocalTime(
  initialTime: Date,
  offsetSeconds: number
): Date {
  // Calculate the local time by adjusting the initial time with the offset
  const localTime = new Date(initialTime.getTime() + offsetSeconds * 1000);
  return localTime;
}
