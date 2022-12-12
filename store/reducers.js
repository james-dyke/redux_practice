/* eslint-disable default-param-last */
import { combineReducers } from "redux";
import * as types from "./types";

const charactersReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case types.SET_CHARACTERS:
      return {
        nextPage: payload.nextPage,
        currentPage: payload.currentPage,
        characters: payload.results,
        loading: payload.loading,
      };
    case types.SET_CHARACTER_BY_ID:
      return {
        character: payload.result,
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
  data: charactersReducer,
};

export default combineReducers(reducers);
