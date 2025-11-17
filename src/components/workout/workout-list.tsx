import { BicepsFlexed, Clock, Dumbbell, Repeat } from "lucide-react";
import Link from "next/link";

interface WorkoutExercise {
  sets: number;
  reps: number;
  restTime: number;
}

interface Workout {
  id: string;
  title: string;
  createdAt: Date;
  workoutExercises: WorkoutExercise[];
}

interface WorkoutListProps {
  workouts: Workout[];
}

// Fonction helper pour calculer la durée d'un workout
function calculateWorkoutDuration(exercises: WorkoutExercise[]): number {
  return exercises.reduce((total, exercise) => {
    const timePerRep = 3; // secondes
    const executionTimePerSet = exercise.reps * timePerRep;
    const timePerSet = executionTimePerSet + exercise.restTime;
    const exerciseTotal =
      (exercise.sets - 1) * timePerSet + executionTimePerSet;
    return total + exerciseTotal;
  }, 0);
}

export default function WorkoutList({ workouts }: WorkoutListProps) {
  return (
    <div className="space-y-3">
      {workouts.map((workout) => {
        const totalSets = workout.workoutExercises.reduce(
          (sum, ex) => sum + ex.sets,
          0
        );
        const totalReps = workout.workoutExercises.reduce(
          (sum, ex) => sum + ex.reps * ex.sets,
          0
        );
        const durationInMinutes = Math.ceil(
          calculateWorkoutDuration(workout.workoutExercises) / 60
        );

        return (
          <Link
            key={workout.id}
            href={`/dashboard/workout/${workout.id}`}
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary hover:bg-accent/50 transition-all cursor-pointer"
          >
            <div className="space-y-2 flex-1">
              <h3 className="font-semibold text-lg text-primary">
                {workout.title}
              </h3>
              <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Dumbbell size={14} />
                  <span>{workout.workoutExercises.length} exercices</span>
                </span>
                <span className="flex items-center gap-1">
                  <Repeat size={14} />
                  <span>{totalSets} séries</span>
                </span>
                <span className="flex items-center gap-1">
                  <BicepsFlexed size={14} />
                  <span>{totalReps} reps</span>
                </span>
              </div>
            </div>
            <span className="font-semibold flex items-center gap-2 text-sm">
              <Clock size={14} />
              ~{durationInMinutes} mins
            </span>
          </Link>
        );
      })}
    </div>
  );
}
