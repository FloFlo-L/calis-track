"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWorkoutEdit } from "@/contexts/workout-edit-context";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  BicepsFlexed,
  ClockFading,
  GripVertical,
  Repeat,
  Trash,
} from "lucide-react";
import Image from "next/image";
import React from "react";

interface WorkoutExercise {
  id: string;
  exerciseId: string;
  position: number;
  sets: number;
  reps: number;
  restTime: number;
  exercise: {
    exerciseLangs?: Array<{ name: string }>;
    images?: string[];
  };
}

interface WorkoutExerciseCardProps {
  workoutExercise: WorkoutExercise;
  onDelete?: () => void;
  onEdit?: () => void;
}

export default function WorkoutExerciseCard({
  workoutExercise,
  onDelete,
  onEdit,
}: WorkoutExerciseCardProps) {
  const { isEditMode } = useWorkoutEdit();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: workoutExercise.id,
    disabled: !isEditMode,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: isDragging ? "relative" : undefined,
    zIndex: isDragging ? 9999 : undefined,
  };

  const exerciseName =
    workoutExercise.exercise.exerciseLangs?.[0]?.name || "Exercise";
  const exerciseImage =
    workoutExercise.exercise.images?.[0] || "placeholder.svg";

  const cardContent = (
    <div className="flex gap-3 items-center">
      {isEditMode && (
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing touch-none"
        >
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>
      )}
      <div
        className={`flex gap-3 flex-1 ${isEditMode ? "cursor-pointer" : ""}`}
        onClick={() => isEditMode && onEdit?.()}
      >
        {!isEditMode && (
          <div className="relative w-18 h-18 rounded-lg border border-primary/20 shrink-0">
            <Image
              src={`/${exerciseImage}`}
              alt={exerciseName}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold mb-1 text-primary truncate">
            {exerciseName}
          </h4>
          <div className="text-sm text-muted-foreground flex items-center gap-6 mb-2">
            <span className="flex items-center gap-1">
              <BicepsFlexed size={14} />
              {workoutExercise.reps} reps
            </span>
            <span className="flex items-center gap-1">
              <Repeat size={14} />
              {workoutExercise.sets} sets
            </span>
          </div>
          <span className="text-xs text-muted-foreground flex items-center gap-1 italic">
            <ClockFading size={12} />
            {workoutExercise.restTime}s rest between sets
          </span>
        </div>
      </div>
      {isEditMode && (
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          className="cursor-pointer mr-3"
        >
          <Trash className="h-4 w-4 text-destructive" />
        </Button>
      )}
    </div>
  );

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`py-4 ${isEditMode ? "border-primary border-dashed" : ""}`}
    >
      <CardContent className="px-4">{cardContent}</CardContent>
    </Card>
  );
}
