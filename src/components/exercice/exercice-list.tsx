import prisma from "@/lib/prisma";
import { getCurrentLocale } from "@/locales/server";
import ExerciceSearchWrapper from "./exercice-search-wrapper";

interface Exercise {
  id: string;
  images: string[];
}

interface ExerciseLang {
  name: string;
  description: string;
}

interface CategoryLang {
  name: string;
}

interface ExerciseCategory {
  category: {
    categoriesLang: CategoryLang[];
  };
}

// Extend Exercise to include its translations and categories
interface ExerciseWithLang extends Exercise {
  exerciseLangs: ExerciseLang[];
  exerciseCategories: ExerciseCategory[];
}

export default async function ExerciceList() {
  const locale = await getCurrentLocale(); // 'en', 'fr', ...

  const exercises: ExerciseWithLang[] = await prisma.exercise.findMany({
    include: {
      exerciseLangs: {
        where: {
          lang: { code: locale },
        },
        select: {
          name: true,
          description: true,
        },
      },
      exerciseCategories: {
        include: {
          category: {
            include: {
              categoriesLang: {
                where: {
                  lang: { code: locale },
                },
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  // Extract unique categories from all exercises
  const categoriesSet = new Set<string>();
  exercises.forEach((exercise) => {
    exercise.exerciseCategories.forEach((ec) => {
      const categoryName = ec.category.categoriesLang[0]?.name;
      if (categoryName) {
        categoriesSet.add(categoryName);
      }
    });
  });
  const categories = Array.from(categoriesSet).sort();

  return (
    <ExerciceSearchWrapper exercises={exercises} categories={categories} />
  );
}
