import { styled } from "../../styles/stitches.congif";

const Button = styled("button", {
  border: "none",
  borderRadius: "$md",
  padding: "$md $xl",
  cursor: "pointer",
  fontWeight: "$700",
  color: "$gray-11",
  backgroundColor: "$gray-03",

  "&:hover": {
    backgroundColor: "$gray-04",
  },
  "&:active": {
    backgroundColor: "$gray-05",
  },
  variants: {
    colors: {
      primary: {
        color: "$primary-12",
        backgroundColor: "$primary-03",

        "&:hover": {
          backgroundColor: "$primary-04",
        },
        "&:active": {
          backgroundColor: "$primary-05",
        },
      },
      secondary: {
        color: "$secondary-12",
        backgroundColor: "$secondary-03",

        "&:hover": {
          backgroundColor: "$secondary-04",
        },
        "&:active": {
          backgroundColor: "$secondary-05",
        },
      },
      draggable: {
        cursor: "grab",
        color: "$secondary-12",
        backgroundColor: "transparent",
        "&:active": {
          cursor: "grabbing",
        },
      },
    },
  },
});

export default Button;
