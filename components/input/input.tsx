import * as LabelPrimitive from "@radix-ui/react-label";
import React, { useId } from "react";
import { styled } from "../../styles/stitches.congif";
import { Flex } from "../layout";

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
}

const Input = ({ label, ...delegated }: Props) => {
  const id = useId();

  return (
    <Flex direction="column" css={{ gap: "$sm" }}>
      <Label htmlFor={id} css={{ lineHeight: "$100" }}>
        {label}
      </Label>
      <InputField id={id} {...delegated} />
    </Flex>
  );
};

const InputField = styled("input", {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 $sm",
  height: 35,
  fontSize: 15,
  lineHeight: 1,
  color: "$gray-12",
  backgroundColor: "$gray-05",
  "&:focus": { boxShadow: `0 0 0 2px gray` },
});

const Label = styled(LabelPrimitive.Root, {
  fontSize: 15,
  fontWeight: "$700",
  color: "$gray-12",
  userSelect: "none",
});

export default Input;
