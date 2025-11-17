import ExerciceList from "@/components/exercice/exercice-list";
import { ExerciseListSkeleton } from "@/components/exercice/exercice-list-skeleton";
import SelectExerciceHeader from "@/components/exercice/select-exercice-header";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, XIcon } from "lucide-react";
import { Suspense } from "react";

export default async function SelectExercicePage() {
  const categories = [
    { id: "1", name: "Category 1", selected: true },
    { id: "2", name: "Category 2", selected: false },
    { id: "3", name: "Category 3", selected: false },
  ];
  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <SelectExerciceHeader />

      <div className="px-4 py-6 space-y-6 max-w-lg mx-auto">
        {/* Search exercise */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search an exercice..."
            className="pl-10 h-12 text-sm"
          />
        </div>

        {/*Categories filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={category.selected ? "default" : "secondary"}
            >
              {category.name}
              {category.selected && <XIcon />}
            </Badge>
          ))}
        </div>

        {/* Exercise list */}
        <Suspense fallback={<ExerciseListSkeleton />}>
          <ExerciceList />
        </Suspense>
      </div>
    </div>
  );
}
