export interface ConfiguredExercise {
  exerciseId: string; // ID de l'exercice template
  name: string; // Nom localisé
  image: string; // URL de l'image
  sets: number; // Nombre de séries
  reps: number; // Nombre de répétitions
  restTime: number; // Temps de repos (secondes)
  position: number; // Ordre dans le workout
}

export interface WorkoutCreatePayload {
  title: string;
  userId: string;
  exercises: ConfiguredExercise[];
}
