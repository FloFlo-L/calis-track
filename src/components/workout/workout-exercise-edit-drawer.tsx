"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

interface WorkoutExerciseEditDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exerciseName: string;
  initialReps: number;
  initialSets: number;
  initialRestTime: number;
  onSave: (data: { reps: number; sets: number; restTime: number }) => void;
}

export default function WorkoutExerciseEditDrawer({
  open,
  onOpenChange,
  exerciseName,
  initialReps,
  initialSets,
  initialRestTime,
  onSave,
}: WorkoutExerciseEditDrawerProps) {
  const [reps, setReps] = React.useState(initialReps);
  const [sets, setSets] = React.useState(initialSets);
  const [restTime, setRestTime] = React.useState(initialRestTime);

  // Reset values when drawer opens
  React.useEffect(() => {
    if (open) {
      setReps(initialReps);
      setSets(initialSets);
      setRestTime(initialRestTime);
    }
  }, [open, initialReps, initialSets, initialRestTime]);

  const handleSave = () => {
    onSave({ reps, sets, restTime });
    onOpenChange(false);
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-primary">Update exercise</DrawerTitle>
            <DrawerDescription>{exerciseName}</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 py-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="reps">Repetitions</Label>
              <Input
                id="reps"
                type="number"
                min="1"
                value={reps}
                onChange={(e) => setReps(parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sets">Series</Label>
              <Input
                id="sets"
                type="number"
                min="1"
                value={sets}
                onChange={(e) => setSets(parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="restTime">Rest time (seconds)</Label>
              <Input
                id="restTime"
                type="number"
                min="0"
                step="5"
                value={restTime}
                onChange={(e) => setRestTime(parseInt(e.target.value) || 0)}
              />
            </div>
          </div>
          <DrawerFooter className="grid grid-cols-2 gap-4">
            <Button onClick={handleSave}>Update</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
