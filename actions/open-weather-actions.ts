"use server";

import {
  AirQualityData,
  HourlyForecastData,
  UVIndexData,
  CurrentWeatherData,
} from "@/lib/types";
export const getAirQualityData = async ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}): Promise<AirQualityData> => {
  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  if (!API_KEY) {
    throw new Error("API key not found");
  }
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
      {
        next: {
          revalidate: 1800,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data: AirQualityData = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch");
  }
};

export const getCurrentWeatherData = async ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}): Promise<CurrentWeatherData> => {
  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  if (!API_KEY) {
    throw new Error("API key not found");
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&_=${Date.now()}`,
    {
      next: {
        revalidate: 1800,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  const data: CurrentWeatherData = await response.json();
  return data;
};

export const getHourlyWeatherData = async ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}): Promise<HourlyForecastData> => {
  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  if (!API_KEY) {
    throw new Error("API key not found");
  }
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
      {
        next: {
          revalidate: 1800,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data: HourlyForecastData = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch");
  }
};

export const getUVIndexData = async ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}): Promise<UVIndexData> => {
  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  if (!API_KEY) {
    throw new Error("API key not found");
  }
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`,
      {
        next: {
          revalidate: 1800,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data: UVIndexData = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch");
  }
};
