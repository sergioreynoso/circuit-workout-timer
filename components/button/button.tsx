import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  intent: 'primary' | 'secondary';
};

function Button({ intent, children, ...delegated }: Props) {
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
  };

  return (
    <button
      className={`h-16 flex-grow rounded-2xl ${variant[intent].text} ${variant[intent].bg} text-xl font-extrabold leading-7  ${variant[intent].hover.bg} ${variant[intent].hover.text}`}
      {...delegated}
    >
      {children}
    </button>
  );
}

export default Button;
