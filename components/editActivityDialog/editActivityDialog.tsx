import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as Label from '@radix-ui/react-label';
import { Cancel, Action } from '@radix-ui/react-alert-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { endPoints } from '../../lib/endPoints';
import { formatTime } from '../../lib/formatTime';
import AlertDialog from '../alertDialog/alertDialog';
import Button from '../button/button';
import CircleButton from '../circleButton/circleButton';
import Input from '../input';
import Slider from '../slider/slider';
import { WorkoutWithActivities } from '../../types/workout';
import { FormattedActivity } from '../../lib/formatWorkout';

type Props = {
  activity: FormattedActivity;
};

const EditActivityDialog = ({ activity }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [{ name, duration, type }, setInputValue] = useState({
    name: activity.name,
    duration: [activity.duration],
    type: activity.type,
  });

  const queryClient = useQueryClient();
  const mutation = useMutation((data: FormattedActivity) => axios.patch(endPoints.activity, data), {
    onMutate: newData => {
      queryClient.setQueryData(['workout', activity.workoutId], (oldData: WorkoutWithActivities | undefined) => {
        if (oldData) {
          const oldActivityIndex = oldData.activities.findIndex(item => item.id === newData.id);
          oldData.activities[oldActivityIndex] = newData;
          return oldData;
        }
      });
    },
    onSuccess: () => {
      setIsOpen(false);
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
    e.stopPropagation();

    mutation.mutate({
      id: activity.id,
      name: name,
      type: type,
      duration: duration[0],
    });
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
        {mutation.isLoading && (
          <div className="absolute top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center bg-gray-900/95 ">
            <p className="text-xl font-bold text-gray-300">Updating Activity...</p>{' '}
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
            maxLength={18}
          />
          <div className="w-full ">
            <Label.Root className="w-full text-base font-normal leading-6 text-gray-300">{'Duration'}</Label.Root>
            <div className="mt-2 flex items-center gap-8">
              <p className="w-16 text-end text-2xl font-bold text-green-500">{formatTime(duration[0])}</p>
              <Slider
                defaultValue={5000}
                min={5000}
                max={300000}
                step={1000}
                value={duration}
                onValueChange={(value: number[]) => setInputValue(prev => ({ ...prev, duration: value }))}
              />
            </div>
          </div>
          <div className="flex w-full justify-end gap-4">
            <button className="text-md flex h-12 items-center justify-center gap-2 rounded-lg px-4 font-bold leading-7 sm:px-8 ">
              Cancel
            </button>
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

export default EditActivityDialog;
