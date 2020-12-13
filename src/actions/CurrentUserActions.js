import { updateUser} from "../services/UserService";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const UPDATE_USER = "UPDATE_USER";
export const GET_USER = "GET_USER";
export const SET_CURRENT_USER_BY_ADMIN = "SET_CURRENT_USER_BY_ADMIN";

export const transformUser = (user) => ({
  sub: user.sub,
  email: user.email,
  fName: user.fName,
  lName: user.lName,
  picture: user.picture,
  about: user.about || null,
  location: user.location || null,
  phone: user.phone || null,
  admin: user.admin || "false"
});

export const setCurrentUserAction = (user) => ({
  type: SET_CURRENT_USER,
  payload: transformUser(user),
});

export function updateUserAction(dispatch, user, token) {
  updateUser(user, token).then((response) => {
    return dispatch({
      type: UPDATE_USER,
      payload: response,
    });
  });
}

export function updateUserActionByAdmin(dispatch, user, token) {
  updateUser(user, token).then((response) => {
    return dispatch({
      type: SET_CURRENT_USER_BY_ADMIN,
      payload: response,
    });
  });
}


export const selectCurrentUser = (state) => state.UserReducer.user;
