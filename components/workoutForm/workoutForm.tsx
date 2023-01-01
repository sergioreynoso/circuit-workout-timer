import React, { useReducer } from "react";
import { styled } from "../../styles/stitches.congif";
import Input from "../input/input";
import { Flex } from "../layout";

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
// make each action it's own type
// type Action<T> = {type: 'ACTION_TYPE', payload: T} | {type: 'ACTION_B, payload: T}

// type FormActions = {
//   type: "NAME" | "SET_COUNT" | "SET_REST_MIN" | "SET_REST_SEC";
//   payload: string | number;
// };

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
    <Flex
      as="form"
      direction="column"
      {...delegated}
      css={{
        position: "relative",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "$lmd",
        gap: "$xl",
        "@less-sm": {
          paddingBottom: "$lg",
        },
      }}
      onSubmit={onFormSubmit}>
      <Input
        label="Workout Name"
        type="text"
        name="name"
        value={state.name}
        onChange={(e) =>
          dispatch({ type: "NAME", payload: e.currentTarget.value })
        }
        placeholder=""
        required={true}
        autoComplete="off"
      />
      <Input
        label="Sets"
        type="number"
        name="set"
        value={state.setCount}
        onChange={(e) =>
          dispatch({
            type: "SET_COUNT",
            payload: Number(e.currentTarget.value),
          })
        }
        placeholder=""
        min={1}
        max={100}
      />
      <FieldSet>
        <Legend>Rest between sets</Legend>
        <Input
          label="Min"
          type="number"
          name="rest"
          min={0}
          max={5}
          value={state.setRestMin}
          onChange={(e) =>
            dispatch({
              type: "SET_REST_MIN",
              payload: Number(e.currentTarget.value),
            })
          }
        />
        <Input
          label="sec"
          type="number"
          name="rest"
          min={secondsInputMinValue}
          max={60}
          value={state.setRestSec}
          onChange={(e) =>
            dispatch({
              type: "SET_REST_SEC",
              payload: Number(e.currentTarget.value),
            })
          }
        />
      </FieldSet>
    </Flex>
  );
};

const FieldSet = styled("fieldset", {
  border: "none",
  display: "flex",
  gap: "$2x",
});

const Legend = styled("legend", {
  fontSize: "$lg",
  fontWeight: "$700",
  padding: "$lg",
});

export default WorkoutForm;
