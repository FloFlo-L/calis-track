"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ConfiguredExercise } from "@/types/workout";
import { headers } from "next/headers";

interface CreateWorkoutInput {
  title: string;
  exercises: ConfiguredExercise[];
}

export async function createWorkout(input: CreateWorkoutInput) {
  try {
    // Get user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return {
        success: false,
        error: "You must be logged in to create a workout",
      };
    }

    // Validation
    if (!input.title || input.title.trim().length === 0) {
      return {
        success: false,
        error: "Workout title is required",
      };
    }

    if (input.title.trim().length > 20) {
      return {
        success: false,
        error: "Title must not exceed 20 characters",
      };
    }

    if (!input.exercises || input.exercises.length === 0) {
      return {
        success: false,
        error: "You must add at least one exercise",
      };
    }

    // Create the workout with its exercises in a single transaction
    const workout = await prisma.workout.create({
      data: {
        title: input.title.trim(),
        userId: session.user.id,
        workoutExercises: {
          create: input.exercises.map((exercise) => ({
            exerciseId: exercise.exerciseId,
            position: exercise.position,
            sets: exercise.sets,
            reps: exercise.reps,
            restTime: exercise.restTime,
          })),
        },
      },
      include: {
        workoutExercises: {
          include: {
            exercise: {
              include: {
                exerciseLangs: true,
              },
            },
          },
        },
      },
    });

    return {
      success: true,
      data: workout,
    };
  } catch (error) {
    console.error("Error creating workout:", error);
    return {
      success: false,
      error: "An error occurred while creating the workout",
    };
  }
}

export async function getUserWorkouts() {
  try {
    // Get user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return {
        success: false,
        error: "You must be logged in",
        data: [],
      };
    }

    // Get all user's workouts with their exercises
    const workouts = await prisma.workout.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        workoutExercises: {
          include: {
            exercise: {
              include: {
                exerciseLangs: true,
              },
            },
          },
          orderBy: {
            position: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc", // Most recent first
      },
    });

    return {
      success: true,
      data: workouts,
    };
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return {
      success: false,
      error: "An error occurred while fetching workouts",
      data: [],
    };
  }
}

export async function getWorkoutById(workoutId: string) {
  try {
    // Get user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return {
        success: false,
        error: "You must be logged in",
        data: null,
      };
    }

    // Get the workout with security check
    const workout = await prisma.workout.findUnique({
      where: {
        id: workoutId,
      },
      include: {
        workoutExercises: {
          include: {
            exercise: {
              include: {
                exerciseLangs: true,
              },
            },
          },
          orderBy: {
            position: "asc",
          },
        },
      },
    });

    // Check if the workout exists
    if (!workout) {
      return {
        success: false,
        error: "Workout not found",
        data: null,
      };
    }

    // SECURITY: Check that the workout belongs to the logged-in user
    if (workout.userId !== session.user.id) {
      return {
        success: false,
        error: "You don't have access to this workout",
        data: null,
      };
    }

    return {
      success: true,
      data: workout,
    };
  } catch (error) {
    console.error("Error fetching workout:", error);
    return {
      success: false,
      error: "An error occurred while fetching the workout",
      data: null,
    };
  }
}

export async function deleteWorkout(workoutId: string) {
  try {
    // Get user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return {
        success: false,
        error: "You must be logged in",
      };
    }

    // Check if the workout exists and belongs to the user
    const workout = await prisma.workout.findUnique({
      where: {
        id: workoutId,
      },
      select: {
        userId: true,
      },
    });

    if (!workout) {
      return {
        success: false,
        error: "Workout not found",
      };
    }

    // SECURITY: Check that the workout belongs to the logged-in user
    if (workout.userId !== session.user.id) {
      return {
        success: false,
        error: "You don't have access to this workout",
      };
    }

    // Delete the workout (workoutExercises will be deleted automatically with onDelete: Cascade)
    await prisma.workout.delete({
      where: {
        id: workoutId,
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting workout:", error);
    return {
      success: false,
      error: "An error occurred while deleting the workout",
    };
  }
}

interface UpdateWorkoutInput {
  workoutId: string;
  title?: string;
  exercises: Array<{
    workoutExerciseId: string;
    position: number;
    sets: number;
    reps: number;
    restTime: number;
  }>;
  newExercises?: Array<{
    exerciseId: string;
    position: number;
    sets: number;
    reps: number;
    restTime: number;
  }>;
  deletedExerciseIds?: string[];
}

export async function updateWorkout(input: UpdateWorkoutInput) {
  try {
    // Get user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return {
        success: false,
        error: "You must be logged in",
      };
    }

    // Check if the workout exists and belongs to the user
    const workout = await prisma.workout.findUnique({
      where: {
        id: input.workoutId,
      },
      select: {
        userId: true,
      },
    });

    if (!workout) {
      return {
        success: false,
        error: "Workout not found",
      };
    }

    // SECURITY: Check that the workout belongs to the logged-in user
    if (workout.userId !== session.user.id) {
      return {
        success: false,
        error: "You don't have access to this workout",
      };
    }

    // Validate title if provided
    if (input.title !== undefined) {
      if (input.title.trim().length === 0) {
        return {
          success: false,
          error: "Workout title is required",
        };
      }

      if (input.title.trim().length > 20) {
        return {
          success: false,
          error: "Title must not exceed 20 characters",
        };
      }
    }

    // Update the workout and its exercises in a transaction
    await prisma.$transaction(async (tx) => {
      // Update the title if provided
      if (input.title !== undefined) {
        await tx.workout.update({
          where: { id: input.workoutId },
          data: { title: input.title.trim() },
        });
      }

      // Delete exercises if requested
      if (input.deletedExerciseIds && input.deletedExerciseIds.length > 0) {
        await tx.workoutExercise.deleteMany({
          where: {
            id: { in: input.deletedExerciseIds },
            workoutId: input.workoutId,
          },
        });
      }

      // Update each existing exercise
      for (const exercise of input.exercises) {
        await tx.workoutExercise.update({
          where: {
            id: exercise.workoutExerciseId,
          },
          data: {
            position: exercise.position,
            sets: exercise.sets,
            reps: exercise.reps,
            restTime: exercise.restTime,
          },
        });
      }

      // Create new exercises
      if (input.newExercises && input.newExercises.length > 0) {
        await tx.workoutExercise.createMany({
          data: input.newExercises.map((exercise) => ({
            workoutId: input.workoutId,
            exerciseId: exercise.exerciseId,
            position: exercise.position,
            sets: exercise.sets,
            reps: exercise.reps,
            restTime: exercise.restTime,
          })),
        });
      }
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error updating workout:", error);
    return {
      success: false,
      error: "An error occurred while updating the workout",
    };
  }
}
