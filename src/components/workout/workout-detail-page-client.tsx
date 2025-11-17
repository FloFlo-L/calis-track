"use client";

import { WorkoutEditProvider } from "@/contexts/workout-edit-context";
import { useSearchParams } from "next/navigation";
import React from "react";

interface WorkoutDetailPageClientProps {
  children: React.ReactNode;
}

export default function WorkoutDetailPageClient({
  children,
}: WorkoutDetailPageClientProps) {
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get("edit") === "true";

  const saveHandlerRef = React.useRef<(() => void) | null>(null);
  const cancelHandlerRef = React.useRef<(() => void) | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);

  // Expose methods to register handlers from child components
  React.useEffect(() => {
    interface WorkoutEditHandlers {
      save: () => void;
      cancel: () => void;
      isSaving: boolean;
    }

    interface WindowWithHandlers extends Window {
      __registerWorkoutEditHandlers?: (handlers: WorkoutEditHandlers) => void;
    }

    (window as WindowWithHandlers).__registerWorkoutEditHandlers = (
      handlers: WorkoutEditHandlers
    ) => {
      saveHandlerRef.current = handlers.save;
      cancelHandlerRef.current = handlers.cancel;
      setIsSaving(handlers.isSaving);
    };

    return () => {
      delete (window as WindowWithHandlers).__registerWorkoutEditHandlers;
    };
  }, []);

  const handleSave = () => {
    if (saveHandlerRef.current) {
      saveHandlerRef.current();
    }
  };

  const handleCancel = () => {
    if (cancelHandlerRef.current) {
      cancelHandlerRef.current();
    }
  };

  return (
    <WorkoutEditProvider
      value={{
        isEditMode,
        isSaving,
        handleSave,
        handleCancel,
      }}
    >
      {children}
    </WorkoutEditProvider>
  );
}
