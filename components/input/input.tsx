import * as Label from '@radix-ui/react-label';

import React, { useId } from 'react';

interface Props extends React.ComponentPropsWithoutRef<'input'> {
  label: string;
}

const Input = ({ label, ...delegated }: Props) => {
  const id = useId();
  return (
    <div className="flex w-full flex-col gap-3">
      <Label.Root htmlFor={id} className="text-base font-semibold leading-6 text-gray-300">
        {label}
      </Label.Root>
      <input
        id={id}
        {...delegated}
        maxLength={18}
        className="max-w h-12 rounded-lg border border-gray-500 bg-transparent px-4"
      />
    </div>
  );
};

export default Input;
