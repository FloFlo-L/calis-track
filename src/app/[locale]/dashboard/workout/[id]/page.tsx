import WorkoutDetailContent from "@/components/workout/workout-detail-content";
import WorkoutDetailHeader from "@/components/workout/workout-detail-header";
import WorkoutDetailHeaderSkeleton from "@/components/workout/workout-detail-header-skeleton";
import WorkoutDetailPageClient from "@/components/workout/workout-detail-page-client";
import WorkoutDetailSkeleton from "@/components/workout/workout-detail-skeleton";
import { Suspense } from "react";

interface WorkoutDetailPageProps {
  params: Promise<{ id: string; locale: string }>;
}

export default async function WorkoutDetailPage({
  params,
}: WorkoutDetailPageProps) {
  const { id } = await params;

  return (
    <WorkoutDetailPageClient>
      <div className="min-h-screen bg-background pb-20">
        {/* Header with Suspense */}
        <Suspense fallback={<WorkoutDetailHeaderSkeleton />}>
          <WorkoutDetailHeader workoutId={id} />
        </Suspense>

        {/* Content with Suspense */}
        <Suspense fallback={<WorkoutDetailSkeleton />}>
          <WorkoutDetailContent workoutId={id} />
        </Suspense>
      </div>
    </WorkoutDetailPageClient>
  );
}
