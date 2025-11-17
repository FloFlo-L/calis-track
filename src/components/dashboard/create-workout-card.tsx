"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BicepsFlexed } from "lucide-react";
import Link from "next/link";

interface CreateWorkoutCardProps {
  hasWorkouts: boolean;
}

export default function CreateWorkoutCard({
  hasWorkouts,
}: CreateWorkoutCardProps) {
  const cardClassName = hasWorkouts
    ? "w-full bg-linear-to-br from-primary to-primary/80 border-0 text-primary-foreground"
    : "w-full bg-linear-to-br from-primary to-primary/80 border-0 text-primary-foreground animate-pulse-card";

  const description = hasWorkouts
    ? "Create a new workout session"
    : "Create your first workout session";

  return (
    <Link href="/dashboard/workout/create" className="flex">
      <Card className={cardClassName}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg mb-1">New workout</h3>
              <p className="text-sm text-primary-foreground/80">{description}</p>
            </div>
            <Button
              size="icon"
              className="h-12 w-12 rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              <BicepsFlexed className="size-7" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
