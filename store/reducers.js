/* eslint-disable default-param-last */
import { combineReducers } from "redux";
import * as types from "./types";

const charactersReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case types.SET_CHARACTERS:
      console.log("set characters");
      return {
        nextPage: payload.nextPage,
        currentPage: payload.currentPage,
        characters: payload.results,
        loading: payload.loading,
        character: undefined,
      };
    case types.SET_CHARACTER_BY_ID:
      return {
        characters: payload.results,
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

const reducer = {
  data: charactersReducer,
};

export default combineReducers(reducer);
