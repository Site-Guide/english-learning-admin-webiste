import { GET_PAGE_STATUS, SET_PAGE_STATUS } from "../reduxConstants";

const pageStatus = {
  status: "",
};

const pageStatusReducer = (state = pageStatus, action) => {
  switch (action.type) {
    case SET_PAGE_STATUS:
      return {
        status: action.payload,
      };
    case GET_PAGE_STATUS:
      return state;
    default:
      return state;
  }
};

export default pageStatusReducer;
