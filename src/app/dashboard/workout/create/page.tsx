import { Button } from "@/components/ui/button";
import { ChevronLeft, Save } from "lucide-react";
import Link from "next/link";

export default function WorkoutCreatePage() {
  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border">
        <div className="flex items-center justify-between gap-3 p-4 max-w-lg mx-auto h-[68px]">
          <Link
            href="/dashboard/workout"
            className="flex items-center gap-3 hover:cursor-pointer"
          >
            <ChevronLeft className="size-5" />
            <h1 className="text-xl font-bold flex-1">Créer une séance</h1>
          </Link>
          <Button className="bg-primary text-primary-foreground">
            <Save className="size-5" />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
