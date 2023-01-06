import { styled } from "../../styles/stitches.congif";

export const Box = styled("div");

export const Container = styled("div", {
  padding: "0 $xl",
  maxWidth: "$bp-md",
  margin: "auto",
  "@less-sm": {
    padding: "$lg",
  },
});

export const Flex = styled("div", {
  display: "flex",
  variants: {
    direction: {
      rowCenterX: {
        justifyContent: "center",
      },
      rowCenterY: {
        alignItems: "center",
      },
      rowCenterXCenterY: {
        justifyContent: "center",
        alignItems: "center",
      },
      column: {
        flexDirection: "column",
      },
    },
  },
});

export const FooterContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "80px",
  backgroundColor: "$primary-02",
  "@less-sm": {
    position: "fixed",
    right: "0",
    left: "0",
    bottom: "0",
  },
});
