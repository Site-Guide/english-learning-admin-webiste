import { GET_CURRENT_USER, SET_CURRENT_USER } from "../reduxConstants";

const initialState = {
  id: null,
  name: null,
  email: null,
  emailVerification: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...action.payload,
      };
    case GET_CURRENT_USER:
      return state;
    default:
      return state;
  }
};

export default authReducer;
