/* eslint-disable default-param-last */
import { combineReducers } from "redux";
import * as types from "./types";

// COUNTER REDUCER
const counterReducer = (state = 0, { type }) => {
  switch (type) {
    case types.INCREMENT:
      return state + 1;
    case types.DECREMENT:
      return state - 1;
    case types.RESET:
      return 0;
    default:
      return state;
  }
};

// QUOTE OF THE DAY
const charactersReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case types.SET_CHARACTERS:
      return {
        nextPage: payload.nextPage,
        currentPage: payload.currentPage,
        characters: payload.results,
        loading: payload.loading,
      };
    case types.LOADING:
      return {
        loading: payload.loading,
      };
    case types.RESET:
      return [];
    default:
      return state;
  }
};

// COMBINED REDUCERS
const reducers = {
  counter: counterReducer,
  quoteOfTheDay: charactersReducer,
};

export default combineReducers(reducers);
