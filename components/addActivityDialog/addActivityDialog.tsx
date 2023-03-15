import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { Action, Cancel } from '@radix-ui/react-alert-dialog';
import { PlusIcon } from '@radix-ui/react-icons';
import * as Label from '@radix-ui/react-label';
import React, { useRef, useState } from 'react';
import useActivityMutation from '../../hooks/reactQueryHooks/useActivityMutation';
import { formatTime } from '../../lib/formatTime';
import { WorkoutWithActivities } from '../../types/workout';
import AlertDialog from '../alertDialog/alertDialog';
import Button from '../button/button';
import Input from '../input';
import Slider from '../slider/slider';

type Props = {
  data: WorkoutWithActivities;
};

const AddActivityDialog = ({ data }: Props) => {
  const { createActivity } = useActivityMutation(data.id);
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [{ name, duration, workoutId }, setInputValue] = useState({
    name: '',
    duration: [30000],
    workoutId: data.id,
  });

  const onSaveHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (formRef.current) formRef.current.requestSubmit();
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //TODO:Update display_seq on delete activity
    createActivity.mutate(
      {
        name: name,
        type: 'WORK',
        duration: duration[0],
        workoutId: workoutId,
        display_seq: data.activities.length,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          setInputValue(prev => ({
            ...prev,
            name: '',
          }));
        },
      }
    );
  };

  function TriggerButton() {
    return (
      <AlertDialogPrimitive.Trigger asChild>
        <Button intent="secondary">
          <PlusIcon className="h-7 w-7" /> Add Activity
        </Button>
      </AlertDialogPrimitive.Trigger>
    );
  }

  return (
    <AlertDialog TriggerButton={TriggerButton} isOpen={isOpen} setIsOpen={setIsOpen} title="Add Activity">
      <div className="flex flex-col p-6">
        {createActivity.isLoading && (
          <div className="absolute top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center bg-gray-900/95 ">
            <p className="text-xl font-bold text-gray-300">Creating New Activity...</p>{' '}
          </div>
        )}
        <form ref={formRef} onSubmit={onFormSubmit} className="mt-2 flex flex-grow flex-col items-start gap-8">
          <Input
            type="text"
            label="Name"
            name="name"
            value={name}
            onChange={e => setInputValue(prev => ({ ...prev, name: e.currentTarget.value }))}
            placeholder=""
            required={true}
            autoComplete="off"
            autoFocus
          />
          <div className="w-full ">
            <Label.Root className="w-full text-base font-normal leading-6 text-gray-300">{'Duration'}</Label.Root>
            <div className="mt-2 flex items-center gap-8">
              <p className="w-16 text-end text-2xl font-bold text-green-500">{formatTime(duration[0])}</p>
              <Slider
                defaultValue={50000}
                min={5000}
                max={300000}
                step={1000}
                value={duration}
                onValueChange={(value: number[]) => setInputValue(prev => ({ ...prev, duration: value }))}
              />
            </div>
          </div>
          <div className="flex w-full justify-end gap-4">
            <Cancel asChild>
              <Button intent="transparent">Cancel</Button>
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

export default AddActivityDialog;
