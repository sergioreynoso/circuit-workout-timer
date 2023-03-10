import { ChevronLeftIcon, MinusIcon, Pencil1Icon, PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

const icons = {
  cancel: ChevronLeftIcon,
  edit: Pencil1Icon,
  delete: TrashIcon,
  increment: PlusIcon,
  decrement: MinusIcon,
} as const;

interface Props extends ComponentPropsWithoutRef<'button'> {
  intent: keyof typeof icons;
  description?: string;
  isBg?: boolean;
}

//eslint-disable-next-line react/display-name
const CircleButton = forwardRef<HTMLButtonElement, Props>(
  ({ intent, description = '', isBg = true, ...delegated }: Props, forwardedRef) => {
    const Icon = icons[intent];
    return (
      <button
        className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
          isBg ? 'bg-gray-800' : ''
        } hover:bg-gray-900/50`}
        {...delegated}
        ref={forwardedRef}
      >
        <Icon className="h-6 w-6 text-gray-400" />
        <VisuallyHidden.Root>{description}</VisuallyHidden.Root>
      </button>
    );
  }
);

export default CircleButton;
