import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { keyframes, styled } from "../../styles/stitches.congif";
import Button from "../button";

type Props = {
  label: string;
  children: JSX.Element;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const AlertDialog = ({ label, children, isOpen, setIsOpen }: Props) => {
  return (
    <AlertDialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogPrimitive.Trigger asChild>
        <Button color="violet">{label}</Button>
      </AlertDialogPrimitive.Trigger>
      <AlertDialogPrimitive.Portal>
        <Overlay />
        <Content>{children}</Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
};

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const Content = styled(AlertDialogPrimitive.Content, {
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

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const Overlay = styled(AlertDialogPrimitive.Overlay, {
  backgroundColor: "$grayA-09",
  position: "fixed",
  inset: 0,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

export default AlertDialog;
