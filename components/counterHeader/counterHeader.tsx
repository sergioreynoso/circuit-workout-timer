import { useRouter } from "next/router";
import React, { useContext } from "react";
import { styled } from "../../styles/stitches.congif";
import Button from "../button";
import { CounterContext } from "../counterProvider/counterProvider";

type Props = {
  id: string;
  children: JSX.Element | string;
};

const CounterHeader = ({ id, children }: Props) => {
  const { isTimerDone } = useContext(CounterContext);

  const router = useRouter();
  const onCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    router.push(`/dashboard`);
  };

  const onEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    router.push(`/editWorkout/${id as string}`);
  };

  return (
    <Header>
      {!isTimerDone && <Button onClick={onCancel}>Cancel</Button>}
      <Heading>{children}</Heading>
      {!isTimerDone && <Button onClick={onEdit}>Edit</Button>}
    </Header>
  );
};

const Heading = styled("h1", {
  flex: 1,
  fontSize: "$lg",
  lineHeight: "$150",
  textAlign: "center",
});

const Header = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "$2x",
  maxWidth: "$bp-md",
  marginInline: "auto",
});

export default CounterHeader;
