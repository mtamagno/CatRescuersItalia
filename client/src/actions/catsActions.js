import axios from "axios";

import { GET_ALL_CATS, PROFILE_LOADING } from "./types";

//Get all profiles

export const getCats = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/cats/all")
    .then(res =>
      dispatch({
        type: GET_ALL_CATS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ALL_CATS,
        payload: {}
      })
    );
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
