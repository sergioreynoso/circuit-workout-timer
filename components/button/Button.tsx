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
        color: "$primary-12",
        backgroundColor: "$primary-03",

        "&:hover": {
          backgroundColor: "$primary-04",
        },
        "&:active": {
          backgroundColor: "$primary-05",
        },
      },
      red: {
        color: "$primary-01",
        backgroundColor: "red",

        "&:hover": {
          backgroundColor: "$primary-10",
        },
        "&:active": {
          backgroundColor: "$primary-05",
        },
      },
      gray: {
        color: "$gray-11",
        backgroundColor: "$gray-03",

        "&:hover": {
          backgroundColor: "$gray-04",
        },
        "&:active": {
          backgroundColor: "$gray-05",
        },
      },
    },
  },
});

export default Button;
