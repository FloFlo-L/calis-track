"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfiguredExercise } from "@/types/workout";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface ExerciceConfigProps {
  exerciseId: string;
  name: string;
  image?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function ExerciceConfig({
  exerciseId,
  name,
  image = "placeholder.svg",
  open,
  onOpenChange,
}: ExerciceConfigProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editWorkoutId = searchParams.get("editWorkoutId");

  const [sets, setSets] = useState<number>(3);
  const [reps, setReps] = useState<number>(10);
  const [restTime, setRestTime] = useState<number>(60);

  const handleSubmit = () => {
    // Récupérer les exercices existants depuis sessionStorage
    const storedExercises = sessionStorage.getItem("workout-exercises");
    const currentExercises: ConfiguredExercise[] = storedExercises
      ? JSON.parse(storedExercises)
      : [];

    // Créer le nouvel exercice configuré
    const newExercise: ConfiguredExercise = {
      exerciseId,
      name,
      image,
      sets,
      reps,
      restTime,
      position: currentExercises.length, // Position basée sur l'index
    };

    // Ajouter le nouvel exercice
    const updatedExercises = [...currentExercises, newExercise];

    // Sauvegarder dans sessionStorage
    sessionStorage.setItem(
      "workout-exercises",
      JSON.stringify(updatedExercises)
    );

    // Fermer le drawer
    onOpenChange?.(false);

    // Rediriger vers la bonne page (création ou édition)
    if (editWorkoutId) {
      router.push(`/dashboard/workout/${editWorkoutId}?edit=true`);
    } else {
      router.push("/dashboard/workout/create");
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-primary">{name}</DrawerTitle>
            <DrawerDescription>Configure your exercice</DrawerDescription>
          </DrawerHeader>
          <div className="mt-6 space-y-6">
            <div className="relative w-24 h-24 rounded-xl border border-primary/20 mx-auto">
              <Image
                src={`/${image}`}
                alt={name}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-6 p-4">
              <div className="space-y-3">
                <Label htmlFor="sets">Number of sets</Label>
                <Input
                  id="sets"
                  type="number"
                  min="1"
                  value={sets}
                  onChange={(e) => setSets(parseInt(e.target.value) || 1)}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="reps">Number of repetitions</Label>
                <Input
                  id="reps"
                  type="number"
                  min="1"
                  value={reps}
                  onChange={(e) => setReps(parseInt(e.target.value) || 1)}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="rest">Rest time (seconds)</Label>
                <Input
                  id="rest"
                  type="number"
                  min="0"
                  step="15"
                  value={restTime}
                  onChange={(e) => setRestTime(parseInt(e.target.value) || 0)}
                />
              </div>
              <DrawerFooter className="mt-12 grid grid-cols-2 gap-4 p-0">
                <Button onClick={handleSubmit}>Add</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
