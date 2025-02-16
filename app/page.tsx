import {
  getAirQualityData,
  getCurrentWeatherData,
  getHourlyWeatherData,
  getUVIndexData,
} from "@/actions/open-weather-actions";
import PageClient from "@/components/page-client";
import { WeatherProvider } from "@/context/weather-provider";
import { DEFAULT_LOCATION } from "@/lib/config";
import { Suspense } from "react";

export default async function Home() {
  const current_weather = getCurrentWeatherData({
    lat: DEFAULT_LOCATION.coord.lat,
    lon: DEFAULT_LOCATION.coord.lon,
  });
  const hourly_data = getHourlyWeatherData({
    lat: DEFAULT_LOCATION.coord.lat,
    lon: DEFAULT_LOCATION.coord.lon,
  });
  const air_pollution = getAirQualityData({
    lat: DEFAULT_LOCATION.coord.lat,
    lon: DEFAULT_LOCATION.coord.lon,
  });
  const uv_index = getUVIndexData({
    lat: DEFAULT_LOCATION.coord.lat,
    lon: DEFAULT_LOCATION.coord.lon,
  });

  return (
    <Suspense>
      <WeatherProvider
        current_weather={current_weather}
        hourly_data={hourly_data}
        air_pollution={air_pollution}
        uv_index={uv_index}
      >
        <PageClient />
      </WeatherProvider>
    </Suspense>
  );
}
