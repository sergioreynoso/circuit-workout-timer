import * as SliderPrimitive from '@radix-ui/react-slider';
import { ComponentPropsWithoutRef, ComponentPropsWithRef, ForwardRefExoticComponent, RefAttributes } from 'react';

type Props = {
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  value: number[];
  disabled?: boolean;
  onValueChange?(value: number[]): void;
  onValueCommit?(value: number[]): void;
};

const Slider = ({ defaultValue = 50, min = 1, max = 100, step = 1, disabled = false, ...props }: Props) => {
  return (
    <SliderPrimitive.Root
      defaultValue={[defaultValue]}
      min={min}
      max={max}
      step={step}
      aria-label="Volume"
      className="relative flex h-6 flex-grow touch-none select-none items-center"
      disabled={disabled}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-0.5 flex-grow rounded-full bg-gray-700">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-gray-300" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full bg-gray-100 shadow-md focus:shadow-sm" />
    </SliderPrimitive.Root>
  );
};

export default Slider;
