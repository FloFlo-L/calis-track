import ExerciceList from "@/components/exercice/exercice-list";
import { ExerciseListSkeleton } from "@/components/exercice/exercice-list-skeleton";
import SelectExerciceHeader from "@/components/exercice/select-exercice-header";
import { Suspense } from "react";

export default async function SelectExercicePage() {
  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <SelectExerciceHeader />

      <div className="px-4 py-6 max-w-lg mx-auto">
        {/* Exercise list with search */}
        <Suspense fallback={<ExerciseListSkeleton />}>
          <ExerciceList />
        </Suspense>
      </div>
    </div>
  );
}
