"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Compass from "@/components/compass";
import {
  convertToCelsius,
  convertToFahrenheit,
  formatSunTimeWithAMPM,
} from "@/lib/utils";
import {
  CloudRainIcon,
  Droplet,
  Eye,
  Gauge,
  Sun,
  Sunset,
  Thermometer,
  Wind,
} from "lucide-react";
import { useWeather } from "@/hooks/use-weather";
import { use } from "react";

export default function WeatherWidgets() {
  const { unit } = useWeather();
  const { hourlyData, uvIndex } = useWeather();
  const hourly_data = use(hourlyData);
  const uvIndexForTodayData = use(uvIndex);
  return (
    <>
      <Card className="order-2 flex h-48 flex-col justify-between lg:order-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sunset className="h-4 w-4" />
            Sunset
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            {formatSunTimeWithAMPM(
              hourly_data.city.sunset,
              hourly_data.city.timezone
            )}
          </p>
        </CardContent>
        <CardFooter className="text-muted-foreground text-xs md:text-sm">
          <p>
            Sunrise -{" "}
            {formatSunTimeWithAMPM(
              hourly_data.city.sunrise,
              hourly_data.city.timezone
            )}
          </p>
        </CardFooter>
      </Card>
      <Card className="order-4 h-48 lg:order-3">
        <CardHeader className="-mb-2 md:mb-0">
          <CardTitle className="flex items-center gap-2">
            <Wind className="h-4 w-4" />
            Wind
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center p-0">
          <Compass
            speed={hourly_data.list[0].wind.speed}
            deg={hourly_data.list[0].wind.deg}
          />
        </CardContent>
      </Card>
      <Card className="order-5 flex h-48 flex-col justify-between">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            UV Index
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">
            {Math.round(uvIndexForTodayData.daily.uv_index_max[0])}
            <br></br>
            {uvIndexForTodayData.daily.uv_index_max[0] <= 2
              ? "Low"
              : uvIndexForTodayData.daily.uv_index_max[0] <= 5
              ? "Moderate"
              : uvIndexForTodayData.daily.uv_index_max[0] <= 7
              ? "High"
              : "Very High"}
          </p>
          <Progress
            aria-label="UV Index"
            value={uvIndexForTodayData.daily.uv_index_max[0] * 10}
          />
        </CardContent>
        <CardFooter className="text-xs md:text-sm text-muted-foreground">
          <p>
            {uvIndexForTodayData.daily.uv_index_max[0] <= 2
              ? "No protection needed."
              : uvIndexForTodayData.daily.uv_index_max[0] <= 5
              ? "Wear sunscreen."
              : "Take precautions."}
          </p>
        </CardFooter>
      </Card>
      <Card className="order-6 flex h-48 flex-col justify-between">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CloudRainIcon className="h-4 w-4" />
            Precipitation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            {hourly_data.list[0].rain?.["1h"] || 0}mm <br></br>in the last 3h
          </p>
        </CardContent>
        <CardFooter className="text-xs md:text-sm text-muted-foreground">
          <p>
            {hourly_data.list[0].rain?.["1h"] !== undefined
              ? hourly_data.list[0].rain["1h"] <= 0.2
                ? "Light rain or drizzle. An umbrella may come in handy."
                : hourly_data.list[0].rain["1h"] <= 2.5
                ? "Moderate rain."
                : "Heavy rain."
              : "Conditions are dry."}
          </p>
        </CardFooter>
      </Card>
      <Card className="order-7 flex h-48 flex-col justify-between">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="h-4 w-4" />
            Feels like
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            {unit === "celsius"
              ? Math.floor(
                  convertToCelsius(hourly_data.list[0].main.feels_like)
                )
              : Math.floor(
                  convertToFahrenheit(hourly_data.list[0].main.feels_like)
                )}
            &deg;
          </p>
        </CardContent>
        <CardFooter className="text-xs md:text-sm text-muted-foreground">
          <p>
            {hourly_data.list[0].main.feels_like < hourly_data.list[0].main.temp
              ? "Feels colder than the actual temperature."
              : hourly_data.list[0].main.feels_like >
                hourly_data.list[0].main.temp
              ? "Feels warmer than the actual temperature."
              : "Feels like the actual temperature."}
          </p>
        </CardFooter>
      </Card>
      <Card className="order-8 flex h-48 flex-col justify-between">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplet className="h-4 w-4" />
            Humidity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{hourly_data.list[0].main.humidity}%</p>
        </CardContent>
        <CardFooter className="text-xs md:text-sm text-muted-foreground">
          <p>
            {hourly_data.list[0].main.humidity < 40
              ? "Low humidity. It might feel dry."
              : hourly_data.list[0].main.humidity < 70
              ? "Moderate humidity. Comfortable conditions."
              : "High humidity. It might feel humid and uncomfortable."}
          </p>
        </CardFooter>
      </Card>
      <Card className="order-9 flex h-48 flex-col justify-between">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Visibility
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{hourly_data.list[0].visibility / 1000} km</p>
        </CardContent>
        <CardFooter className="text-xs md:text-sm text-muted-foreground">
          <p>
            {hourly_data.list[0].visibility >= 10
              ? "It's perfectly clear right now."
              : hourly_data.list[0].visibility >= 5
              ? "Good visibility."
              : "Poor visibility. Exercise caution while driving or moving around."}
          </p>
        </CardFooter>
      </Card>
      <Card className="order-10 flex h-48 flex-col justify-between">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="h-4 w-4" />
            Pressure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{hourly_data.list[0].main.pressure} hPa</p>
        </CardContent>
        <CardFooter className="text-xs md:text-sm text-muted-foreground">
          <p>
            {hourly_data.list[0].main.pressure < 1000
              ? "Low pressure. Expect changes in the weather."
              : hourly_data.list[0].main.pressure >= 1000 &&
                hourly_data.list[0].main.pressure <= 1010
              ? "Normal pressure. Typical weather conditions."
              : "High pressure. Expect stable and clear weather."}
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
