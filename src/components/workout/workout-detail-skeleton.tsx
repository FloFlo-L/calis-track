import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function WorkoutDetailSkeleton() {
  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      {/* CTA Button Skeleton */}
      {/* <Skeleton className="h-10 w-full rounded-md" /> */}

      {/* Exercise List Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-24" />
        <div className="space-y-3">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="py-4">
              <CardContent className="px-4">
                <div className="flex gap-3">
                  <Skeleton className="size-18 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-6 w-1/3" />
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-4 w-14" />
                      <Skeleton className="h-4 w-14" />
                    </div>
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
