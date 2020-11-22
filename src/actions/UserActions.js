export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const UPDATE_USER = "UPDATE_USER";

const transformUser = (user) => ({
  id: user.sub,
  email: user.email,
  fName: user.given_name,
  lName: user.family_name,
  picture: user.picture,
});

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: transformUser(user),
});
