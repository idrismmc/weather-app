import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDaysIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function FiveDayForecastSkeleton() {
  return (
    <Card className="h-full shrink-0 xl:row-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarDaysIcon className="h-4 w-4" />
          5-Day Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-base font-normal md:mb-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex flex-col gap-y-2">
            <div className="flex w-full flex-row items-center justify-between gap-2 last:mb-0">
              <Skeleton className="min-w-[3rem] h-[24px]" />
              <Skeleton className="h-8 w-8" />
              <div className="flex w-[60%] select-none flex-row items-center justify-between text-xs md:text-sm">
                <Skeleton className="h-[18px] w-[24px]" />
                <Skeleton className="h-[4px] w-[120px]" />
                <Skeleton className="h-[18px] w-[24px]" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-[20px] w-[140px]" />
              <Skeleton className="h-[20px] w-[120px]" />
            </div>
            {i !== 4 && <Separator className="mt-3" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
