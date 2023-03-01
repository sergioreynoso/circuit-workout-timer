import { ComponentPropsWithoutRef, ReactNode } from 'react';

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
} as const;

interface Props extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  intent: keyof typeof variant;
}

const Button = ({ intent = 'primary', children, ...props }: Props) => {
  return (
    <button
      className={`
     flex h-14 items-center justify-center gap-2 rounded-lg px-4 sm:px-8 ${variant[intent].text} ${variant[intent].bg} text-md font-bold leading-7  ${variant[intent].hover.bg} ${variant[intent].hover.text}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
