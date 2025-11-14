import prisma from "@/lib/prisma";
import { getCurrentLocale } from "@/locales/server";
import Image from "next/image";

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

// Extend Exercise to include its translations
interface ExerciseWithLang extends Exercise {
  exerciseLangs: ExerciseLang[];
}

export default async function ExerciceList() {
  const locale = await getCurrentLocale(); // 'en', 'fr', ...
  await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate delay for testing skeleton

  const exercises: ExerciseWithLang[] = await prisma.exercise.findMany({
    include: {
      exerciseLangs: {
        where: {
          lang: { code: locale },
        },
      },
    },
  });

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
    </div>
  );
}
