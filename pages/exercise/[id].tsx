import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { styled } from "../../styles/stitches.congif";

const Exercise = () => {
  const router = useRouter();
  const { id: workoutId } = router.query;

  return (
    <Wrapper>
      {" "}
      <Header>
        <Heading1>Edit Exercise</Heading1>
        <Link href={`/editWorkout/${workoutId as string}`}>
          <Back>Back</Back>
        </Link>
      </Header>
    </Wrapper>
  );
};

const Wrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "24px",
});

const Header = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "$lg",
  padding: "$2x",
});

const Heading1 = styled("h1", {
  marginBottom: "$xl",
});

const Back = styled("a", {
  color: "$primary-09",
  cursor: "pointer",
});

export default Exercise;
