import { ConfiguredExercise } from "@/types/workout";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BicepsFlexed, GripVertical, Repeat, Trash } from "lucide-react";
import Image from "next/image";
import { Card } from "./ui/card";

interface SortableItemProps {
  id: string;
  value: React.ReactNode;
  exercise?: ConfiguredExercise;
  onDelete?: () => void;
}

export function SortableItem({
  id,
  value,
  exercise,
  onDelete,
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: isDragging ? "relative" : undefined,
    zIndex: isDragging ? 9999 : undefined,
  };

  return (
    <Card ref={setNodeRef} style={style} className="p-6">
      <div className="flex items-center gap-3">
        <div
          {...attributes}
          {...listeners}
          className="flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        >
          <GripVertical className="size-5 mr-8 text-muted-foreground " />
        </div>

        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-primary/20">
          <Image
            src={exercise?.image ? `/${exercise.image}` : "/placeholder.svg"}
            alt={exercise?.name || "Exercise"}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm">{exercise?.name || "Name"}</h3>
          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <BicepsFlexed size={14} />
              <span>{exercise?.reps || "X"} reps</span>
            </div>
            <div className="flex items-center gap-1">
              <Repeat size={14} />
              <span>{exercise?.sets || "X"} sets</span>
            </div>
          </div>
        </div>

        <Trash
          className="size-5 text-primary cursor-pointer"
          onClick={onDelete}
        />
      </div>
    </Card>
  );
}
