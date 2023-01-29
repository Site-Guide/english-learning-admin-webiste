import { GET_PAGE_STATUS, SET_PAGE_STATUS } from "../reduxConstants";

export const setPageStatus = (value) => {
  return {
    type: SET_PAGE_STATUS,
    payload: value,
  };
};

export const getPageStatus = (value) => {
  return {
    type: GET_PAGE_STATUS,
    payload: value,
  };
};
