import { Input } from "@/components/ui/input";
import { ChevronLeft, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Exercise {
  id: string;
  name: string;
  category: "push" | "pull" | "legs" | "core";
  image: string;
  description: string;
}

const exercises: Exercise[] = [
  {
    id: "pushups",
    name: "Push-ups",
    category: "push",
    image: "/athlete-pushups.png",
    description: "Basic upper body exercise",
  },
  {
    id: "pullups",
    name: "Pull-ups",
    category: "pull",
    image: "/athlete-doing-pullups.jpg",
    description: "Exercise for back and biceps",
  },
  {
    id: "dips",
    name: "Dips",
    category: "push",
    image: "/athlete-doing-dips.jpg",
    description: "Exercise for triceps and chest",
  },
  {
    id: "squats",
    name: "Squats",
    category: "legs",
    image: "/athlete-doing-squats.jpg",
    description: "Exercise for legs",
  },
  {
    id: "lunges",
    name: "Lunges",
    category: "legs",
    image: "/athlete-doing-lunges.jpg",
    description: "Exercise for legs and balance",
  },
  {
    id: "plank",
    name: "Planche",
    category: "core",
    image: "/athlete-doing-plank.jpg",
    description: "Core strengthening exercise",
  },
  {
    id: "leg-raises",
    name: "Leg Raises",
    category: "core",
    image: "/athlete-doing-leg-raises.jpg",
    description: "Exercise for abdominals",
  },
  {
    id: "handstand",
    name: "Handstand",
    category: "push",
    image: "/athlete-doing-handstand.jpg",
    description: "Advanced balance exercise",
  },
  {
    id: "muscle-up",
    name: "Muscle-up",
    category: "pull",
    image: "/athlete-doing-muscle-up.jpg",
    description: "Exercice avancé combinant traction et dips",
  },
  {
    id: "pistol-squat",
    name: "Pistol Squat",
    category: "legs",
    image: "/athlete-doing-pistol-squat.jpg",
    description: "Squat sur une jambe",
  },
];

export default function SelectExercicePage() {
  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border">
        <div className="flex p-4 max-w-lg mx-auto h-[68px]">
          <Link
            href="/dashboard/workout"
            className="flex items-center gap-3 hover:cursor-pointer"
          >
            <ChevronLeft className="size-5" />
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
        <div className="space-y-3">
          {exercises.map((exercise) => (
            <button
              key={exercise.id}
              className="w-full flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary hover:bg-accent/50 transition-all text-left group"
            >
              <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-primary/33">
                <Image
                  src={exercise.image || "/placeholder.svg"}
                  alt={exercise.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
                  {exercise.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {exercise.description}
                </p>
                <div className="mt-2">
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">
                    {exercise.category}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
