"use client";

import { HourlyWeatherData } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  convertToCelsius,
  convertToDate,
  convertToFahrenheit,
} from "@/lib/utils";
import IconComponent from "@/components/icon-component";
import { Separator } from "@/components/ui/separator";
import { TemperatureRange } from "@/components/temperature-range";
import { CalendarDaysIcon, Droplet } from "lucide-react";
import { useWeather } from "@/hooks/use-weather";
import { use, useCallback, useEffect, useState } from "react";

export default function FiveDayForecast() {
  const { hourlyData } = useWeather();
  const hourly_data = use(hourlyData);
  const { unit } = useWeather();

  const filteredData = hourly_data.list.reduce(
    (acc: HourlyWeatherData[][], item) => {
      const date = new Date(item.dt * 1000);
      const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

      const existingDayIndex = acc.findIndex((dayData) => {
        const firstItemDate = new Date(dayData[0].dt * 1000);
        return (
          firstItemDate.toLocaleDateString("en-US", { weekday: "long" }) ===
          dayName
        );
      });

      if (existingDayIndex >= 0) {
        acc[existingDayIndex].push(item);
      } else {
        acc.push([item]);
      }
      return acc;
    },
    []
  );

  const [minTemperature, setMinTemperature] = useState(0);
  const [maxTemperature, setMaxTemperature] = useState(0);

  useEffect(() => {
    unit === "celsius"
      ? setMinTemperature(
          Math.min(
            ...filteredData.map((dayData) =>
              Math.min(
                ...dayData.map((item) => convertToCelsius(item.main.temp))
              )
            )
          )
        )
      : setMinTemperature(
          Math.min(
            ...filteredData.map((dayData) =>
              Math.min(
                ...dayData.map((item) => convertToFahrenheit(item.main.temp))
              )
            )
          )
        );
    unit === "celsius"
      ? setMaxTemperature(
          Math.max(
            ...filteredData.map((dayData) =>
              Math.max(
                ...dayData.map((item) => convertToCelsius(item.main.temp))
              )
            )
          )
        )
      : setMaxTemperature(
          Math.max(
            ...filteredData.map((dayData) =>
              Math.max(
                ...dayData.map((item) => convertToFahrenheit(item.main.temp))
              )
            )
          )
        );
  }, [filteredData, unit]);

  const getTemperatureValues = useCallback(
    (dayData: HourlyWeatherData[]) => {
      const minTemp = Math.min(
        ...dayData.map((item) =>
          unit === "celsius"
            ? convertToCelsius(item.main.temp_min)
            : convertToFahrenheit(item.main.temp_min)
        )
      );
      const maxTemp = Math.max(
        ...dayData.map((item) =>
          unit === "celsius"
            ? convertToCelsius(item.main.temp_max)
            : convertToFahrenheit(item.main.temp_max)
        )
      );
      return [minTemp, maxTemp];
    },
    [unit]
  );

  return (
    <>
      <Card className="h-full shrink-0 xl:row-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDaysIcon className="h-4 w-4" />
            Day Forecast
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-base font-normal md:mb-1">
          {filteredData.slice(0, 5).map((dayData: HourlyWeatherData[], i) => (
            <div key={dayData[0].dt} className="flex flex-col gap-y-2">
              <div className="flex w-full flex-row items-center justify-between gap-2 last:mb-0">
                <p className="min-w-[3rem] font-medium">
                  {i === 0 ? "Today" : convertToDate(dayData[0].dt, "short")}
                </p>
                <IconComponent
                  weatherCode={dayData[0].weather[0].id}
                  className=" h-8 w-8"
                />
                <div className="flex w-[60%] select-none flex-row items-center justify-between text-xs md:text-sm space-x-2">
                  <p className="flex justify-start">
                    {Math.floor(
                      Math.min(
                        ...dayData.map((item) =>
                          unit === "celsius"
                            ? convertToCelsius(item.main.temp_min)
                            : convertToFahrenheit(item.main.temp_min)
                        )
                      )
                    )}
                    &deg;
                  </p>
                  <TemperatureRange
                    min={minTemperature}
                    max={maxTemperature}
                    value={getTemperatureValues(dayData)}
                    className="mt-1"
                  />

                  <p className="flex justify-end ">
                    {Math.floor(
                      Math.max(
                        ...dayData.map((item) =>
                          unit === "celsius"
                            ? convertToCelsius(item.main.temp_max)
                            : convertToFahrenheit(item.main.temp_max)
                        )
                      )
                    )}
                    &deg;
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>
                  {dayData[0].weather[0].description
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </span>
                <span className="flex items-center gap-x-1">
                  {" "}
                  <Droplet className="h-4 w-4" />
                  {dayData[0].main.humidity}%
                </span>
              </div>
              {i !== 4 && <Separator className="mt-3" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
