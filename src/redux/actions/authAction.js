import { GET_CURRENT_USER, SET_CURRENT_USER } from "../reduxConstants";

const setCurrentUser = (value) => {
  return {
    type: SET_CURRENT_USER,
    payload: value,
  };
};

const getCurrentUser = (value) => {
  return {
    type: GET_CURRENT_USER,
    payload: value,
  };
};

export { setCurrentUser, getCurrentUser };
