import * as LabelPrimitive from "@radix-ui/react-label";

import React, { useId } from "react";
import Button from "../button";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import { Box, Flex } from "../layout";
import { styled } from "../../styles/stitches.congif";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  onIncrease: () => void;
  onDecrease: () => void;
}

const StepperInput = ({
  label,
  onIncrease,
  onDecrease,
  ...delegated
}: Props) => {
  const id = useId();

  return (
    <Flex direction="column" css={{ gap: "$sm", paddingBlock: "$xl" }}>
      <Label htmlFor={id}>{label}</Label>
      <Flex css={{ gap: "$lg" }}>
        <Button type="button" onClick={onDecrease}>
          <MinusIcon />
          <VisuallyHidden.Root>Decrease number of sets</VisuallyHidden.Root>
        </Button>
        <Input type="number" id={id} {...delegated} />
        <Button type="button" onClick={onIncrease}>
          <PlusIcon />
          <VisuallyHidden.Root>Increase number of sets</VisuallyHidden.Root>
        </Button>
      </Flex>
    </Flex>
  );
};
const Label = styled(LabelPrimitive.Root, {
  fontSize: "$md",
  fontWeight: "$700",
  color: "$gray-12",
  userSelect: "none",
  lineHeight: "$100",
});

const Input = styled("input", {
  flex: "1",
  textAlign: "center",
  "&::-webkit-outer-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
  "&::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
  "&[type=number]": {
    "-moz-appearance": "textfield",
  },
});

export default StepperInput;
