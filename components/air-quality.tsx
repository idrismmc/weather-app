import React, { use } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ClassNameValue } from "tailwind-merge";
import { AirQualityIcon } from "@/components/custom-icons";
import { useWeather } from "@/hooks/use-weather";

interface AirQualityProps {
  className?: ClassNameValue;
}

export default function AirQuality({ className }: AirQualityProps) {
  const { airQuality } = useWeather();
  const airQualityData = use(airQuality);
  return (
    <Card
      className={cn(
        "order-2 col-span-2 flex h-48 flex-col justify-between",
        className
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AirQualityIcon />
          Air pollution
        </CardTitle>
      </CardHeader>
      <CardContent className="my-auto">
        <Progress
          aria-label="Air pollution"
          value={airQualityData.list[0].components.pm2_5 * 10}
        />
      </CardContent>
      <CardFooter className="text-xs md:text-sm text-muted-foreground">
        <p>
          {airQualityData.list[0].components.pm2_5 < 50
            ? "Air quality is good."
            : airQualityData.list[0].components.pm2_5 < 100
            ? "Air quality is moderate."
            : airQualityData.list[0].components.pm2_5 < 150
            ? "Air quality is unhealthy for sensitive groups."
            : airQualityData.list[0].components.pm2_5 < 200
            ? "Air quality is unhealthy."
            : airQualityData.list[0].components.pm2_5 < 300
            ? "Air quality is very unhealthy."
            : "Air quality is hazardous."}
        </p>
      </CardFooter>
    </Card>
  );
}
