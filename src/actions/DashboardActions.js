import {getCampsites} from "../services/CampsiteService";

export const GET_CAMPSITES = "GET_CAMPSITES";
export const SELECT_CAMPSITE = "SELECT_CAMPSITE";
export const SET_PAGE_NUMBER = "SET_PAGE_NUMBER";

export function selectCampsiteAction(dispatch, campsite) {
    return dispatch({
        type: SELECT_CAMPSITE,
        campsite: campsite
    });
}

export async function setPageNumberAction(dispatch, page) {
    return dispatch({
        type: SET_PAGE_NUMBER,
        pageNumber: page
    });
}


export async function getCampsitesAction(dispatch, parkCode, limit, start, query) {
    return dispatch({
        type: GET_CAMPSITES,
        campsites: await getCampsites(parkCode, limit, start, query)
    });
}

