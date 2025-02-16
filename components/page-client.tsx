"use client";

import Navigation from "@/components/navigation";
import CurrentWeather from "@/components/current-weather";
import FiveDayForecast from "@/components/five-day-forecast";
import WeatherWidgets from "@/components/weather-widgets";
import HourlyForecast from "./hourly-forecast";
import WeatherMap from "./weather-map";
import { Suspense } from "react";
import CurrentWeatherSkeleton from "@/components/skeletons/current-weather-skeleton";
import FiveDayForecastSkeleton from "@/components/skeletons/five-day-forecast-skeleton";
import WeatherWidgetsSkeleton from "@/components/skeletons/weather-widgets-skeleton";
import HourlyForecastSkeleton from "@/components/skeletons/hourly-forecast-skeleton";
import AirQualitySkeleton from "@/components/skeletons/air-quality-skeleton";
import AirPollution from "@/components/air-quality";
import OtherLargeCities from "@/components/other-large-cities";

export default function PageClient() {
  return (
    <div className="container p-4 mx-auto">
      <Navigation />
      <div className="grid grid-cols-1 xl:space-x-4 space-y-4 xl:space-y-0 xl:grid-cols-4">
        <div className="grid grid-rows-[auto_1fr] gap-4  xl:col-span-1">
          <Suspense fallback={<CurrentWeatherSkeleton />}>
            <CurrentWeather />
          </Suspense>
          <Suspense fallback={<FiveDayForecastSkeleton />}>
            <FiveDayForecast />
          </Suspense>
        </div>
        <section className="grid h-full grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 xl:col-span-3">
          <Suspense fallback={<AirQualitySkeleton />}>
            <AirPollution className="order-2 lg:order-3 xl:order-2" />
          </Suspense>
          <Suspense fallback={<WeatherWidgetsSkeleton />}>
            <WeatherWidgets />
          </Suspense>

          <Suspense fallback={<HourlyForecastSkeleton />}>
            <HourlyForecast />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <WeatherMap />
          </Suspense>
          <OtherLargeCities />
        </section>
      </div>
    </div>
  );
}
