import {createTrip, deleteTrip, getOwnedTrips, getTrips, updateTrip} from "../services/TripsService";

export const CREATE_TRIP = "CREATE_TRIP";
export const UPDATE_TRIP = "UPDATE_TRIP";
export const DELETE_TRIP = "DELETE_TRIP";
export const GET_TRIPS = "GET_TRIPS";
export const SEARCH_TRIPS = "SEARCH_TRIPS";
export const SELECT_TRIP = "SELECT_TRIP";
export const GET_OWNED_TRIPS = "GET_OWNED_TRIPS";
export const GET_TRIPS_PENDING = "GET_TRIPS_PENDING";
export const GET_TRIPS_FAILURE = "GET_TRIPS_FAILURE";

const setTripsPending = () => ({
    type: GET_TRIPS_PENDING,
});
  
const setTripsFailure = (error) => ({
    type: GET_TRIPS_FAILURE,
    error: error ? error.toString : "Problemo",
});

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
    try {
        dispatch(setTripsPending());
        getTrips(user, token).then(tripzes => {
            return dispatch({
                type: GET_TRIPS,
                trips: tripzes
            });
        })
    } catch (err) {
        setTripsFailure(err);
    }
}


export function getOwnedTripsAction(dispatch, user, token) {
    try {
        dispatch(setTripsPending());
        getOwnedTrips(user, token).then(trips => {
            return dispatch({
                type: GET_OWNED_TRIPS,
                trips: trips
            });
        })
    } catch (err) {
        setTripsFailure(err);
    }  
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
