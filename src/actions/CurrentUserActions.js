import { updateUser, getUser } from "../services/UserService";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const UPDATE_USER = "UPDATE_USER";
export const GET_USER = "GET_USER";

export const transformUser = (user) => ({
  sub: user.sub,
  email: user.email,
  fName: user.fName,
  lName: user.lName,
  picture: user.picture,
  about: user.about || null,
  location: user.location || null,
  phone: user.phone || null,
});

export const setCurrentUserAction = (user) => ({
  type: SET_CURRENT_USER,
  payload: transformUser(user),
});

export function updateUserAction(dispatch, user, token) {
  updateUser(user, token).then((response) => {
    return dispatch({
      type: SET_CURRENT_USER,
      payload: response,
    });
  });
}

export function getUserAction(dispatch, user, token) {
  getUser(user, token).then(() => {
    return dispatch({
      type: GET_USER,
      user: user,
    });
  });
}

export const selectCurrentUser = (state) => state.UserReducer.user;
