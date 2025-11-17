"use client";

import { useWorkoutEdit } from "@/contexts/workout-edit-context";
import { Input } from "@/components/ui/input";
import React from "react";

interface WorkoutDetailHeaderClientProps {
  initialTitle: string;
}

export default function WorkoutDetailHeaderClient({
  initialTitle,
}: WorkoutDetailHeaderClientProps) {
  const { isEditMode } = useWorkoutEdit();
  const [title, setTitle] = React.useState(initialTitle);

  // Sync title with window for access by save handler
  React.useEffect(() => {
    interface WindowWithTitle extends Window {
      __workoutEditTitle?: string;
    }
    (window as WindowWithTitle).__workoutEditTitle = title;
  }, [title]);

  // Reset title when exiting edit mode
  React.useEffect(() => {
    if (!isEditMode) {
      setTitle(initialTitle);
    }
  }, [isEditMode, initialTitle]);

  if (isEditMode) {
    return (
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-lg font-bold flex-1 text-center px-4 h-auto border-0 focus-visible:ring-1 focus-visible:ring-offset-0"
        placeholder="Titre du workout"
      />
    );
  }

  return (
    <h2 className="text-lg font-bold flex-1 text-center px-4 text-balance">
      {initialTitle}
    </h2>
  );
}
