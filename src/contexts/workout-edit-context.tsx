"use client";

import React from "react";

interface WorkoutEditContextValue {
  isEditMode: boolean;
  isSaving: boolean;
  handleSave: () => void;
  handleCancel: () => void;
}

const WorkoutEditContext = React.createContext<
  WorkoutEditContextValue | undefined
>(undefined);

export function useWorkoutEdit() {
  const context = React.useContext(WorkoutEditContext);
  if (!context) {
    throw new Error("useWorkoutEdit must be used within WorkoutEditProvider");
  }
  return context;
}

interface WorkoutEditProviderProps {
  children: React.ReactNode;
  value: WorkoutEditContextValue;
}

export function WorkoutEditProvider({
  children,
  value,
}: WorkoutEditProviderProps) {
  return (
    <WorkoutEditContext.Provider value={value}>
      {children}
    </WorkoutEditContext.Provider>
  );
}
