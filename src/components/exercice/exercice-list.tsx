import prisma from "@/lib/prisma";
import { getCurrentLocale } from "@/locales/server";
import ExerciceListClient from "./exercice-list-client";

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

  const exercises: ExerciseWithLang[] = await prisma.exercise.findMany({
    include: {
      exerciseLangs: {
        where: {
          lang: { code: locale },
        },
      },
    },
  });

  return <ExerciceListClient exercises={exercises} />;
}
