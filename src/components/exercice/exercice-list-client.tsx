"use client";

import { useMemo, useState } from "react";
import CategoryFilter from "./category-filter";
import ExerciceConfig from "./exercice-config";
import ExerciseImageCarousel from "./exercise-image-carousel";

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

interface ExerciseWithLang extends Exercise {
  exerciseLangs: ExerciseLang[];
  exerciseCategories: ExerciseCategory[];
}

interface ExerciceListClientProps {
  exercises: ExerciseWithLang[];
  categories: string[];
  searchQuery?: string;
  showCategories?: boolean;
}

export default function ExerciceListClient({
  exercises,
  categories,
  searchQuery = "",
  showCategories = true,
}: ExerciceListClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<{
    id: string;
    name: string;
    image: string;
  } | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "all",
  ]);

  const handleExerciseClick = (id: string, name: string, image: string) => {
    setSelectedExercise({ id, name, image });
    setIsOpen(true);
  };

  // Filter exercises based on search query and selected categories
  const filteredExercises = useMemo(() => {
    let filtered = exercises;

    // 1. If search is active, filter by name only
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((exercise) => {
        const name = exercise.exerciseLangs[0]?.name.toLowerCase() || "";
        return name.includes(query);
      });
    }
    // 2. Otherwise, filter by categories
    else if (!selectedCategories.includes("all")) {
      filtered = filtered.filter((exercise) => {
        const exerciseCategoryNames = exercise.exerciseCategories.map(
          (ec) => ec.category.categoriesLang[0]?.name
        );
        // Show exercise if it has at least one of the selected categories (OR logic)
        return selectedCategories.some((selectedCat) =>
          exerciseCategoryNames.includes(selectedCat)
        );
      });
    }

    return filtered;
  }, [exercises, selectedCategories, searchQuery]);

  return (
    <div>
      {/* Category Filter - Only show when not searching */}
      {showCategories && (
        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={setSelectedCategories}
        />
      )}

      {/* Exercise List */}
      <div className="space-y-3">
        {filteredExercises.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            {searchQuery.trim()
              ? "No exercises found for your search"
              : "No exercises found for the selected categories"}
          </p>
        ) : (
          filteredExercises.map((exercise) => {
            const imgSrc = exercise.images?.[0] ?? "placeholder.png";
            const langEntry = exercise.exerciseLangs?.[0];
            const name = langEntry?.name ?? "Untitled exercise";
            const description = langEntry?.description ?? "";
            const categories = exercise.exerciseCategories
              .map((ec) => ec.category.categoriesLang[0]?.name)
              .filter(Boolean);

            return (
              <button
                key={exercise.id}
                onClick={() => handleExerciseClick(exercise.id, name, imgSrc)}
                className="w-full flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary hover:bg-accent/50 transition-all text-left group"
              >
                <ExerciseImageCarousel images={exercise.images} alt={name} />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-base text-primary">
                    {name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {description}
                  </p>
                  {categories.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {categories.map((category, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </button>
            );
          })
        )}
      </div>

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
