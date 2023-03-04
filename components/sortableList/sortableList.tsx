import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ReactNode, useState } from 'react';
import updateDisplaySeq from '../../lib/updateDisplaySeq';

type BaseItem = {
  id: UniqueIdentifier;
};

type Props<T> = {
  items: T[];
  onDragEnd(items: T[]): void;
  renderItem(item: T): ReactNode;
};

const SortableList = <T extends BaseItem>({ items, onDragEnd, renderItem }: Props<T>) => {
  const [active, setActive] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActive(active.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over.id);
      const sortedArray = arrayMove(items, oldIndex, newIndex);
      const updatedDisplaySeq = updateDisplaySeq(sortedArray);
      onDragEnd(updatedDisplaySeq);
    }
    setActive(null);
  }

  const overlayItem = (items: T[], id: UniqueIdentifier) => {
    const item = items.find(item => item.id === id);
    return item ? renderItem(item) : null;
  };

  return (
    <div className="mb-4 sm:max-h-80 sm:overflow-y-auto sm:scroll-auto">
      <DndContext
        id="0"
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <ul className="flex flex-col gap-3">{items.map(item => renderItem(item))}</ul>
        </SortableContext>
        <DragOverlay className="rounded-lg bg-gray-700 shadow-xl">{active && overlayItem(items, active)}</DragOverlay>
      </DndContext>
    </div>
  );
};

export default SortableList;
