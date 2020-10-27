
import { createStore } from 'redux'

export const VIRAL = 'VIRAL';
export const LOADING = 'LOADING';

export const updateViral = (payload) => ({
  type: VIRAL,
  payload: payload,
});

export const updateLoading = (payload) => ({
  type: LOADING,
  payload: payload,
});

const initialState = {
  current: [],
  history: [],
  viral: [],
  loading: true,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case VIRAL:
      return {
        ...state,
        viral: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export const store = createStore(reducer)