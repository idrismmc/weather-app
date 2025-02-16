"use client";

import { Card } from "@/components/ui/card";
import Clock from "@/components/clock";
import {
  convertToCelsius,
  convertToDate,
  convertToFahrenheit,
} from "@/lib/utils";
import { CalendarDaysIcon, MapPin, Thermometer } from "lucide-react";
import IconComponent from "@/components/icon-component";
import { useWeather } from "@/hooks/use-weather";
import { use } from "react";

export default function CurrentWeather() {
  const { currentWeather, unit } = useWeather();
  const current_weather_data = use(currentWeather);
  const initialTimestamp = Date.now();
  return (
    <Card className="relative h-full flex w-full flex-col justify-between overflow-hidden p-4 md:p-8 xl:row-span-2">
      <div className="flex justify-between text-lg font-semibold">
        <span className="flex items-center gap-x-1">
          <CalendarDaysIcon />
          {convertToDate(current_weather_data.dt, "long")}
        </span>
        <Clock
          initial={initialTimestamp}
          timezone={current_weather_data.timezone}
        />
      </div>
      <div className="text-md mt-2 gap-x-1 flex font-bold">
        <MapPin />
        <span>{current_weather_data.name}</span>
      </div>
      <div className="flex justify-center py-7 text-[6.5rem] font-bold md:py-10">
        {Math.round(
          unit === "celsius"
            ? convertToCelsius(current_weather_data.main.temp)
            : convertToFahrenheit(current_weather_data.main.temp)
        )}
        &deg;
      </div>
      <div className="flex justify-between items-start md:items-center md:flex-row flex-col">
        <span className="flex items-center gap-x-2">
          <IconComponent
            weatherCode={current_weather_data.weather[0].id}
            // x={data.sys.pod}
            className="h-9 w-9"
          />
          <div className="font-semibold">
            {current_weather_data.weather[0].description
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </div>
        </span>
        <div className="flex flex-col gap-2 mt-2 md:mt-0">
          <span className="flex items-center gap-x-2">
            <Thermometer />
            Feels like{" "}
            {Math.round(
              unit === "celsius"
                ? convertToCelsius(current_weather_data.main.feels_like)
                : convertToFahrenheit(current_weather_data.main.feels_like)
            )}
            &deg;
          </span>
        </div>
      </div>
    </Card>
  );
}
