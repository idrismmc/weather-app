import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDaysIcon, MapPin, Thermometer } from "lucide-react";

export default function CurrentWeatherSkeleton() {
  return (
    <Card className="relative h-full flex w-full flex-col justify-between overflow-hidden p-4 md:p-8 xl:row-span-2">
      <div>
        <div className="flex justify-between text-lg font-semibold">
          <span className="flex items-center gap-x-1">
            <CalendarDaysIcon />
            <Skeleton className="w-[100px] h-[24px]" />
          </span>
          <Skeleton className="w-[100px] h-[24px]" />
        </div>
        <div className="text-md mt-2 gap-x-1 flex font-bold">
          <MapPin />
          <Skeleton className="w-[120px] h-[24px]" />
        </div>
      </div>
      <div className="flex justify-center py-7 text-8xl font-bold md:py-10">
        <Skeleton className="w-[200px] h-[120px]" />
      </div>
      <div className="flex justify-between items-start md:items-center md:flex-row flex-col">
        <span className="flex items-center gap-x-2">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="w-[110px] h-[24px]" />
        </span>
        <div className="flex flex-col gap-2 mt-2 md:mt-0">
          <span className="flex items-center gap-x-2">
            <Thermometer />
            <Skeleton className="w-[80px] h-[24px]" />
          </span>
        </div>
      </div>
    </Card>
  );
}
