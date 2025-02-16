"use client";

import {
  getAirQualityData,
  getCurrentWeatherData,
  getHourlyWeatherData,
  getUVIndexData,
} from "@/actions/open-weather-actions";
import { DEFAULT_LOCATION } from "@/lib/config";
import {
  AirQualityData,
  CurrentWeatherData,
  HourlyForecastData,
  UVIndexData,
} from "@/lib/types";
import { useSearchParams } from "next/navigation";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";

interface WeatherProviderType {
  latAndLng: { lat: number; lng: number };
  city: string;
  unit: string;
  currentWeather: Promise<CurrentWeatherData>;
  hourlyData: Promise<HourlyForecastData>;
  airQuality: Promise<AirQualityData>;
  uvIndex: Promise<UVIndexData>;
  pinnedLocations: {
    coords: { lat: number; lng: number };
    place_id: string;
    description: string;
  }[];
  setPinnedLocations: Dispatch<
    SetStateAction<
      {
        coords: { lat: number; lng: number };
        place_id: string;
        description: string;
      }[]
    >
  >;
  setLatAndLng: Dispatch<SetStateAction<{ lat: number; lng: number }>>;
  setCity: Dispatch<SetStateAction<string>>;
  setUnit: Dispatch<SetStateAction<string>>;
  refreshWeatherData: (coord: { lat: number; lng: number }) => void;
}

export const WeatherContext = createContext<WeatherProviderType | undefined>(
  undefined
);

export const WeatherProvider = ({
  current_weather,
  hourly_data,
  air_pollution,
  uv_index,
  children,
}: {
  current_weather: Promise<CurrentWeatherData>;
  hourly_data: Promise<HourlyForecastData>;
  air_pollution: Promise<AirQualityData>;
  uv_index: Promise<UVIndexData>;
  children: React.ReactNode;
}) => {
  const searchParams = useSearchParams();
  const [latAndLng, setLatAndLng] = useState<{ lat: number; lng: number }>({
    lat: DEFAULT_LOCATION.coord.lat,
    lng: DEFAULT_LOCATION.coord.lon,
  });
  const [pinnedLocations, setPinnedLocations] = useState<
    {
      coords: { lat: number; lng: number };
      place_id: string;
      description: string;
    }[]
  >([]);
  const [city, setCity] = useState<string>("Coimbatore");
  const [unit, setUnit] = useState<string>("celsius");
  const [airQuality, setAirQuality] =
    useState<Promise<AirQualityData>>(air_pollution);
  const [uvIndex, setUvIndex] = useState<Promise<UVIndexData>>(uv_index);
  const [hourlyData, setHourlyData] =
    useState<Promise<HourlyForecastData>>(hourly_data);
  const [currentWeather, setCurrentWeather] =
    useState<Promise<CurrentWeatherData>>(current_weather);
  const refreshWeatherData = (coord: { lat: number; lng: number }) => {
    setCurrentWeather(
      getCurrentWeatherData({
        lat: coord.lat,
        lon: coord.lng,
      })
    );
    setHourlyData(
      getHourlyWeatherData({
        lat: coord.lat,
        lon: coord.lng,
      })
    );
    setAirQuality(
      getAirQualityData({
        lat: coord.lat,
        lon: coord.lng,
      })
    );
    setUvIndex(
      getUVIndexData({
        lat: coord.lat,
        lon: coord.lng,
      })
    );
  };

  useEffect(() => {
    const savedPinnedLocations = localStorage.getItem("pinnedLocations");
    if (savedPinnedLocations) {
      setPinnedLocations(JSON.parse(savedPinnedLocations));
    }
  }, []);

  useEffect(() => {
    // Check if there's a saved unit preference in local storage
    const savedUnit = localStorage.getItem("unitPreference");
    if (savedUnit) {
      setUnit(savedUnit);
    }

    // Request user's location
    const lat = searchParams?.get("lat");
    const lng = searchParams?.get("lng");

    if (lat && lng) {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);

      if (!isNaN(latitude) && !isNaN(longitude)) {
        setLatAndLng({ lat: latitude, lng: longitude });
        refreshWeatherData({ lat: latitude, lng: longitude });
      }
    } else if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatAndLng({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          refreshWeatherData({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log("Geolocation error or permission denied:", error);
        }
      );
    }
  }, [searchParams]);

  return (
    <WeatherContext.Provider
      value={{
        latAndLng,
        setLatAndLng,
        city,
        setCity,
        unit,
        setUnit,
        currentWeather,
        hourlyData,
        airQuality,
        uvIndex,
        pinnedLocations,
        setPinnedLocations,
        refreshWeatherData,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
