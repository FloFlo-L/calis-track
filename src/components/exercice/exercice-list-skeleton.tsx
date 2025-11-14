import { Skeleton } from "@/components/ui/skeleton";

export function ExerciseListSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="w-full flex items-center gap-4 p-4 rounded-xl border border-border"
        >
          <Skeleton className="w-20 h-20 rounded-lg shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-6 w-16 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
