import React from "react";
import { styled } from "../../styles/stitches.congif";

const Button = styled("button", {
  border: "none",
  borderRadius: "$md",
  padding: "$md $xl",
  cursor: "pointer",
  fontWeight: "$700",
  color: "$gray-01",
  backgroundColor: "$gray-12",

  "&:hover": {
    backgroundColor: "$gray-10",
  },
  "&:active": {
    backgroundColor: "$gray-11",
  },
  variants: {
    type: {
      primary: {
        color: "$text-white",
        backgroundColor: "$primary-09",

        "&:hover": {
          backgroundColor: "$primary-10",
        },
        "&:active": {
          backgroundColor: "$primary-11",
        },
      },
      secondary: {
        color: "$primary-09",
        backgroundColor: "$primary-02",
        border: "2px solid $primary-09",

        "&:hover": {
          backgroundColor: "$primary-04",
        },
        "&:active": {
          backgroundColor: "$primary-05",
        },
      },
    },
  },
});

export default Button;
