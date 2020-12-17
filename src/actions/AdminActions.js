import {getUserFromEmail} from "../services/AdminService";
import {updateUser} from "../services/UserService";
import {SET_CURRENT_USER} from "./CurrentUserActions";

export const SEARCH_USER_EMAIL = "SEARCH_USER_EMAIL";
export const UPDATE_USER_A = "UPDATE_USER_A";

export const searchUserEmailAdminAction = (dispatch, email, token) =>
  getUserFromEmail(email, token).then(res => {
    return dispatch({
      type: SEARCH_USER_EMAIL,
      email,
      users: res
    });
  })

export const updateUserAdminAction = (dispatch, user, token) => {
  updateUser(user, token).then((response) => {
    return dispatch({
      type: UPDATE_USER_A,
      payload: response,
    });
  });
}


