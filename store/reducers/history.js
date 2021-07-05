import { SET_USER_RUNS, SET_USER_HISTORY, ADD_WORKOUT, ADD_RUNS } from "../actions/types";

const initialState = {
  runs: [],
  workouts: [],
};

export const runReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_RUNS:
      return {
        ...state,
        runs: action.runs,
      };
    case SET_USER_HISTORY:
      return {
        ...state,
        workouts: action.history,
      };
    case ADD_RUNS: 
    return {
      ...state,
      runs: state.runs.concat(action.data),
    };
    case ADD_WORKOUT:
      return {
        ...state,
        history: state.workouts.concat(action.data),
      };
    default:
      return state;
  }
};
