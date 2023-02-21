import * as LabelPrimitive from '@radix-ui/react-label';
import React, { useId } from 'react';
import { Flex } from '../layout';

interface Props extends React.ComponentPropsWithoutRef<'input'> {
  label: string;
}

const Input = ({ label, ...delegated }: Props) => {
  const id = useId();

  return (
    <Flex direction="column" css={{ gap: '$sm' }}>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...delegated} />
    </Flex>
  );
};

export default Input;
