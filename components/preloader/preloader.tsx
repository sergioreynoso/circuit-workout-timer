import React from "react";
import { styled } from "../../styles/stitches.congif";

const Preloader = ({ label = "preloader" }: { label: string }) => {
  return <Plex>{label}</Plex>;
};

export default Preloader;

const Plex = styled("div", {
  display: "flex",
  height: "100%",
});
