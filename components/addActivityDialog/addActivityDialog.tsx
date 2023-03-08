import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as Label from '@radix-ui/react-label';
import { Cancel } from '@radix-ui/react-alert-dialog';
import { PlusIcon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { formatTime } from '../../lib/formatTime';
import { WorkoutWithActivities } from '../../types/workout';
import AlertDialog from '../alertDialog/alertDialog';
import Button from '../button/button';
import Input from '../input';
import Slider from '../slider/slider';
import { FormattedActivity } from '../../lib/formatWorkout';

type Props = {
  data: WorkoutWithActivities;
};

const AddActivityDialog = ({ data }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [{ name, duration, workoutId }, setInputValue] = useState({
    name: '',
    duration: [30000],
    workoutId: data.id,
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (activity: Omit<FormattedActivity, 'id'>) => axios.post(`/api/v1/activity`, activity),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workout', workoutId], exact: true });
      queryClient.invalidateQueries({ queryKey: ['workout', 'duration', workoutId], exact: true });
      setIsOpen(false);
      setInputValue(prev => ({
        ...prev,
        name: '',
      }));
    },
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInputValue(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({
      name: name,
      type: 'WORK',
      duration: duration[0],
      workoutId: workoutId,
      display_seq: data.activities.length + 1,
    });
  };

  function TriggerButton() {
    return (
      <AlertDialogPrimitive.Trigger asChild>
        <button className="text-md flex h-14 items-center gap-2 rounded-lg bg-green-500 px-4 font-bold leading-7 text-green-900 hover:bg-green-400 sm:px-8">
          <PlusIcon className="h-7 w-7" /> Add Activity
        </button>
      </AlertDialogPrimitive.Trigger>
    );
  }

  return (
    <AlertDialog TriggerButton={TriggerButton} isOpen={isOpen} setIsOpen={setIsOpen} title="Add Activity">
      <div className="flex flex-col p-6">
        {mutation.isLoading && (
          <div className="absolute top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center bg-gray-900/95 ">
            <p className="text-xl font-bold text-gray-300">Creating New Activity...</p>{' '}
          </div>
        )}
        <form onSubmit={onFormSubmit} className="mt-2 flex flex-grow flex-col items-start gap-8">
          <Input
            type="text"
            label="Name"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder=""
            required={true}
            autoComplete="off"
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
              <button className="text-md flex h-12 items-center justify-center gap-2 rounded-lg px-4 font-bold leading-7 sm:px-8 ">
                Cancel
              </button>
            </Cancel>
            {/* <Action asChild> */}
            <Button type="submit" intent="secondary">
              Save
            </Button>
            {/* </Action> */}
          </div>
        </form>
      </div>
    </AlertDialog>
  );
};

export default AddActivityDialog;
