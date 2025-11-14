import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash } from "lucide-react";
import Image from "next/image";
import { Card } from "./ui/card";

interface SortableItemProps {
  id: string;
  value: React.ReactNode;
}

export function SortableItem({ id, value }: SortableItemProps) {
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
    position: isDragging ? "relative" : undefined, // nécessaire pour que zIndex fonctionne
    zIndex: isDragging ? 9999 : undefined,
  };

  return (
    // <div ref={setNodeRef} style={style} {...attributes}>
    //   <Card>
    //     <CardContent className="flex items-center justify-between">
    //       <button {...listeners}>
    //         <GripVertical
    //           className={`size-5 ${
    //             isDragging ? "cursor-grabbing" : "cursor-grab"
    //           }`}
    //         />
    //       </button>
    //       {props.value}
    //     </CardContent>
    //   </Card>
    // </div>
    <Card ref={setNodeRef} style={style} className="p-6">
      <div className="flex items-center gap-3">
        <div
          {...attributes}
          {...listeners}
          className="flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        >
          <GripVertical className="size-5 mr-8 text-muted-foreground " />
        </div>

        <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
          <Image src="/placeholder.svg" alt="" fill className="object-cover" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm">Name</h3>
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
            <span>X séries</span>
            <span>•</span>
            <span>X reps</span>
          </div>
        </div>

        <Trash className="size-5 text-primary cursor-pointer" />
      </div>
    </Card>
  );
}
