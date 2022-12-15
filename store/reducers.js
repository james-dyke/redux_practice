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
    case types.SET_NEXT_PAGE_CHARACTERS:
      return {
        nextPage: payload.nextPage,
        currentPage: payload.currentPage,
        characters: [...state.characters, ...payload.results],
        loading: payload.loading,
        loadingNextPage: payload.loadingNextPage,
      };
    case types.SET_CHARACTER_BY_ID:
      return {
        characters: payload.results,
        character: payload.result,
      };
    case types.CLEAR_CHARACTER:
      return {
        ...state,
        character: {},
      };
    case types.LOADING:
      return {
        ...state,
        loading: payload.loading,
        loadingNextPage: payload.loadingNextPage,
      };
    case types.SET_TOAST_ERROR_MESSAGE:
      return {
        message: payload.errorMsg,
      };
    case types.RESET:
      return {};
    default:
      return state;
  }
};

const reducer = {
  data: charactersReducer,
};

export default combineReducers(reducer);
