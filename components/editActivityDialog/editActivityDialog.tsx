import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { Cancel } from '@radix-ui/react-alert-dialog';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { FormattedActivity } from '../../hooks/useFormatWorkout';
import { endPoints } from '../../lib/endPoints';
import AlertDialog from '../alertDialog/alertDialog';
import CircleButton from '../circleButton/circleButton';
import Input from '../input';

type Props = {
  activity: FormattedActivity & { id: string };
};

const EditActivityDialog = ({ activity }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [{ name, duration, type }, setInputValue] = useState({
    name: activity.name,
    duration: Math.round(activity.duration / 1000),
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
      duration: Number(duration * 1000),
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
          <Input
            type="number"
            label="Length"
            name="duration"
            value={duration}
            onChange={handleChange}
            placeholder=""
            required={true}
          />
          <div>{mutation.isLoading && 'Updating exercise...'}</div>

          <div className="flex justify-end gap-3">
            <Cancel asChild>
              <button>Cancel</button>
            </Cancel>
            {/* <Action asChild onClick={(event) => event.preventDefault()}> */}
            <button type="submit">Save</button>
            {/* </Action> */}
          </div>
        </form>
      </div>
    </AlertDialog>
  );
};

export default EditActivityDialog;
