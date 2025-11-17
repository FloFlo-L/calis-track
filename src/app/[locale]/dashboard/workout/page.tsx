import WorkoutListSkeleton from "@/components/workout/workout-list-skeleton";
import WorkoutListWrapper from "@/components/workout/workout-list-wrapper";
import { Suspense } from "react";

export default function WorkoutPage() {
  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border h-[68px]">
        <div className="max-w-lg mx-auto p-4 flex items-center h-full">
          <h1 className="text-xl font-bold flex-1">My workouts</h1>
        </div>
      </div>

      {/* Workout list with Suspense */}
      <div className="px-4 py-6 space-y-6 max-w-lg mx-auto">
        <Suspense fallback={<WorkoutListSkeleton />}>
          <WorkoutListWrapper />
        </Suspense>
      </div>
    </div>
  );
}
