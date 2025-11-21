"use client";

import { useState } from "react";
import SearchBar from "./search-bar";
import ExerciceListClient from "./exercice-list-client";

interface CategoryLang {
  name: string;
}

interface ExerciseCategory {
  category: {
    categoriesLang: CategoryLang[];
  };
}

interface ExerciseLang {
  name: string;
  description: string;
}

interface Exercise {
  id: string;
  images: string[];
}

interface ExerciseWithLang extends Exercise {
  exerciseLangs: ExerciseLang[];
  exerciseCategories: ExerciseCategory[];
}

interface ExerciceSearchWrapperProps {
  exercises: ExerciseWithLang[];
  categories: string[];
}

export default function ExerciceSearchWrapper({
  exercises,
  categories,
}: ExerciceSearchWrapperProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {/* Exercise List with filters */}
      <ExerciceListClient
        exercises={exercises}
        categories={categories}
        searchQuery={searchQuery}
        showCategories={!isFocused && !searchQuery.trim()}
      />
    </div>
  );
}
