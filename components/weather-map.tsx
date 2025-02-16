"use client";

import { useEffect, useMemo, useState } from "react";
import ReactMapGL, { Layer, Source, LayerProps } from "react-map-gl/maplibre";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import { DEFAULT_LOCATION } from "@/lib/config";
import { useTheme } from "next-themes";
import { useWeather } from "@/hooks/use-weather";

const OPENWEATHERMAP_TOKEN = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

const weatherLayer = {
  id: "weather",
  type: "raster" as const,
  source: "weather",
  minzoom: 0,
  maxzoom: 22,
  paint: {
    "raster-opacity": 1,
    "raster-brightness-min": 0,
    "raster-brightness-max": 1,
    "raster-saturation": 0.8,
    "raster-contrast": 0.6,
  },
};

export default function WeatherMap() {
  const { theme } = useTheme();
  const { latAndLng } = useWeather();
  const MapTheme = useMemo(() => {
    return theme === "system"
      ? window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;
  }, [theme]);

  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  const [defaultLat, defaultLon] = useMemo(() => {
    const latNumber = lat ? Number(lat) : latAndLng.lat;
    const lonNumber = lon ? Number(lon) : latAndLng.lng;
    return [latNumber, lonNumber];
  }, [lat, lon, latAndLng]);

  const weatherTiles = useMemo(() => {
    return [
      { label: "Cloudiness", code: "clouds_new" },
      { label: "Precipitation", code: "precipitation_new" },
      { label: "Wind Speed", code: "wind_new" },
      { label: "Temperature", code: "temp_new" },
    ];
  }, []);

  const [viewport, setViewport] = useState({
    latitude: lat ? Number(lat) : Number(defaultLat),
    longitude: lon ? Number(lon) : Number(defaultLon),
    zoom: 7,
  });

  const [MapCode, setMapCode] = useState("precipitation_new");

  useEffect(() => {
    setViewport((prevViewport) => ({
      ...prevViewport,
      latitude: lat ? Number(lat) : Number(defaultLat),
      longitude: lon ? Number(lon) : Number(defaultLon),
    }));
  }, [lat, lon, defaultLat, defaultLon]);

  return (
    <Card className="relative order-11 col-span-2 h-[25rem] overflow-hidden overscroll-contain  p-0 md:p-0 xl:col-span-3">
      <div className="absolute right-0 z-10 m-2">
        <Select value={MapCode} onValueChange={setMapCode}>
          <SelectTrigger aria-label="Map layer" className="w-fit bg-background">
            <SelectValue placeholder="Map Layers" />
          </SelectTrigger>
          <SelectContent align="center">
            <SelectGroup>
              {weatherTiles.map((tile) => (
                <SelectItem key={tile.code} value={tile.code}>
                  {tile.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <ReactMapGL
        reuseMaps
        {...viewport}
        style={{ width: "100%", height: "100%" }}
        attributionControl={false}
        mapStyle={
          MapTheme === "dark"
            ? "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
            : "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        }
      >
        <Source
          id="weather"
          type="raster"
          tiles={[
            `https://tile.openweathermap.org/map/${MapCode}/{z}/{x}/{y}.png?appid=${OPENWEATHERMAP_TOKEN}`,
          ]}
        >
          <Layer {...weatherLayer} />
        </Source>
      </ReactMapGL>
    </Card>
  );
}
