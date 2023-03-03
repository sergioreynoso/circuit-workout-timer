import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

type Props = {
  TriggerButton: React.ElementType;
  children: JSX.Element;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const AlertDialog = ({ TriggerButton, children, isOpen, setIsOpen }: Props) => {
  return (
    <AlertDialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <TriggerButton />
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="fixed inset-0 bg-gray-900/80" />
        <AlertDialogPrimitive.Content className="fixed top-1/2 left-1/2 w-11/12 -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray-800 p-4 sm:w-1/3">
          {children}
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
};

export default AlertDialog;
