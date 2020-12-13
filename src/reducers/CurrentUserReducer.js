import {
  SET_CURRENT_USER,
  UPDATE_USER,
  SET_CURRENT_USER_BY_ADMIN
} from "../actions/CurrentUserActions";

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case SET_CURRENT_USER_BY_ADMIN: {
      return {
        ...state,
        userA: action.payload,
      };
    }
    case UPDATE_USER: {
      return {
        ...state,
        user: action.user,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
