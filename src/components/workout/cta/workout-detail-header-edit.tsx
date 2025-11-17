"use client";

import { Button } from "@/components/ui/button";
import { useWorkoutEdit } from "@/contexts/workout-edit-context";
import { Check, Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation";
import WorkoutDeleteCta from "./workout-delete-cta";

interface WorkoutDetailHeaderEditProps {
  workoutId: string;
}

export default function WorkoutDetailHeaderEdit({
  workoutId,
}: WorkoutDetailHeaderEditProps) {
  const router = useRouter();
  const { isEditMode, isSaving, handleSave, handleCancel } = useWorkoutEdit();

  const handleEdit = () => {
    router.push(`/dashboard/workout/${workoutId}?edit=true`);
  };

  if (isEditMode) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCancel}
          className="cursor-pointer"
          disabled={isSaving}
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSave}
          disabled={isSaving}
          className="cursor-pointer"
        >
          <Check className="h-5 w-5 text-primary" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleEdit}
        className="cursor-pointer"
      >
        <Pencil className="h-4 w-4 text-primary" />
      </Button>
      <WorkoutDeleteCta workoutId={workoutId} />
    </div>
  );
}
