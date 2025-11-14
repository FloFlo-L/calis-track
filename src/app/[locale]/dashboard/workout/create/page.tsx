"use client";

import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { ChevronLeft, Clock, Dumbbell, Plus, Save } from "lucide-react";
import Link from "next/link";
import React from "react";

import { SortableItem } from "@/components/sortable-item";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function WorkoutCreatePage() {
  const [items, setItems] = React.useState(["1", "2", "3", "4", "5"]);
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    //setActiveId(null);
    const { active, over } = event;
    console.log({ active, over });

    if (!over) {
      return;
    }

    if (active.id !== (over.id as string)) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border">
        <div className="flex items-center justify-between gap-3 p-4 max-w-lg mx-auto h-[68px]">
          <Link
            href="/dashboard/workout"
            className="flex items-center gap-3 hover:cursor-pointer"
          >
            <ChevronLeft className="size-5" />
            <h1 className="text-xl font-bold flex-1">Create a workout</h1>
          </Link>
          <Button className="bg-primary text-primary-foreground">
            <Save className="size-5" />
            Save
          </Button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6 max-w-lg mx-auto">
        {/* Workout name */}
        <Card className="gap-4">
          <CardHeader>
            <CardTitle className="text-lg">Workout name</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Ex: Full Body, Upper body EMOM, Legs day..."
              className="text-sm"
            />
          </CardContent>
        </Card>

        {/* Workout details */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Dumbbell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Exercices</p>
              <p className="text-sm font-semibold">X</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Durée</p>
              <p className="text-sm font-semibold">XX mins</p>
            </div>
          </div>
        </div>

        {/* Empty exercices */}
        <Card className="bg-muted/50 border-dashed">
          <CardContent className="p-12 text-center">
            <Dumbbell className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground text-sm">
              Add exercises to build your workout
            </p>
          </CardContent>
        </Card>

        {/** Workout exercises list */}
        <div>
          <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
          >
            <SortableContext items={items} strategy={rectSortingStrategy}>
              {items.map((id) => (
                <div key={id} className="mb-4">
                  <SortableItem key={id} id={id} value={id} />
                </div>
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>

      {/* CTA add workout exercises */}
      <Button
        className="fixed bottom-22 right-4 rounded-full p-6 shadow-md"
        size="icon"
        asChild
      >
        <Link href="/dashboard/workout/create/select-exercice">
          <Plus className="size-5" />
        </Link>
      </Button>
    </div>
  );
}
