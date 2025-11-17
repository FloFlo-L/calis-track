"use client";

import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import {
  BicepsFlexed,
  ChevronLeft,
  Clock,
  Dumbbell,
  Plus,
  Repeat,
  Save,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

import { createWorkout } from "@/app/actions/workout";
import { SortableItem } from "@/components/sortable-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ConfiguredExercise } from "@/types/workout";

export default function WorkoutCreatePage() {
  const router = useRouter();
  const [items, setItems] = React.useState<ConfiguredExercise[]>([]);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [workoutTitle, setWorkoutTitle] = React.useState<string>("");
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  // Hydrater depuis sessionStorage au montage
  React.useEffect(() => {
    const storedExercises = sessionStorage.getItem("workout-exercises");
    const storedTitle = sessionStorage.getItem("workout-title");

    if (storedExercises) {
      try {
        const exercises = JSON.parse(storedExercises);
        setItems(exercises);
      } catch (error) {
        console.error("Error parsing stored exercises:", error);
      }
    }

    if (storedTitle) {
      setWorkoutTitle(storedTitle);
    }
  }, []);

  // Synchroniser avec sessionStorage quand items change
  React.useEffect(() => {
    if (items.length > 0) {
      sessionStorage.setItem("workout-exercises", JSON.stringify(items));
    }
  }, [items]);

  // Synchroniser le titre avec sessionStorage
  React.useEffect(() => {
    if (workoutTitle) {
      sessionStorage.setItem("workout-title", workoutTitle);
    }
  }, [workoutTitle]);

  // Calculer la durée estimée du workout
  const calculateWorkoutDuration = (
    exercises: ConfiguredExercise[]
  ): number => {
    return exercises.reduce((total, exercise) => {
      // Temps approximatif par répétition (3 secondes en moyenne)
      const timePerRep = 3; // secondes

      // Temps d'exécution par série
      const executionTimePerSet = exercise.reps * timePerRep;

      // Temps total par série (exécution + repos)
      const timePerSet = executionTimePerSet + exercise.restTime;

      // Temps total pour cet exercice
      // (sets - 1) × (exécution + repos) + dernière série sans repos
      const exerciseTotal =
        (exercise.sets - 1) * timePerSet + executionTimePerSet;

      return total + exerciseTotal;
    }, 0);
  };

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(
          (item) => item.exerciseId === active.id
        );
        const newIndex = items.findIndex((item) => item.exerciseId === over.id);

        const reorderedItems = arrayMove(items, oldIndex, newIndex);

        // Mettre à jour les positions
        return reorderedItems.map((item, index) => ({
          ...item,
          position: index,
        }));
      });
    }
  };

  const handleDeleteExercise = (exerciseId: string) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter(
        (item) => item.exerciseId !== exerciseId
      );

      // Mettre à jour les positions après suppression
      const reindexedItems = updatedItems.map((item, index) => ({
        ...item,
        position: index,
      }));

      // Mettre à jour sessionStorage
      if (reindexedItems.length === 0) {
        sessionStorage.removeItem("workout-exercises");
      } else {
        sessionStorage.setItem(
          "workout-exercises",
          JSON.stringify(reindexedItems)
        );
      }

      return reindexedItems;
    });
  };

  const handleSaveWorkout = async () => {
    // Validation
    if (!workoutTitle.trim()) {
      toast.error("The workout title is required");
      return;
    }

    if (items.length === 0) {
      toast.error("You must add at least one exercise");
      return;
    }

    setIsSaving(true);

    try {
      const result = await createWorkout({
        title: workoutTitle,
        exercises: items,
      });

      if (result.success) {
        toast.success("Workout created successfully!");
        // Clear sessionStorage
        sessionStorage.removeItem("workout-exercises");
        sessionStorage.removeItem("workout-title");
        // Redirect to workouts page
        router.push("/dashboard/workout");
      } else {
        toast.error(result.error || "Error creating workout");
      }
    } catch (error) {
      console.error("Error saving workout:", error);
      toast.error("An error occurred while saving the workout");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border">
        <div className="flex items-center justify-between gap-3 p-4 max-w-lg mx-auto h-[68px]">
          <Link
            href="/dashboard/workout"
            className="flex items-center gap-3 hover:cursor-pointer"
          >
            <ChevronLeft className="size-5" />
            <h1 className="text-xl font-bold flex-1">Create a workout</h1>
          </Link>
          <Button
            className="bg-primary text-primary-foreground"
            onClick={handleSaveWorkout}
            disabled={isSaving}
          >
            <Save className="size-5" />
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 max-w-lg mx-auto">
        {/* Workout name */}
        <Card className="gap-4">
          <CardHeader>
            <CardTitle className="text-lg">Workout name</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Ex: Full Body, Upper body EMOM, Legs day..."
              className="text-sm"
              value={workoutTitle}
              onChange={(e) => setWorkoutTitle(e.target.value)}
              maxLength={20}
            />
            <p className="text-xs text-muted-foreground mt-2">
              {workoutTitle.length}/20 caractères
            </p>
          </CardContent>
        </Card>

        {/* Workout details */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Dumbbell className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-semibold">{items.length}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <BicepsFlexed className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-semibold">
              {items.reduce((total, item) => total + item.reps * item.sets, 0)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Repeat className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-semibold">
              {items.reduce((total, item) => total + item.sets, 0)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <span className="text-sm font-semibold">
              {items.length > 0
                ? `~${Math.ceil(calculateWorkoutDuration(items) / 60)} mins`
                : "--"}
            </span>
          </div>
        </div>

        {/* Empty exercices */}
        {items.length === 0 && (
          <Card className="bg-muted/50 border-dashed">
            <CardContent className="p-12 text-center">
              <Dumbbell className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground text-sm">
                Add exercises to build your workout
              </p>
            </CardContent>
          </Card>
        )}

        {/** Workout exercises list */}
        {items.length > 0 && (
          <div>
            <DndContext
              sensors={sensors}
              onDragEnd={handleDragEnd}
              onDragStart={handleDragStart}
            >
              <SortableContext
                items={items.map((item) => item.exerciseId)}
                strategy={rectSortingStrategy}
              >
                {items.map((exercise) => (
                  <div key={exercise.exerciseId} className="mb-4">
                    <SortableItem
                      id={exercise.exerciseId}
                      value={exercise.exerciseId}
                      exercise={exercise}
                      onDelete={() => handleDeleteExercise(exercise.exerciseId)}
                    />
                  </div>
                ))}
              </SortableContext>
            </DndContext>
          </div>
        )}
      </div>

      {/* CTA add workout exercises */}
      <Button
        size="icon-lg"
        className="fixed bottom-22 right-4 bg-primary text-primary-foreground rounded-full shadow-lg"
        asChild
      >
        <Link href="/dashboard/workout/create/select-exercice">
          <Plus className="h-5 w-5" />
        </Link>
      </Button>
    </div>
  );
}
