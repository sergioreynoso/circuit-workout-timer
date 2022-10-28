import React from "react";
import { styled } from "../../styles/stitches.congif";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Flex } from "../layout";

interface InputProps {
  value: string | number;
  label: string;
  name: string;
  placeholder: string;
  type: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
}

const Input = ({
  value,
  label,
  name,
  placeholder,
  type = "text",
  isRequired = false,
  onChange,
}: InputProps) => {
  return (
    <Flex layout="column" css={{ gap: "$sm" }}>
      <Label htmlFor={name} css={{ lineHeight: "$100" }}>
        {label}
      </Label>
      <InputField
        type={type}
        id={name}
        name={name}
        defaultValue={value}
        onChange={onChange}
        required={isRequired}
      />
    </Flex>
  );
};

const InputField = styled("input", {
  all: "unset",
  width: 200,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 10px",
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
