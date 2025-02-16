import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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

export default function WeatherWidgetsSkeleton() {
  return (
    <>
      <Card className="order-3 flex h-48 flex-col justify-between lg:order-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sunset className="h-4 w-4" />
            Sunset
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-6 w-24" />
        </CardContent>
        <CardFooter className="text-muted-foreground text-xs md:text-sm">
          <Skeleton className="h-4 w-32" />
        </CardFooter>
      </Card>
      <Card className="order-4 h-48 xl:order-3">
        <CardHeader className="-mb-2 md:mb-0">
          <CardTitle className="flex items-center gap-2">
            <Wind className="h-4 w-4" />
            Wind
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center p-0">
          <Skeleton className="h-24 w-24 rounded-full" />
        </CardContent>
      </Card>
      {[
        { icon: Sun, title: "UV Index" },
        { icon: CloudRainIcon, title: "Precipitation" },
        { icon: Thermometer, title: "Feels like" },
        { icon: Droplet, title: "Humidity" },
        { icon: Eye, title: "Visibility" },
        { icon: Gauge, title: "Pressure" },
      ].map((widget, index) => (
        <Card
          key={index}
          className={`order-${index + 5} flex h-48 flex-col justify-between`}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <widget.icon className="h-4 w-4" />
              {widget.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-6 w-24" />
          </CardContent>
          <CardFooter className="text-xs md:text-sm text-muted-foreground">
            <Skeleton className="h-4 w-48" />
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
