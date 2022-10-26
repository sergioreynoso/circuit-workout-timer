import React from "react";
import { styled } from "../../styles/stitches.congif";

const Button = styled("button", {
  border: "none",
  borderRadius: "$md",
  padding: "$md $xl",
  cursor: "pointer",
  fontWeight: "$700",
  color: "$primary-12",
  backgroundColor: "$gray-12",

  "&:hover": {
    backgroundColor: "$gray-10",
  },
  "&:active": {
    backgroundColor: "$gray-11",
  },
  variants: {
    color: {
      violet: {
        color: "$primary-01",
        backgroundColor: "$primary-09",

        "&:hover": {
          backgroundColor: "$primary-10",
        },
        "&:active": {
          backgroundColor: "$primary-05",
        },
      },
    },
  },
});

export default Button;
