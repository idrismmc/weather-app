import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function HourlyForecastSkeleton() {
  return (
    <Card className="order-first col-span-2 flex h-48 cursor-grab select-none flex-row items-center justify-between gap-12 overflow-x-scroll p-6 [&::-webkit-scrollbar]:hidden">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex h-full flex-col justify-between">
          <div className="flex justify-center text-xs md:text-sm text-nowrap">
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex h-full items-center justify-center">
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          <div className="flex justify-center">
            <Skeleton className="h-4 w-8" />
          </div>
        </div>
      ))}
    </Card>
  )
} 