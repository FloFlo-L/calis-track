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
import { ChevronLeft, Plus, Save } from "lucide-react";
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
      </div>

      {/** Workout exercises list */}
      <div>
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          <SortableContext items={items} strategy={rectSortingStrategy}>
            {items.map((id) => (
              <div key={id} className="px-4 py-2 max-w-lg mx-auto">
                <SortableItem key={id} id={id} value={id} />
              </div>
            ))}
          </SortableContext>
        </DndContext>
      </div>

      {/* CTA add workout exercises */}
      <Button
        className="fixed bottom-22 right-4 rounded-full p-6 shadow-md"
        size="icon"
      >
        <Plus className="size-5" />
      </Button>
    </div>
  );
}
