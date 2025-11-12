import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
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

      <div className="flex-1 flex items-center justify-center">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/workout/create">
            <CirclePlus className="size-12" strokeWidth={1.8} />
          </Link>
        </Button>
      </div>
    </div>
  );
}
