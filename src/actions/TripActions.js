import {createTrip, deleteTrip, getOwnedTrips, getTrips, updateTrip} from "../services/TripsService";

export const CREATE_TRIP = "CREATE_TRIP";
export const UPDATE_TRIP = "UPDATE_TRIP";
export const DELETE_TRIP = "DELETE_TRIP";
export const GET_TRIPS = "GET_TRIPS";
export const SEARCH_TRIPS = "SEARCH_TRIPS";
export const SELECT_TRIP = "SELECT_TRIP";
export const GET_OWNED_TRIPS = "GET_OWNED_TRIPS";

export function createTripAction(dispatch, user, tripObj, token) {
    return createTrip(user, tripObj, token).then(trip => {
        return dispatch({
            type: CREATE_TRIP,
            trip: trip
        });
    })
}

export function updateTripAction(dispatch, user, id, tripObj, token) {
    return updateTrip(user, id, tripObj, token).then(trip => {
        return dispatch({
            type: UPDATE_TRIP,
            id: id,
            trip: trip
        });
    })
}

export function deleteTripAction(dispatch, user, id, token) {
    return deleteTrip(user, id, token).then(() => {
        return dispatch({
            type: DELETE_TRIP,
            id: id
        });
    })
}

export function getTripsAction(dispatch, user, token) {
    return getTrips(user, token).then(tripzes => {
        return dispatch({
            type: GET_TRIPS,
            trips: tripzes
        });
    })
}


export function getOwnedTripsAction(dispatch, user, token) {
    return getOwnedTrips(user, token).then(trips => {
        return dispatch({
            type: GET_OWNED_TRIPS,
            trips: trips
        });
    })
}

export function selectTripAction(dispatch, id) {
    return dispatch({
        type: SELECT_TRIP,
        id: id
    });
}

export function searchTripsAction(dispatch, searchTerm) {
    return dispatch({
        type: SEARCH_TRIPS,
        searchTerm: searchTerm,
    });
}
