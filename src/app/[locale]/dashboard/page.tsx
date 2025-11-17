import { getUserWorkouts } from "@/app/actions/workout";
import CreateWorkoutCard from "@/components/dashboard/create-workout-card";
import Image from "next/image";

export default async function DashboardPage() {
  const workoutsResult = await getUserWorkouts();
  const hasWorkouts = workoutsResult.success && workoutsResult.data.length > 0;

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header with hero image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src="/athlete-doing-calisthenics-outdoor-park.jpg"
          alt="Calisthenics"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-br from-background to-primary" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h2 className="text-3xl font-bold">Ready to workout ?</h2>
          <p className="text-primary mt-1">Push your limits today</p>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 max-w-lg mx-auto">
        <CreateWorkoutCard hasWorkouts={hasWorkouts} />

        {/* Stats rapides */}
        {/* <div className="grid grid-cols-2 gap-3">
          <Card className="bg-linear-to-br from-primary/20 to-primary/5 border border-primary/40">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/20">
                <Flame className="size-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">Days in a row</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-secondary/40 to-secondary/5 border border-secondary">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-secondary/20">
                <Dumbbell className="size-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">47</p>
                <p className="text-sm text-muted-foreground">Sessions</p>
              </div>
            </CardContent>
          </Card>
        </div> */}

        {/* Last workouts */}
        {/* <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Last workouts</h2>
            <Link href="/progress">
              <Button variant="ghost" size="sm" className="text-primary">
                See all
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {lastWorkouts.map((workout) => (
              <Card
                key={workout.id}
                className="hover:border-primary/50 transition-colors"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{workout.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="size-3" />
                          {workout.date}
                        </span>
                        <span>{workout.exercises} exercises</span>
                        <span>{workout.duration} min</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary">
                      Repeat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}
