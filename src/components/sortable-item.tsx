import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface SortableItemProps {
  id: string;
  value: React.ReactNode;
}

export function SortableItem(props: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: isDragging ? "relative" : undefined, // nécessaire pour que zIndex fonctionne
    zIndex: isDragging ? 9999 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Card>
        <CardContent className="flex items-center justify-between">
          <button {...listeners}>
            <GripVertical
              className={`size-5 ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
            />
          </button>
          {props.value}
        </CardContent>
      </Card>
    </div>
  );
}
