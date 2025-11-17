"use client";

import { updateWorkout } from "@/app/actions/workout";
import { Button } from "@/components/ui/button";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import WorkoutExerciseCard from "./workout-exercise-card";
import WorkoutExerciseEditDrawer from "./workout-exercise-edit-drawer";

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

interface SessionStorageExercise {
  exerciseId: string;
  sets: number;
  reps: number;
  restTime: number;
  position: number;
  name: string;
  image: string;
}

interface WorkoutDetailClientWrapperProps {
  workoutId: string;
  initialData: {
    title: string;
    workoutExercises: WorkoutExercise[];
  };
}

export default function WorkoutDetailClientWrapper({
  workoutId,
  initialData,
}: WorkoutDetailClientWrapperProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get("edit") === "true";

  const [exercises, setExercises] = React.useState<WorkoutExercise[]>(
    initialData.workoutExercises
  );
  const [deletedExerciseIds, setDeletedExerciseIds] = React.useState<string[]>(
    []
  );
  const [editingExercise, setEditingExercise] =
    React.useState<WorkoutExercise | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  // Restore state from sessionStorage on mount (for edit mode)
  React.useEffect(() => {
    if (isEditMode) {
      const savedState = sessionStorage.getItem(`workout-edit-${workoutId}`);
      const newExercises = sessionStorage.getItem("workout-exercises");

      if (savedState) {
        try {
          const parsed = JSON.parse(savedState);

          // Start with saved exercises
          let restoredExercises = parsed.exercises || [];

          // Merge new exercises if any were selected
          if (newExercises) {
            const newExercisesParsed: SessionStorageExercise[] =
              JSON.parse(newExercises);
            const maxPosition = restoredExercises.length;

            const newExercisesToAdd: WorkoutExercise[] = newExercisesParsed.map(
              (ex, index) => ({
                // Temporary ID for new exercises (will be assigned by server)
                id: `new-${Date.now()}-${index}`,
                exerciseId: ex.exerciseId,
                position: maxPosition + index,
                sets: ex.sets,
                reps: ex.reps,
                restTime: ex.restTime,
                exercise: {
                  exerciseLangs: [{ name: ex.name }],
                  images: [ex.image],
                },
              })
            );

            restoredExercises = [...restoredExercises, ...newExercisesToAdd];

            // Clear the new exercises from sessionStorage
            sessionStorage.removeItem("workout-exercises");
          }

          setExercises(restoredExercises);
          setDeletedExerciseIds(parsed.deletedExerciseIds || []);

          // Clear the edit state from sessionStorage
          sessionStorage.removeItem(`workout-edit-${workoutId}`);
        } catch (error) {
          console.error("Error restoring edit state:", error);
        }
      }
    }
  }, [isEditMode, workoutId]);

  // Reset state when exiting edit mode (cancel)
  React.useEffect(() => {
    if (!isEditMode) {
      setExercises(initialData.workoutExercises);
      setDeletedExerciseIds([]);
      setEditingExercise(null);
      // Clean up sessionStorage
      sessionStorage.removeItem(`workout-edit-${workoutId}`);
    }
  }, [isEditMode, initialData.workoutExercises, workoutId]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setExercises((items) => {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const reordered = arrayMove(items, oldIndex, newIndex);
      return reordered.map((item, index) => ({
        ...item,
        position: index,
      }));
    });
  };

  const handleDeleteExercise = (exerciseId: string) => {
    setDeletedExerciseIds((prev) => [...prev, exerciseId]);
    setExercises((prev) =>
      prev
        .filter((ex) => ex.id !== exerciseId)
        .map((item, index) => ({ ...item, position: index }))
    );
  };

  const handleEditExercise = (exercise: WorkoutExercise) => {
    setEditingExercise(exercise);
  };

  const handleSaveExerciseEdit = (data: {
    reps: number;
    sets: number;
    restTime: number;
  }) => {
    if (!editingExercise) return;

    setExercises((prev) =>
      prev.map((ex) => (ex.id === editingExercise.id ? { ...ex, ...data } : ex))
    );
    setEditingExercise(null);
  };

  const handleSaveWorkout = React.useCallback(async () => {
    setIsSaving(true);

    try {
      // Get the edited title from window
      interface WindowWithTitle extends Window {
        __workoutEditTitle?: string;
      }
      const editedTitle = (window as WindowWithTitle).__workoutEditTitle;

      // Separate existing exercises from new ones
      const existingExercises = exercises.filter(
        (ex) => ex.id && !ex.id.startsWith("new-")
      );
      const newExercises = exercises.filter(
        (ex) => ex.id && ex.id.startsWith("new-")
      );

      const result = await updateWorkout({
        workoutId,
        title: editedTitle,
        exercises: existingExercises.map((ex) => ({
          workoutExerciseId: ex.id,
          position: ex.position,
          sets: ex.sets,
          reps: ex.reps,
          restTime: ex.restTime,
        })),
        newExercises: newExercises.map((ex) => ({
          exerciseId: ex.exerciseId,
          position: ex.position,
          sets: ex.sets,
          reps: ex.reps,
          restTime: ex.restTime,
        })),
        deletedExerciseIds,
      });

      if (result.success) {
        toast.success("Workout saved successfully");
        router.push(`/dashboard/workout/${workoutId}`);
      } else {
        toast.error(result.error || "Error updating workout");
      }
    } catch (error) {
      console.error("Error updating workout:", error);
      toast.error("An error occurred while saving the workout");
    } finally {
      setIsSaving(false);
    }
  }, [workoutId, exercises, deletedExerciseIds, router]);

  const handleCancelEdit = React.useCallback(() => {
    router.push(`/dashboard/workout/${workoutId}`);
  }, [workoutId, router]);

  const handleAddExercises = React.useCallback(() => {
    // Save current state to sessionStorage before navigating
    sessionStorage.setItem(
      `workout-edit-${workoutId}`,
      JSON.stringify({
        exercises: exercises.map((ex, index) => ({
          id: ex.id, // Keep the ID for restoration
          exerciseId: ex.exerciseId,
          position: index,
          sets: ex.sets,
          reps: ex.reps,
          restTime: ex.restTime,
          exercise: ex.exercise,
        })),
        deletedExerciseIds,
      })
    );
  }, [workoutId, exercises, deletedExerciseIds]);

  // Register handlers with parent context
  React.useEffect(() => {
    interface WorkoutEditHandlers {
      save: () => void;
      cancel: () => void;
      isSaving: boolean;
    }

    interface WindowWithHandlers extends Window {
      __registerWorkoutEditHandlers?: (handlers: WorkoutEditHandlers) => void;
    }

    const register = (window as WindowWithHandlers)
      .__registerWorkoutEditHandlers;
    if (register) {
      register({
        save: handleSaveWorkout,
        cancel: handleCancelEdit,
        isSaving,
      });
    }
  }, [handleSaveWorkout, handleCancelEdit, isSaving]);

  const content = isEditMode ? (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext
        items={exercises.map((ex) => ex.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {exercises.map((workoutExercise) => (
            <WorkoutExerciseCard
              key={workoutExercise.id}
              workoutExercise={workoutExercise}
              onDelete={() => handleDeleteExercise(workoutExercise.id)}
              onEdit={() => handleEditExercise(workoutExercise)}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  ) : (
    <div className="space-y-3">
      {exercises.map((workoutExercise) => (
        <WorkoutExerciseCard
          key={workoutExercise.id}
          workoutExercise={workoutExercise}
        />
      ))}
    </div>
  );

  return (
    <>
      {content}
      {editingExercise && (
        <WorkoutExerciseEditDrawer
          open={!!editingExercise}
          onOpenChange={(open) => !open && setEditingExercise(null)}
          exerciseName={
            editingExercise.exercise.exerciseLangs?.[0]?.name || "Exercise"
          }
          initialReps={editingExercise.reps}
          initialSets={editingExercise.sets}
          initialRestTime={editingExercise.restTime}
          onSave={handleSaveExerciseEdit}
        />
      )}
      {isEditMode && (
        <Button
          size="icon-lg"
          className="fixed bottom-22 right-4 bg-primary text-primary-foreground rounded-full shadow-lg"
          onClick={handleAddExercises}
          asChild
        >
          <Link
            href={`/dashboard/workout/create/select-exercice?editWorkoutId=${workoutId}`}
          >
            <Plus className="h-5 w-5" />
          </Link>
        </Button>
      )}
    </>
  );
}
