"use client";

import { Badge } from "../ui/badge";

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategories,
  onCategoryChange,
}: CategoryFilterProps) {
  const isAllSelected = selectedCategories.includes("all");

  const handleCategoryClick = (category: string) => {
    if (category === "all") {
      // Clicking "all" resets to show all exercises
      onCategoryChange(["all"]);
    } else {
      // Clicking a specific category
      if (selectedCategories.includes(category)) {
        // Deselect the category
        const newCategories = selectedCategories.filter((c) => c !== category);
        // If no categories left, activate "all"
        onCategoryChange(newCategories.length === 0 ? ["all"] : newCategories);
      } else {
        // Select the category and remove "all"
        const newCategories = selectedCategories.filter((c) => c !== "all");
        onCategoryChange([...newCategories, category]);
      }
    }
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        {/* "All" badge */}
        <Badge
          onClick={() => handleCategoryClick("all")}
          className={` transition-all min-w-10 ${
            isAllSelected
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          All
        </Badge>

        {/* Category badges */}
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category);
          return (
            <Badge
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`transition-all ${
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
