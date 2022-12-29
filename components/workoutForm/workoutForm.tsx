import React, { useState } from "react";
import Input from "../input/input";
import { Flex } from "../layout";

interface Props extends React.ComponentPropsWithoutRef<"form"> {
  name: string;
  set: number;
  rest: number;
  onSubmitCallback: (name: string, set: number, rest: number) => void;
}

const WorkoutForm = ({
  name,
  set,
  rest,
  onSubmitCallback,
  ...delegated
}: Props) => {
  const [formValues, setFormValues] = useState(() => ({
    name: name,
    set: set,
    rest: Math.round(rest / 1000),
  }));

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitCallback(formValues.name, formValues.set, formValues.rest);
  };

  return (
    <Flex
      as="form"
      direction="column"
      {...delegated}
      css={{
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        padding: "$lmd",
        gap: "$xl",
        "@less-sm": {
          paddingBottom: "$lg",
        },
      }}
      onSubmit={onFormSubmit}>
      <Input
        label="Workout Name"
        type="text"
        name="name"
        value={formValues.name}
        onChange={handleOnChange}
        placeholder=""
        required={true}
        autoComplete="off"
      />
      <Input
        label="Sets"
        type="number"
        name="set"
        value={formValues.set}
        onChange={handleOnChange}
        placeholder=""
      />
      <Input
        label="Set rest in seconds"
        type="number"
        name="rest"
        value={formValues.rest}
        onChange={handleOnChange}
        placeholder=""
      />
    </Flex>
  );
};

export default WorkoutForm;
