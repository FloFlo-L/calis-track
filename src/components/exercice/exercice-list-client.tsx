"use client";

import { useState } from "react";
import Image from "next/image";
import ExerciceConfig from "./exercice-config";

interface Exercise {
  id: string;
  images: string[];
}

interface ExerciseLang {
  id: string;
  name: string;
  description: string;
  exerciseId: string;
  langId: string;
}

interface ExerciseWithLang extends Exercise {
  exerciseLangs: ExerciseLang[];
}

interface ExerciceListClientProps {
  exercises: ExerciseWithLang[];
}

export default function ExerciceListClient({
  exercises,
}: ExerciceListClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<{
    id: string;
    name: string;
    image: string;
  } | null>(null);

  const handleExerciseClick = (id: string, name: string, image: string) => {
    setSelectedExercise({ id, name, image });
    setIsOpen(true);
  };

  return (
    <div className="space-y-3">
      {exercises.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          No exercises available yet
        </p>
      ) : (
        exercises.map((exercise) => {
          const imgSrc = exercise.images?.[0] ?? "placeholder.svg";
          const langEntry = exercise.exerciseLangs?.[0];
          const name = langEntry?.name ?? "Untitled exercise";
          const description = langEntry?.description ?? "";

          return (
            <button
              key={exercise.id}
              onClick={() => handleExerciseClick(exercise.id, name, imgSrc)}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary hover:bg-accent/50 transition-all text-left group"
            >
              <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-primary/33">
                <Image
                  src={`/${imgSrc}`}
                  alt={name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base text-primary">{name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {description}
                </p>
                <div className="mt-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">
                    category
                  </span>
                </div>
              </div>
            </button>
          );
        })
      )}

      {selectedExercise && (
        <ExerciceConfig
          exerciseId={selectedExercise.id}
          name={selectedExercise.name}
          image={selectedExercise.image}
          open={isOpen}
          onOpenChange={setIsOpen}
        />
      )}
    </div>
  );
}
