import axios from "axios";

import { GET_ALL_CATS } from "./types";

export const getCats = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/cats")
    .then(res =>
      dispatch({
        type: GET_PROFILE_CATS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE_CATS,
        payload: {}
      })
    );
};

//Profile loading

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

//Clear

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

//Add cats
export const addCats = (catData, history) => dispatch => {
  axios
    .post("/api/cats", catData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete cats

export const deleteCats = id => dispatch => {
  axios
    .delete(`/api/cats/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Get all profiles

export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: {}
      })
    );
};

//Delete account & profile

export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone")) {
    axios
      .delete("/api/profile")
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};
