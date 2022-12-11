import * as types from "./types";

export const setCharaters = (payload) => ({
  type: types.SET_CHARACTERS,
  payload,
});

export const setLoadingState = (payload) => ({
  type: types.LOADING,
  payload,
});

// GET QUOTE OF THE DAY
export const getCharacters = (axios) => (dispatch, getState) => {
  const state = getState();
  //   if (state.quoteOfTheDay.quote) {
  //     return;
  //   }

  axios
    .get("https://rickandmortyapi.com/api/character")
    .then(({ data }) => {
      dispatch(setLoadingState({ loading: true }));
      const res = data.results;
      const nextPage = data.info.next;
      const urlParams = new URLSearchParams(nextPage);
      const currentPage = urlParams.get("page") ?? 1;
      dispatch(
        setCharaters({
          currentPage: currentPage,
          nextPage: nextPage,
          results: res,
          loading: false,
        })
      );
    })
    .catch((error) => {
      let message =
        "There was an error getting the rick and morti character information";
      if (error.response) {
        message = `Server responded with status ${error.response.status}`;
      }
      dispatch(
        setQuote({
          quote: message,
        })
      );
    });
};

// INCREMENT COUNTER BY 1
export const incrementCount = () => ({ type: types.INCREMENT });

// DECREMENT COUNTER BY 1
export const decrementCount = () => ({ type: types.DECREMENT });

// RESET CHARACTERS
export const resetCharacters = () => ({ type: types.RESET });
