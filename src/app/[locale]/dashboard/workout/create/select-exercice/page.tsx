import ExerciceList from "@/components/exercice/exercice-list";
import { ExerciseListSkeleton } from "@/components/exercice/exercice-list-skeleton";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Search } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function SelectExercicePage() {
  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border">
        <div className="flex p-4 max-w-lg mx-auto h-[68px]">
          <Link
            href="/dashboard/workout"
            className="flex items-center gap-3 hover:cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
            <h1 className="text-xl font-bold flex-1">Select an exercise</h1>
          </Link>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 max-w-lg mx-auto">
        {/* Search exercise */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search an exercice..."
            className="pl-10 h-12 text-sm"
          />
        </div>

        {/* Exercise list */}
        <Suspense fallback={<ExerciseListSkeleton />}>
          <ExerciceList />
        </Suspense>
      </div>
    </div>
  );
}
