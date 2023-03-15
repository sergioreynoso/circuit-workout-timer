import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { Cancel, Action } from '@radix-ui/react-alert-dialog';
import * as Label from '@radix-ui/react-label';
import React, { useRef, useState } from 'react';
import useActivityMutation from '../../hooks/reactQueryHooks/useActivityMutation';
import { formatTime } from '../../lib/formatTime';
import { FormattedActivity } from '../../lib/formatWorkout';
import AlertDialog from '../alertDialog/alertDialog';
import Button from '../button/button';
import CircleButton from '../circleButton/circleButton';
import Input from '../input';
import Slider from '../slider/slider';

type Props = {
  activity: FormattedActivity;
};

const EditActivityDialog = ({ activity }: Props) => {
  const [formValues, setFormValues] = useState({ name: activity.name, duration: activity.duration });
  const { updateActivity } = useActivityMutation(activity.workoutId as string); //TODO:Improve activity types
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const onSaveHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (formRef.current) formRef.current.requestSubmit();
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    updateActivity.mutate(
      {
        ...activity,
        name: formValues.name,
        duration: formValues.duration,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
      }
    );
  };

  function TriggerButton() {
    return (
      <AlertDialogPrimitive.Trigger asChild>
        <CircleButton intent="edit" />
      </AlertDialogPrimitive.Trigger>
    );
  }

  return (
    <AlertDialog TriggerButton={TriggerButton} isOpen={isOpen} setIsOpen={setIsOpen} title="Edit Activity">
      <div className="flex flex-col p-6">
        {updateActivity.isLoading && (
          <div className="absolute top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center bg-gray-900/95 ">
            <p className="text-xl font-bold text-gray-300">Updating Activity...</p>{' '}
          </div>
        )}

        <form ref={formRef} onSubmit={onFormSubmit} className="mt-2 flex flex-grow flex-col items-start gap-8">
          <Input
            type="text"
            label="Name"
            name="name"
            value={formValues.name}
            onChange={e => setFormValues(prev => ({ ...prev, name: e.currentTarget.value }))}
            autoComplete={'off'}
            required={true}
            maxLength={18}
          />
          <div className="w-full ">
            <Label.Root className="w-full text-base font-normal leading-6 text-gray-300">{'Duration'}</Label.Root>
            <div className="mt-2 flex items-center gap-8">
              <p className="w-16 text-end text-2xl font-bold text-green-500">{formatTime(formValues.duration)}</p>
              <div className="flex flex-grow items-center gap-2">
                <CircleButton
                  intent="decrement"
                  onClick={e => {
                    e.preventDefault();
                    setFormValues(prev => ({ ...prev, duration: prev.duration - 1000 }));
                  }}
                />
                <Slider
                  defaultValue={5000}
                  min={5000}
                  max={300000}
                  step={1000}
                  value={[formValues.duration]}
                  onValueChange={(value: number[]) => setFormValues(prev => ({ ...prev, duration: value[0] }))}
                />
                <CircleButton
                  intent="increment"
                  onClick={e => {
                    e.preventDefault();
                    setFormValues(prev => ({ ...prev, duration: prev.duration + 1000 }));
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex w-full justify-end gap-4">
            <Cancel asChild>
              <button className="text-md flex h-12 items-center justify-center gap-2 rounded-lg px-4 font-bold leading-7 sm:px-8 ">
                Cancel
              </button>
            </Cancel>
            <Action asChild>
              <Button intent="secondary" onClick={onSaveHandler}>
                Save
              </Button>
            </Action>
          </div>
        </form>
      </div>
    </AlertDialog>
  );
};

export default EditActivityDialog;
