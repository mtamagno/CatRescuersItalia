import axios from "axios";

import {
  GET_ALL_CATS,
  PROFILE_LOADING,
  GET_CATS,
  GET_CATS_HANDLE
} from "./types";

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

export const getCatsByUserID = id => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/cats/user/${id}`)
    .then(res =>
      dispatch({
        type: GET_CATS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CATS,
        payload: {}
      })
    );
};

export const getCatsByProfileHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/cats/profile/${handle}`)
    .then(res =>
      dispatch({
        type: GET_CATS_HANDLE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CATS_HANDLE,
        payload: {}
      })
    );
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
