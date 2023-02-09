import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
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
import { Workout } from '@prisma/client';
import { FC, ReactNode, useState } from 'react';
import updateDisplaySeq from '../../lib/updateDisplaySeq';
import { styled } from '../../styles/stitches.congif';

import { Box } from '../layout';

export type DraggableItemProps = {
  id: string;
  name: string;
  duration: number;
  display_seq?: number;
};

type Props = {
  data: Workout[];
  Item: FC<DraggableItemProps>;
  onDragEnd: (a: DraggableItemProps[]) => void;
};

const SortableList = ({ Item, data, onDragEnd }: Props) => {
  const [itemId, setItemId] = useState(null);
  const [items, setItems] = useState(() => data);

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

  function handleDragStart(event: any) {
    const { active } = event;
    setItemId(active.id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over.id) return;
    if (active.id !== over.id) {
      setItems(items => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        const sortedArray = arrayMove(items, oldIndex, newIndex);
        const updatedDisplaySeq = updateDisplaySeq(sortedArray);
        onDragEnd(updatedDisplaySeq);
        return updatedDisplaySeq;
      });
    }
    setItemId(null);
  }

  const OverlayItem = ({ items, itemId }: { items: DraggableItemProps[]; itemId: string }) => {
    const item = items.find(item => item.id === itemId);
    return item ? <Item id={item.id} name={item.name} duration={item.duration} /> : null;
  };

  return (
    <Box
      css={{
        height: '300px',
        marginTop: '$2x',
        overflowY: 'auto',
        scrollbarColor: 'red white',
      }}
    >
      <DndContext
        id="0"
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map(item => (
            <Draggable key={item.id} id={item.id}>
              <Item id={item.id} name={item.name} duration={item.duration} />
            </Draggable>
          ))}
        </SortableContext>
        <StyledDragOverLay>{itemId && <OverlayItem itemId={itemId} items={items} />}</StyledDragOverLay>
      </DndContext>
    </Box>
  );
};

function Draggable({ id, children }: { id: string | number; children: ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    listStyle: 'none',
  };
  return (
    <li ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </li>
  );
}

const StyledDragOverLay = styled(DragOverlay, {
  boxShadow: '$high',
});

export default SortableList;
