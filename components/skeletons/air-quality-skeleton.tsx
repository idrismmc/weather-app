import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AirQualityIcon } from "@/components/custom-icons"

export default function AirQualitySkeleton() {
  return (
    <Card className="order-2 col-span-2 flex h-48 flex-col justify-between">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AirQualityIcon />
          Air pollution
        </CardTitle>
      </CardHeader>
      <CardContent className="my-auto">
        <Skeleton className="h-4 w-full" /> {/* Progress bar placeholder */}
      </CardContent>
      <CardFooter className="text-xs md:text-sm text-muted-foreground">
        <Skeleton className="h-4 w-32" /> {/* Text description placeholder */}
      </CardFooter>
    </Card>
  )
} 