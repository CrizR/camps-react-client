import {
    CREATE_TRIP,
    DELETE_TRIP,
    GET_TRIPS,
    GET_OWNED_TRIPS,
    SELECT_TRIP,
    UPDATE_TRIP,
    GET_TRIPS_PENDING,
    GET_TRIPS_FAILURE
} from "../actions/TripActions";


const initialState = {
    trips: [],
    ownedTrips: [],
    isLoading: false,
    error: null,
};


const TripReducer = (state = initialState, action) => {

    switch (action.type) {
        case CREATE_TRIP: {
            let trips = state.trips;
            trips.push(action.trip);
            return Object.assign({}, state, {
                trips: trips,
            })
        }
        case UPDATE_TRIP: {
            let qs = state.trips.filter(trip => trip.id !== action.id);
            qs.push(action.trip);
            return Object.assign({}, state, {
                trips: qs,
            })
        }
        case DELETE_TRIP: {
            let qs = state.trips.filter(trip => trip.id !== action.id);
            return Object.assign({}, state, {
                trips: qs,
            })
        }
        case SELECT_TRIP: {
            let select = state.trips.filter(trip => trip.id === action.id);
            return Object.assign({}, state, {
                selected: !!select.length ? select[0] : {}
            })
        }

        case GET_TRIPS: {
            return Object.assign({}, state, {
                trips: action.trips,
                isTripsLoading: false,
            })
        }

        case GET_OWNED_TRIPS: {
            return Object.assign({}, state, {
                trips: action.trips,
                isTripsLoading: false,
            })
        }

        case GET_TRIPS_PENDING: {
            return {
                ...state,
                isTripsLoading: true,
            };
          }
        
        case GET_TRIPS_FAILURE: {
            return {
                ...state,
                error: action.error,
                isTripsLoading: false,
      };
    }      
        default:
            return state;
    }
};


export default TripReducer
