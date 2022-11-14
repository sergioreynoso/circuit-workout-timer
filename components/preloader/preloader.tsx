import React from "react";
import { styled } from "../../styles/stitches.congif";

const Preloader = ({ label = "preloader" }: { label: string }) => {
  return <Box>{label}</Box>;
};

export default Preloader;

const Box = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  padding: "24px",
});
