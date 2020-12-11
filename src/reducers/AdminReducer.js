const searchUserWithEmail = "SEARCH_USER_EMAIL"

const initialState = {
  email: "",
  user: [],
};


const AdminReducer = (state = initialState, action) => {
switch (action) {
  case searchUserWithEmail:
    return {
      ...state,
      user: action.user
    }
  default:
    return state;
}
}

export default AdminReducer
