import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { Cancel, Title } from '@radix-ui/react-alert-dialog';
import { PlusIcon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { FormattedActivity } from '../../hooks/useFormatWorkout';
import { WorkoutWithActivities } from '../../types/workout';
import AlertDialog from '../alertDialog/alertDialog';
import Button from '../button/button';
import Input from '../input';

type Props = {
  data: WorkoutWithActivities;
};

const AddActivityDialog = ({ data }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [{ name, duration, workoutId }, setInputValue] = useState({
    name: '',
    duration: 30,
    workoutId: data.id,
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (activity: FormattedActivity) => axios.post(`/api/v1/activity`, activity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workout', workoutId], exact: true });
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
      duration: Number(duration * 1000),
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
    <AlertDialog TriggerButton={TriggerButton} isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="items flex flex-col p-2 sm:p-4">
        <Title className="mb-4 text-xl font-semibold leading-7 text-gray-300">Add Activity</Title>
        <form onSubmit={onFormSubmit} className="flex flex-col items-start justify-center gap-4  ">
          <Input
            type="text"
            label="Exercise Name"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder=""
            required={true}
            autoComplete="off"
          />
          <Input
            type="number"
            label="Duration in seconds"
            name="duration"
            value={duration}
            onChange={handleChange}
            placeholder=""
            required={true}
          />
          <div>{mutation.isLoading && 'Updating exercise...'}</div>
          <div className="flex w-full justify-end gap-4">
            <Cancel asChild>
              <Button intent="transparent">Cancel</Button>
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
