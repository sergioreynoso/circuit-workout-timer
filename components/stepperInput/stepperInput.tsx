import * as LabelPrimitive from "@radix-ui/react-label";

import React, { useId, useState } from "react";
import Button from "../button";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import { Box, Flex } from "../layout";
import { styled } from "../../styles/stitches.congif";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

interface Props {
  label: string;
  min: number;
  max: number;
  initialValue: number;
  handleChange: (value: number) => void;
}

const StepperInput = ({
  label,
  min,
  max,
  initialValue,
  handleChange,
}: Props) => {
  const id = useId();
  const [value, setValue] = useState(() => initialValue);

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = Number(e.currentTarget.value);
    setValue(inputValue);
    handleChange(inputValue);
  }

  function onClickHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const inputName = e.currentTarget.name;
    let newValue = value;

    if (inputName === "increment")
      newValue = newValue < max ? newValue + 1 : max;
    if (inputName === "decrement")
      newValue = newValue > min ? newValue - 1 : min;

    setValue(newValue);
    handleChange(newValue);
  }

  return (
    <Flex
      direction="column"
      css={{ gap: "$sm", paddingBlock: "$xl", maxWidth: "200px", flex: "1" }}>
      <Label htmlFor={id}>{label}</Label>
      <Flex css={{ gap: "$lg" }}>
        <Button type="button" name="decrement" onClick={onClickHandler}>
          <MinusIcon />
          <VisuallyHidden.Root>Decrease number of sets</VisuallyHidden.Root>
        </Button>
        <Input
          type="number"
          id={id}
          value={value}
          min={min}
          max={max}
          onChange={onChangeHandler}
        />
        <Button type="button" name="increment" onClick={onClickHandler}>
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
  width: "40px",
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
