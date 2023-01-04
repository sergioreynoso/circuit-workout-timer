import { styled } from "../../styles/stitches.congif";

const Button = styled("button", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minWidth: "45px",
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
        color: "$primary-01",
        backgroundColor: "$primary-09",

        "&:hover": {
          backgroundColor: "$primary-10",
        },
        "&:active": {
          backgroundColor: "$primary-11",
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
      transparent: {
        color: "$secondary-12",
        backgroundColor: "transparent",
        padding: "$xs",
      },
      ellipse: {
        padding: "0",
        width: "45px",
        height: "45px",
        borderRadius: "50%",
      },
    },
  },
});

export default Button;
