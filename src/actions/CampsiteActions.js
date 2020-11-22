import {getCampsites} from "../services/CampsiteService";

export const CREATE_CAMPSITE = "CREATE_CAMPSITE";
export const UPDATE_CAMPSITE = "UPDATE_CAMPSITE";
export const DELETE_CAMPSITE = "DELETE_CAMPSITE";
export const GET_CAMPSITES = "GET_CAMPSITES";
export const SEARCH_CAMPSITES = "SEARCH_CAMPSITES";
export const SELECT_CAMPSITE = "SELECT_CAMPSITE";

export function selectCampsiteAction(dispatch, campsite) {
    return dispatch({
        type: SELECT_CAMPSITE,
        campsite: campsite
    });
}

export async function getCampsitesAction(dispatch, parkCode, limit, start, query) {
    return dispatch({
        type: GET_CAMPSITES,
        campsites: await getCampsites(parkCode, limit, start, query)
    });
}

export function searchCampsitesAction(dispatch, searchTerm) {
    return dispatch({
        type: SEARCH_CAMPSITES,
        searchTerm: searchTerm,
    });
}
