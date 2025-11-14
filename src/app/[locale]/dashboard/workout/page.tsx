import { Button } from "@/components/ui/button";
import { BicepsFlexed, Plus } from "lucide-react";
import Link from "next/link";

export default function WorkoutPage() {
  return (
    <div className="min-h-screen pb-20 bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border h-[68px]">
        <div className="max-w-lg mx-auto p-4 flex items-center h-full">
          <h1 className="text-xl font-bold flex-1">My workouts</h1>
        </div>
      </div>

      {/* Empty workouts */}
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
    </div>
  );
}
