const initialState = {
  users: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_USER":
      return {
        users: [...state.users, action.user],
      };
    case "DELETE_USER":
      return {
        users: state.users.filter((user) => user.email !== action.user.email),
      };
    case "UPDATE_USER":
      return {
        users: state.users.map((user) =>
          user.email === action.user.email ? action.user : user
        ),
      };
    default:
      return state;
  }
};

export default userReducer;
