import {getCampgrounds} from "../services/CampgroundService";
import {getUserFromEmail} from "../services/AdminService";

export const GET_CAMPGROUNDS = "GET_CAMPGROUNDS";
export const SELECT_CAMPSITE = "SELECT_CAMPSITE";
export const SET_PAGE_NUMBER = "SET_PAGE_NUMBER";
export const FILTER_CAMPSITES = "FILTER_CAMPSITES";
export const HIGHLIGHT_MODULE = "HIGHLIGHT_MODULE";
export const SEARCH_USER_EMAIL = "SEARCH_USER_EMAIL";

export function selectCampsiteAction(dispatch, campsite) {
    return dispatch({
        type: SELECT_CAMPSITE,
        campsite: campsite
    });
}

export function filterCampsitesAction(dispatch, term) {
    return dispatch({
        type: FILTER_CAMPSITES,
        searchTerm: term
    });
}

export async function setPageNumberAction(dispatch, page) {
    return dispatch({
        type: SET_PAGE_NUMBER,
        pageNumber: page
    });
}


export async function getCampgroundsAction(dispatch, parkCode, limit, start, query) {
    return dispatch({
        type: GET_CAMPGROUNDS,
        campgrounds: await getCampgrounds(parkCode, limit, start, query)
    });
}

export const highlightModule = (dispatch, highlight) =>
    dispatch({
        type: HIGHLIGHT_MODULE,
        highlight
    });

export const searchUserEmailDashboardAction = (dispatch, email, token) =>

    getUserFromEmail(email, token).then(res => {
        return dispatch({
            type: SEARCH_USER_EMAIL,
            email,
            users: res
        });
    })


