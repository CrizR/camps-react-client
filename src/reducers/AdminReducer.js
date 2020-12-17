import {UPDATE_USER_A} from "../actions/AdminActions";

const searchUserWithEmail = "SEARCH_USER_EMAIL"

const initialState = {
  email: "",
  users: undefined,
};


const AdminReducer = (state = initialState, action) => {
switch (action.type) {
  case searchUserWithEmail:
    return Object.assign({},state,{
      ...state,
      users: action.users,
      email: action.email
    })
  case UPDATE_USER_A: {
    return {
      ...state,
      user: action.user,
    };
  }
  default:
    return state;
}
}

export default AdminReducer
