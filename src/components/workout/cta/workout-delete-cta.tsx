"use client";

import { deleteWorkout } from "@/app/actions/workout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

interface WorkoutDeleteCtaProps {
  workoutId: string;
}

export default function WorkoutDeleteCta({ workoutId }: WorkoutDeleteCtaProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);

  const handleRemoveWorkout = async () => {
    setIsDeleting(true);

    try {
      const result = await deleteWorkout(workoutId);

      if (result.success) {
        toast.success("Workout deleted successfully");
        setOpen(false);
        router.push("/dashboard/workout");
      } else {
        toast.error(result.error || "Error deleting workout");
      }
    } catch (error) {
      console.error("Error deleting workout:", error);
      toast.error("An error occurred while deleting the workout");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="cursor-pointer">
          <Trash className="h-4 w-4 text-destructive" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remove workout</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this workout ? No data will be
            recovered.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="grid grid-cols-2 gap-4">
          <Button
            onClick={handleRemoveWorkout}
            variant="destructive"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Remove"}
          </Button>
          <DialogClose asChild>
            <Button variant="outline" disabled={isDeleting}>
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
