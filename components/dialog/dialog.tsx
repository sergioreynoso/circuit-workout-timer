import * as DialogPrimitive from "@radix-ui/react-dialog";
import React from "react";
import { keyframes, styled } from "../../styles/stitches.congif";
import { Cross2Icon } from "@radix-ui/react-icons";
import Button from "../button";

type Props = {
  label: string;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element[];
};

const Dialog = ({
  label = "Dialog Label",
  isOpen,
  setIsOpen,
  children,
}: Props) => {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>
        <Button color="violet">{label}</Button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <Overlay />
        <Content>
          {children}
          <DialogPrimitive.Close asChild>
            <IconButton aria-label="Close">
              <Cross2Icon />
            </IconButton>
          </DialogPrimitive.Close>
        </Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const Content = styled(DialogPrimitive.Content, {
  backgroundColor: "$primary-01",
  borderRadius: 6,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "450px",
  padding: 25,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  "&:focus": { outline: "none" },
});

const Overlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: "$grayA-09",
  position: "fixed",
  inset: 0,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

const IconButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 25,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "$primary-12",
  position: "absolute",
  top: 10,
  right: 10,

  "&:hover": { backgroundColor: "$primary-03" },
  "&:focus": { boxShadow: `0 0 0 2px $colors$primary-09` },
});

export default Dialog;
