import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function WorkoutDetailHeaderSkeleton() {
  return (
    <div className="sticky top-0 z-10 bg-card border-b border-border">
      <div className="flex items-center justify-between p-4 max-w-lg mx-auto">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/workout">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <Skeleton className="h-7 w-32 mx-auto" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9  w-9 rounded-md" />
        </div>
      </div>
    </div>
  );
}
