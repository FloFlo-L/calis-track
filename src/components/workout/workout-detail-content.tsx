import { getWorkoutById } from "@/app/actions/workout";
import { notFound } from "next/navigation";
import WorkoutStartCta from "./cta/workout-start-cta";
import WorkoutDetailClientWrapper from "./workout-detail-client-wrapper";

interface WorkoutDetailContentProps {
  workoutId: string;
}

export default async function WorkoutDetailContent({
  workoutId,
}: WorkoutDetailContentProps) {
  const result = await getWorkoutById(workoutId);

  // Si le workout n'existe pas ou l'utilisateur n'a pas accès, afficher 404
  if (!result.success || !result.data) {
    notFound();
  }

  const workout = result.data;

  return (
    <div className="px-4 py-6 max-w-lg mx-auto">
      {/* CTA Start workout */}
      <WorkoutStartCta />

      {/* Exercise list */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Exercices ({workout.workoutExercises.length})
        </h3>
        <WorkoutDetailClientWrapper
          workoutId={workoutId}
          initialData={{
            title: workout.title,
            workoutExercises: workout.workoutExercises,
          }}
        />
      </div>
    </div>
  );
}
