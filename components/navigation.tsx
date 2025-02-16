"use client";

import { Search } from "@/components/search";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWeather } from "@/hooks/use-weather";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { DEFAULT_LOCATION } from "@/lib/config";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const { unit, setUnit, setLatAndLng, refreshWeatherData } = useWeather();
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");

  const router = useRouter();

  return (
    <section className="flex w-full flex-col lg:flex-row items-center justify-between py-4 gap-y-4">
      <h1 className="text-2xl font-bold lg:hidden block">Weather App</h1>

      <div className="flex lg:flex-row items-center flex-col lg:gap-x-2 gap-y-2 lg:gap-y-0 w-full lg:w-1/4">
        <Button
          className={cn(!lat ? "hidden" : "")}
          onClick={() => {
            router.push("/");
            if ("geolocation" in navigator) {
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
                () => {
                  // Default fallback coordinates if permission denied or error
                  setLatAndLng({
                    lat: DEFAULT_LOCATION.coord.lat,
                    lng: DEFAULT_LOCATION.coord.lon,
                  }); // New York coordinates
                  refreshWeatherData({
                    lat: DEFAULT_LOCATION.coord.lat,
                    lng: DEFAULT_LOCATION.coord.lon,
                  });
                }
              );
            } else {
              // Fallback for browsers that don't support geolocation
              setLatAndLng({
                lat: DEFAULT_LOCATION.coord.lat,
                lng: DEFAULT_LOCATION.coord.lon,
              });
              refreshWeatherData({
                lat: DEFAULT_LOCATION.coord.lat,
                lng: DEFAULT_LOCATION.coord.lon,
              });
            }
          }}
        >
          Back
        </Button>
        <Search />
      </div>
      <h1 className="text-2xl font-bold hidden lg:block">Weather App</h1>
      <div className="lg:max-w-[18.75%] w-full">
        <Select
          value={unit}
          onValueChange={(value) => {
            setUnit(value);
            localStorage.setItem("unitPreference", value); // Save the preference to local storage
          }}
        >
          <SelectTrigger className="w-full text-muted-foreground text-xs md:text-sm">
            <SelectValue placeholder="Select Unit..." />
          </SelectTrigger>
          <SelectContent align="center">
            <SelectItem value="fahrenheit" className="text-xs md:text-sm">
              Fahrenheit
            </SelectItem>
            <SelectItem value="celsius" className="text-xs md:text-sm">
              Celsius
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}
