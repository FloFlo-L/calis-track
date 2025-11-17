"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SelectExerciceHeader() {
  const searchParams = useSearchParams();
  const editWorkoutId = searchParams.get("editWorkoutId");

  const backHref = editWorkoutId
    ? `/dashboard/workout/${editWorkoutId}?edit=true`
    : "/dashboard/workout/create";

  return (
    <div className="sticky top-0 z-10 bg-card border-b border-border">
      <div className="flex p-4 max-w-lg mx-auto h-[68px]">
        <Link href={backHref} className="flex items-center gap-3 hover:cursor-pointer">
          <ChevronLeft className="h-5 w-5" />
          <h1 className="text-xl font-bold flex-1">Select an exercise</h1>
        </Link>
      </div>
    </div>
  );
}
