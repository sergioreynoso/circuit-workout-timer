import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { Cancel, Action } from '@radix-ui/react-alert-dialog';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { FormattedActivity } from '../../hooks/useFormatWorkout';
import { endPoints } from '../../lib/endPoints';
import { formatTime } from '../../lib/formatTime';
import AlertDialog from '../alertDialog/alertDialog';
import Button from '../button/button';
import CircleButton from '../circleButton/circleButton';
import Input from '../input';
import Slider from '../slider/slider';

type Props = {
  activity: FormattedActivity & { id: string };
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workout', activity.workoutId] });
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
        <CircleButton intent="edit" isBg={false} />
      </AlertDialogPrimitive.Trigger>
    );
  }

  return (
    <AlertDialog TriggerButton={TriggerButton} isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex flex-col p-2 sm:p-4">
        <h1 className="text-xl font-semibold leading-7 text-gray-300">Edit Exercise</h1>
        <form onSubmit={onFormSubmit} className="mt-4 flex flex-grow flex-col items-start gap-8">
          <Input
            type="text"
            label="Exercise Name"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder=""
            required={true}
            maxLength={18}
          />
          <div className="flex w-full flex-grow  gap-3 ">
            <p className="w-16 font-bold text-green-500">{formatTime(duration[0])}</p>
            <Slider
              defaultValue={50000}
              min={5000}
              max={300000}
              step={1000}
              value={duration}
              onValueChange={(value: number[]) => setInputValue(prev => ({ ...prev, duration: value }))}
            />
          </div>
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

export default EditActivityDialog;
