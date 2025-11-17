import { getWorkoutById } from "@/app/actions/workout";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import WorkoutDetailHeaderClient from "./workout-detail-header-client";
import WorkoutDetailHeaderEdit from "./cta/workout-detail-header-edit";

interface WorkoutDetailHeaderProps {
  workoutId: string;
}

export default async function WorkoutDetailHeader({
  workoutId,
}: WorkoutDetailHeaderProps) {
  const result = await getWorkoutById(workoutId);
  const workoutTitle = result.data?.title || "";

  return (
    <div className="sticky top-0 z-10 bg-card border-b border-border">
      <div className="flex items-center justify-between p-4 max-w-lg mx-auto">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/workout">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <WorkoutDetailHeaderClient initialTitle={workoutTitle} />
        <WorkoutDetailHeaderEdit workoutId={workoutId} />
      </div>
    </div>
  );
}
