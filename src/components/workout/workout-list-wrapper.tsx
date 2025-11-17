import { getUserWorkouts } from "@/app/actions/workout";
import { Button } from "@/components/ui/button";
import { BicepsFlexed, Plus } from "lucide-react";
import Link from "next/link";
import WorkoutList from "./workout-list";

export default async function WorkoutListWrapper() {
  const result = await getUserWorkouts();
  const workouts = result.data || [];

  if (workouts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-20 max-w-lg mx-auto h-[calc(100vh-170px)]">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <BicepsFlexed className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-xl font-bold mb-2 text-center">
          You have no workouts yet
        </h2>
        <p className="text-muted-foreground text-center mb-8 text-balance">
          Start creating your first workout
        </p>
        <Button
          size="icon-lg"
          className="bg-primary text-primary-foreground rounded-full"
          asChild
        >
          <Link href="/dashboard/workout/create">
            <Plus className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="">
        <WorkoutList workouts={workouts} />
      </div>

      {/* CTA to create a new workout */}
      <Button
        size="icon-lg"
        className="fixed bottom-22 right-4 bg-primary text-primary-foreground rounded-full shadow-lg"
        asChild
      >
        <Link href="/dashboard/workout/create">
          <Plus className="h-5 w-5" />
        </Link>
      </Button>
    </>
  );
}
