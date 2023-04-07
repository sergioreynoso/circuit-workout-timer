import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';

const variant = {
  primary: {
    text: 'text-amber-900',
    bg: 'bg-amber-400',
    hover: {
      text: 'hover:text-amber-900',
      bg: 'hover:bg-amber-300',
    },
  },
  secondary: {
    text: 'text-green-800',
    bg: 'bg-green-400',
    hover: {
      text: 'hover:text-green-800',
      bg: 'hover:bg-green-300',
    },
  },
  transparent: {
    text: 'text-gray-400',
    bg: '',
    hover: {
      text: 'hover:text-gray-300',
      bg: '',
    },
  },
  delete: {
    text: 'text-red-900',
    bg: 'bg-red-300/90',
    hover: {
      text: 'hover:text-red-900',
      bg: 'hover:bg-red-300',
    },
  },
} as const;

interface Props extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  intent?: keyof typeof variant;
  disabled?: boolean;
  className?: string;
}

//eslint-disable-next-line react/display-name
const Button = forwardRef<HTMLButtonElement, Props>(
  ({ intent = 'primary', disabled = false, children, className = '', ...props }: Props, forwardedRef) => {
    return (
      <button
        disabled={disabled}
        className={`flex h-12 max-w-xs items-center justify-center gap-2 rounded-lg px-5 sm:px-4 ${
          variant[intent].text
        } ${variant[intent].bg} text-md font-bold leading-7  ${variant[intent].hover.bg} ${
          variant[intent].hover.text
        } ${disabled && 'opacity-25'} ${className}`}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </button>
    );
  }
);

export default Button;
