import { GET_ALL_CATS, GET_CATS, GET_CATS_HANDLE } from "../actions/types";

const initialState = {
  cats: null,
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CATS:
      return {
        ...state,
        cats: action.payload,
        loading: false
      };
    case GET_ALL_CATS:
      return {
        ...state,
        cats: action.payload,
        loading: false
      };

    case GET_CATS_HANDLE:
      return {
        ...state,
        cats: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
