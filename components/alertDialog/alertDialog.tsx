import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as Separator from '@radix-ui/react-separator';

type Props = {
  TriggerButton: React.ElementType;
  children: JSX.Element;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
};

const AlertDialog = ({ TriggerButton, children, isOpen, setIsOpen, title = 'Title Here' }: Props) => {
  return (
    <AlertDialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <TriggerButton />
      <AlertDialogPrimitive.Portal>
        <AlertDialogPrimitive.Overlay className="fixed inset-0 bg-black/90" />
        <AlertDialogPrimitive.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md bg-gray-800 p-4 sm:w-full">
          <AlertDialogPrimitive.Title className="text-xl font-semibold leading-7 text-gray-100">
            {title}
          </AlertDialogPrimitive.Title>
          <Separator.Root className="-mx-4 my-4 h-px bg-gray-500" decorative />
          {children}
        </AlertDialogPrimitive.Content>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  );
};

export default AlertDialog;
