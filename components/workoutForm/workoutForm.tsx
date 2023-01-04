import React, { useReducer } from "react";
import { styled } from "../../styles/stitches.congif";
import Input from "../input/input";
import { Box, Flex } from "../layout";
import StepperInput from "../stepperInput/stepperInput";

interface Props extends React.ComponentPropsWithoutRef<"form"> {
  name: string;
  setCount: number;
  setRest: number;
  onSubmitCallback: (name: string, setCount: number, setRest: number) => void;
}

type FormReducer = {
  name: string;
  setCount: number;
  setRestMin: number;
  setRestSec: number;
};

type FormActions =
  | {
      type: "NAME";
      payload: string;
    }
  | {
      type: "SET_COUNT";
      payload: number;
    }
  | {
      type: "SET_REST_MIN";
      payload: number;
    }
  | {
      type: "SET_REST_SEC";
      payload: number;
    };

function formReducer(state: FormReducer, action: FormActions) {
  switch (action.type) {
    case "NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "SET_COUNT":
      return {
        ...state,
        setCount: action.payload,
      };
    case "SET_REST_MIN":
      return {
        ...state,
        setRestMin: action.payload,
      };
    case "SET_REST_SEC":
      return {
        ...state,
        setRestSec: action.payload,
      };
    default:
      return state;
  }
}

export function getMin(millSec: number) {
  return Math.floor(millSec / 60000);
}

export function getSeconds(millSec: number) {
  return (millSec % 60000) / 1000;
}

export function getMillSeconds(min: number, sec: number) {
  const minToMill = min > 0 ? 60000 * min : 0;
  const secToMill = sec > 0 ? sec * 1000 : 0;
  return minToMill + secToMill;
}

const WorkoutForm = ({
  name,
  setCount,
  setRest,
  onSubmitCallback,
  ...delegated
}: Props) => {
  const [state, dispatch] = useReducer(formReducer, {
    name: name,
    setCount: setCount,
    setRestMin: getMin(setRest),
    setRestSec: getSeconds(setRest),
  });

  const secondsInputMinValue = state.setRestMin >= 1 ? 0 : 5;

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitCallback(
      state.name,
      state.setCount,
      getMillSeconds(state.setRestMin, state.setRestSec)
    );
  };

  return (
    <Box as="form" {...delegated} onSubmit={onFormSubmit}>
      <Input
        label="Workout Name"
        type="text"
        name="name"
        value={state.name}
        onChange={(e) =>
          dispatch({ type: "NAME", payload: e.currentTarget.value })
        }
        required={true}
        autoComplete="off"
      />

      <StepperInput
        label="Sets"
        min={1}
        max={100}
        initialValue={state.setCount}
        handleChange={(value) =>
          dispatch({
            type: "SET_COUNT",
            payload: value,
          })
        }
      />

      <FieldSet>
        <Legend>How long would you like to rest between sets?</Legend>
        <StepperInput
          label="Minutes"
          min={0}
          max={5}
          initialValue={state.setRestMin}
          handleChange={(value) =>
            dispatch({
              type: "SET_REST_MIN",
              payload: value,
            })
          }
        />
        <StepperInput
          label="Seconds"
          min={secondsInputMinValue}
          max={60}
          initialValue={state.setRestSec}
          handleChange={(value) =>
            dispatch({
              type: "SET_REST_SEC",
              payload: value,
            })
          }
        />
      </FieldSet>
    </Box>
  );
};

const FieldSet = styled("fieldset", {
  display: "flex",
  justifyContent: "space-between",
  border: "none",
  gap: "$2x",
});

const Legend = styled("legend", {
  fontSize: "$lg",
  fontWeight: "$700",
  lineHeight: "$150",
  padding: "$lg 0 $xs",
});

export default WorkoutForm;
