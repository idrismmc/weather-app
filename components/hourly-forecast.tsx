"use client";
import { HourlyWeatherData } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { useRef, useState } from "react";
import IconComponent from "@/components/icon-component";
import {
  convertToCelsius,
  convertToDate,
  convertToFahrenheit,
  extractHoursFromDate,
} from "@/lib/utils";
import { useWeather } from "@/hooks/use-weather";
import { use } from "react";

export default function HourlyForecast() {
  const { hourlyData } = useWeather();
  const hourly_data = use(hourlyData);
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!ref.current) return;
    setIsDragging(true);
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const difference = x - startX;
    ref.current.scrollLeft = scrollLeft - difference;
  };
  const { unit } = useWeather();

  return (
    <>
      <Card
        ref={ref}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        className={`order-first col-span-2 flex h-48 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        } select-none flex-row items-center justify-between gap-12 overflow-x-scroll p-6 [&::-webkit-scrollbar]:hidden`}
      >
        {hourly_data.list.slice(0, 8).map((item: HourlyWeatherData, i) => (
          <div key={item.dt} className="flex h-full flex-col justify-between">
            <div className="flex justify-center text-xs md:text-sm text-nowrap">
              {i === 0
                ? "Now"
                : `${convertToDate(item.dt, "short")} ${
                    extractHoursFromDate(item.dt) % 12 || 12
                  }${extractHoursFromDate(item.dt) >= 12 ? " PM" : " AM"}`}
            </div>
            <div className="flex h-full items-center justify-center">
              <IconComponent
                weatherCode={item.weather[0].id}
                x={item.sys.pod}
                className="h-8 w-8"
              />
            </div>
            <div className="flex justify-center">
              {unit === "celsius"
                ? Math.floor(convertToCelsius(item.main.temp))
                : Math.floor(convertToFahrenheit(item.main.temp))}
              &deg;
            </div>
          </div>
        ))}
      </Card>
    </>
  );
}
