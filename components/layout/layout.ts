import { styled } from "../../styles/stitches.congif";

export const Box = styled("div");

export const Flex = styled("div", {
  display: "flex",
  variants: {
    direction: {
      column: {
        flexDirection: "column",
      },
    },
  },
});
