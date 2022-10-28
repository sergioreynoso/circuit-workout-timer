import { styled } from "../../styles/stitches.congif";

export const Box = styled("div");

export const Flex = styled("div", {
  display: "flex",
  variants: {
    layout: {
      column: {
        flexDirection: "column",
      },
    },
  },
});
