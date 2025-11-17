import { Skeleton } from "@/components/ui/skeleton";

export default function WorkoutListSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="w-full flex items-center gap-4 p-4 rounded-xl border border-border"
        >
          <div className="space-y-3">
            <Skeleton className="h-6 w-32" />
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-4 w-8" />
            </div>
          </div>
          <Skeleton className="ml-auto h-5 w-20" />
        </div>
      ))}
    </div>
  );
}
