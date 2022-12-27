import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Exercise } from "@prisma/client";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { formatTime } from "../../lib/formatTime";
import { styled } from "../../styles/stitches.congif";
import Button from "../button";
import DeleteActivityDialog from "../deleteActivityDialog";
import EditActivityDialog from "../editActivityDialog";
import { Flex } from "../layout";

type Props = {
  activity: Exercise;
};

export const ActivityListItem = ({ activity }: Props) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: activity.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Flex
      ref={setNodeRef}
      style={style}
      css={{
        justifyContent: "space-between",
        alignItems: "center",
        gap: "$md",
        padding: "$md",
        color: "$primary-12",
        backgroundColor: "$primary-03",
      }}>
      <ItemTitle>{activity.exercise_name}</ItemTitle>

      <Flex
        css={{
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "$sm",
        }}>
        <ListItemDuration>{formatTime(activity.duration)}</ListItemDuration>
        <EditActivityDialog activity={activity} />
        <DeleteActivityDialog activityId={activity.id} />
        <Button
          colors="transparent"
          {...attributes}
          {...listeners}
          css={{
            cursor: "grab",
            "&:active": {
              cursor: "grabbing",
            },
          }}>
          <CaretSortIcon />
        </Button>
      </Flex>
    </Flex>
  );
};

const ItemTitle = styled("p", {
  fontWeight: "$700",
  lineHeight: "$150",
  userSelect: "none",
});

const ListItemDuration = styled("span", {
  userSelect: "none",
});

export default ActivityListItem;
