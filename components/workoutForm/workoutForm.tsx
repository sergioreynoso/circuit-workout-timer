import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useReducer } from 'react';
import useDebounce from '../../hooks/useDebounce';
import useUpdateWorkout from '../../hooks/useUpdateWorkout';
import { formatTime } from '../../lib/formatTime';
import { formatWorkout } from '../../lib/formatWorkout';
import { getMillSeconds } from '../../lib/getMillSeconds';
import { getMin } from '../../lib/getMin';
import { getSeconds } from '../../lib/getSeconds';
import { WorkoutWithActivities } from '../../types/workout';
import Input from '../input/input';

import StepperInput from '../stepperInput/stepperInput';

interface Props extends React.ComponentPropsWithoutRef<'form'> {
  data: WorkoutWithActivities;
}

type FormReducer = {
  name: string;
  setCount: number;
  setRestMin: number;
  setRestSec: number;
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
      type: 'SET_REST_MIN';
      payload: number;
    }
  | {
      type: 'SET_REST_SEC';
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
    case 'SET_REST_MIN':
      return {
        ...state,
        setRestMin: action.payload,
      };
    case 'SET_REST_SEC':
      return {
        ...state,
        setRestSec: action.payload,
      };
    default:
      return state;
  }
}

const WorkoutForm = ({ data, ...delegated }: Props) => {
  const [state, dispatch] = useReducer(formReducer, {
    name: data.name,
    setCount: data.set_count,
    setRestMin: getMin(data.set_rest),
    setRestSec: getSeconds(data.set_rest),
  });

  const debounceState = useDebounce(state, 500);

  const mutation = useUpdateWorkout();

  const mutateWorkout = useCallback(
    (name: string, set: number, rest: number) => {
      mutation.mutate({
        id: data.id,
        name: name,
        set_count: Number(set),
        set_rest: Number(rest),
        duration: formatWorkout(data).duration,
      });
    },
    [data, mutation]
  );

  // const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   mutateWorkout(state.name, state.setCount, getMillSeconds(state.setRestMin, state.setRestSec));
  // };

  const secondsInputMinValue = state.setRestMin >= 1 ? 0 : 5;

  //TODO: Refactor without useEffect
  useEffect(() => {
    if (debounceState.name)
      mutateWorkout(
        debounceState.name,
        debounceState.setCount,
        getMillSeconds(debounceState.setRestMin, debounceState.setRestSec)
      );
  }, [debounceState]);

  //TODO: When set is one, disable set time controls
  return (
    <form {...delegated}>
      <div className={`flex flex-col justify-between gap-4`}>
        <Input
          label="Workout Name"
          type="text"
          name="name"
          value={state.name}
          onChange={e => dispatch({ type: 'NAME', payload: e.currentTarget.value })}
          required={true}
          autoComplete="off"
          maxLength={18}
        />
        <div className="mt-3 flex flex-col gap-4">
          <StepperInput
            label="Sets"
            min={1}
            max={100}
            initialValue={state.setCount}
            handleChange={value =>
              dispatch({
                type: 'SET_COUNT',
                payload: value,
              })
            }
          />
          <div className={`flex flex-col gap-4 ${state.setCount === 1 ? 'opacity-30' : ''}`}>
            <p className="mt-4 w-full flex-wrap">How long would you like to rest between sets?</p>
            <div className="flex gap-6">
              <StepperInput
                label="Minutes"
                min={0}
                max={5}
                initialValue={state.setRestMin}
                disabled={state.setCount === 1 ? true : false}
                handleChange={value =>
                  dispatch({
                    type: 'SET_REST_MIN',
                    payload: value,
                  })
                }
              />
              <StepperInput
                label="Seconds"
                min={secondsInputMinValue}
                max={60}
                initialValue={state.setRestSec}
                disabled={state.setCount === 1 ? true : false}
                handleChange={value =>
                  dispatch({
                    type: 'SET_REST_SEC',
                    payload: value,
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default WorkoutForm;
