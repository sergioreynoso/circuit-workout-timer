import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useReducer } from 'react';
import useUpdateWorkout from '../../hooks/useUpdateWorkout';
import { formatTime } from '../../lib/formatTime';
import { formatWorkout } from '../../lib/formatWorkout';
import { WorkoutWithActivities } from '../../types/workout';
import { CircleButton } from '../circleButton';
import Input from '../input/input';
import Slider from '../slider/slider';

import StepperInput from '../stepperInput/stepperInput';

interface Props extends React.ComponentPropsWithoutRef<'form'> {
  data: WorkoutWithActivities;
  formId: string;
}

type FormReducer = {
  name: string;
  setCount: number;
  setRestDuration: number;
  workoutDuration: number;
};

type FormActions =
  | {
      type: 'NAME';
      payload: string;
    }
  | {
      type: 'SET_COUNT';
      payload: number;
    }
  | {
      type: 'SET_REST_DURATION';
      payload: number;
    }
  | {
      type: 'SET_WORKOUT_DURATION';
      payload: number;
    };

function formReducer(state: FormReducer, action: FormActions) {
  switch (action.type) {
    case 'NAME':
      return {
        ...state,
        name: action.payload,
      };
    case 'SET_COUNT':
      return {
        ...state,
        setCount: action.payload,
      };
    case 'SET_REST_DURATION':
      return {
        ...state,
        setRestDuration: action.payload,
      };
    case 'SET_WORKOUT_DURATION':
      return {
        ...state,
        workoutDuration: action.payload,
      };
    default:
      return state;
  }
}

const EditWorkoutForm = ({ data, formId, ...delegated }: Props) => {
  const router = useRouter();
  const [state, dispatch] = useReducer(formReducer, {
    name: data.name,
    setCount: data.set_count,
    setRestDuration: data.set_rest,
    workoutDuration: data.duration,
  });

  const queryClient = useQueryClient();
  const mutation = useUpdateWorkout();

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(
      {
        id: data.id,
        name: state.name,
        set_count: state.setCount,
        set_rest: state.setRestDuration,
        duration: formatWorkout(data).duration,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['workouts']);
          router.push(`/workout/${data.id}`);
        },
      }
    );
  };

  function handleOnSliderChange(value: number) {
    queryClient.setQueryData(['workout', data.id], (data: WorkoutWithActivities | undefined) => {
      if (data)
        return {
          ...data,
          set_rest: value,
        };
    });
    dispatch({ type: 'SET_REST_DURATION', payload: value });
  }

  function handleOnStepperChange(value: number) {
    queryClient.setQueryData(['workout', data.id], (data: WorkoutWithActivities | undefined) => {
      if (data) {
        return {
          ...data,
          set_count: value,
        };
      }
    });
    dispatch({
      type: 'SET_COUNT',
      payload: value,
    });
  }

  return (
    <form id={formId} onSubmit={onFormSubmit} {...delegated}>
      <div className={`flex flex-col justify-between gap-4`}>
        <Input
          label="Workout Name"
          type="text"
          name="name"
          value={state.name}
          onChange={e => dispatch({ type: 'NAME', payload: e.currentTarget.value })}
          required={true}
          autoComplete="off"
          maxLength={25}
        />
        <div className="mt-3 flex flex-col gap-4">
          <StepperInput
            label="Sets"
            min={1}
            max={100}
            initialValue={state.setCount}
            handleChange={value => handleOnStepperChange(value)}
          />
          <div className={`flex flex-col gap-4 ${state.setCount === 1 ? 'opacity-30' : ''}`}>
            <p className="mt-4 w-full flex-wrap">How long would you like to rest between sets?</p>
            <div className="mt-2 flex items-center gap-8">
              <p className="w-16 flex-grow text-left  text-2xl font-bold text-green-500 ">
                {formatTime(state.setRestDuration)}
              </p>
              <div className="flex grow-[5] items-center gap-2">
                <CircleButton
                  intent="decrement"
                  onClick={e => {
                    e.preventDefault();
                    handleOnSliderChange(state.setRestDuration - 1000);
                  }}
                />
                <Slider
                  defaultValue={50000}
                  min={5000}
                  max={300000}
                  step={5000}
                  value={[state.setRestDuration]}
                  disabled={state.setCount === 1 ? true : false}
                  onValueChange={(value: number[]) => handleOnSliderChange(value[0])}
                />
                <CircleButton
                  intent="increment"
                  onClick={e => {
                    e.preventDefault();
                    handleOnSliderChange(state.setRestDuration + 1000);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditWorkoutForm;
