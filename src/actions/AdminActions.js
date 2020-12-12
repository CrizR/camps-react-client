import {getUserFromEmail} from "../services/AdminService";

export const SEARCH_USER_EMAIL = "SEARCH_USER_EMAIL";

export function searchUserEmailAdminAction(dispatch, email, token) {
  getUserFromEmail(email, token).then(res => {
    return dispatch({
      type: SEARCH_USER_EMAIL,
      email,
      user: res
    });
  })

}
