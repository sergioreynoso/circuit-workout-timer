import * as Label from '@radix-ui/react-label';

import React, { forwardRef, useId } from 'react';

interface Props extends React.ComponentPropsWithoutRef<'input'> {
  label: string;
}

const Input = ({ label, ...delegated }: Props) => {
  const id = useId();
  return (
    <div className="flex w-full flex-col gap-3">
      <Label.Root htmlFor={id} className="text-base font-normal leading-6 text-gray-300">
        {label}
      </Label.Root>
      <input
        id={id}
        {...delegated}
        className="max-w h-12 rounded-lg border border-gray-500 bg-transparent px-4"
        autoFocus
      />
    </div>
  );
};

//TODO: Fix type errors
// const Input = forwardRef(({ label, ...props }: Props, forwardedRef) => {
//   const id = useId();
//   return (
//     <div className="flex w-full flex-col gap-3">
//       <Label.Root htmlFor={id} className="text-base font-normal leading-6 text-gray-300">
//         {label}
//       </Label.Root>
//       <input
//         id={id}
//         {...props}
//         className="max-w h-12 rounded-lg border border-gray-500 bg-transparent px-4"
//         ref={forwardedRef}
//         autoFocus
//       />
//     </div>
//   );
// });

export default Input;
