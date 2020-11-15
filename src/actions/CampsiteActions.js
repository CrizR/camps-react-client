import {createCampsite, deleteCampsite, getCampsites, updateCampsite} from "../services/CampsiteService";

export const CREATE_CAMPSITE = "CREATE_CAMPSITE";
export const UPDATE_CAMPSITE = "UPDATE_CAMPSITE";
export const DELETE_CAMPSITE = "DELETE_CAMPSITE";
export const GET_CAMPSITES = "GET_CAMPSITES";
export const SEARCH_CAMPSITES = "SEARCH_CAMPSITES";
export const SELECT_CAMPSITE = "SELECT_CAMPSITE";

export function createCampsiteAction(dispatch, user, campsiteObj, token) {
    return createCampsite(user, campsiteObj, token).then(campsite => {
        return dispatch({
            type: CREATE_CAMPSITE,
            campsite: campsite
        });
    })
}

export function updateCampsiteAction(dispatch, user, id, campsiteObj, token) {
    return updateCampsite(user, id, campsiteObj, token).then(campsite => {
        return dispatch({
            type: UPDATE_CAMPSITE,
            id: id,
            campsite: campsite
        });
    })
}

export function deleteCampsiteAction(dispatch, user, id, token) {
    return deleteCampsite(user, id, token).then(() => {
        return dispatch({
            type: DELETE_CAMPSITE,
            id: id
        });
    })
}

export function getCampsitesAction(dispatch, user, token) {
    return getCampsites(user, token).then(campsitezes => {
        return dispatch({
            type: GET_CAMPSITES,
            campsites: campsitezes
        });
    })
}

export function selectCampsiteAction(dispatch, id) {
    return dispatch({
        type: SELECT_CAMPSITE,
        id: id
    });
}

export function searchCampsitesAction(dispatch, searchTerm) {
    return dispatch({
        type: SEARCH_CAMPSITES,
        searchTerm: searchTerm,
    });
}
