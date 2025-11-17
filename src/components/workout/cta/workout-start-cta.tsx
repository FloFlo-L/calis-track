"use client";

import { Button } from "@/components/ui/button";
import { useWorkoutEdit } from "@/contexts/workout-edit-context";
import { Play } from "lucide-react";

export default function WorkoutStartCta() {
  const { isEditMode } = useWorkoutEdit();
  return (
    <div className="fixed bottom-0 left-0 right-0 z-90 bg-card border-t border-border px-4">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        <Button
          size="lg"
          className="w-full cursor-pointer"
          disabled={isEditMode}
        >
          <Play className="h-6 w-6 fill-current" />
          Start workout
        </Button>
      </div>
    </div>
  );
}
