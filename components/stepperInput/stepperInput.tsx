import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import * as LabelPrimitive from "@radix-ui/react-label";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import React, { useId, useState } from "react";
import { styled } from "../../styles/stitches.congif";
import Button from "../button";
import { Flex } from "../layout";

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
  const [value, setValue] = useState(() => initialValue.toString());

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    let inputValue = e.target.valueAsNumber.toString();
    if (inputValue === "NaN") inputValue = "0";

    setValue(inputValue);
    handleChange(Number(inputValue));
  }

  function onClickHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const inputName = e.currentTarget.name;
    let newValue = Number(value);

    if (inputName === "increment")
      newValue = newValue < max ? newValue + 1 : max;
    if (inputName === "decrement")
      newValue = newValue > min ? newValue - 1 : min;

    setValue(newValue.toString());
    handleChange(newValue);
  }

  return (
    <Flex
      direction="column"
      css={{ gap: "$sm", paddingBlock: "$xl", maxWidth: "200px", flex: "1" }}>
      <Label htmlFor={id}>{label}</Label>
      <Flex css={{ gap: "$lg" }}>
        <Button
          colors="ellipse"
          type="button"
          name="decrement"
          onClick={onClickHandler}>
          <DecrementIcon />
          <VisuallyHidden.Root>Decrease number of sets</VisuallyHidden.Root>
        </Button>
        <Input
          type="number"
          id={id}
          value={value}
          min={min}
          max={max}
          onChange={onChangeHandler}
          inputMode="decimal"
        />
        <Button
          colors="ellipse"
          type="button"
          name="increment"
          onClick={onClickHandler}>
          <IncrementIcon />
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
  border: "1px solid $gray-04",
  "&::-webkit-outer-spin-button,&::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
  "&[type=number]": {
    "-moz-appearance": "textfield",
  },
});

const IncrementIcon = styled(PlusIcon, {
  width: "20px",
  height: "20px",
});

const DecrementIcon = styled(MinusIcon, { width: "20px", height: "20px" });

export default StepperInput;
