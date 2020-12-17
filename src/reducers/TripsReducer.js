import {
  CREATE_TRIP,
  DELETE_TRIP,
  GET_INVITED_TRIPS,
  GET_OWNED_TRIPS,
  SELECT_TRIP,
  UPDATE_TRIP,
  GET_TRIPS_PENDING,
  GET_TRIPS_FAILURE,
} from "../actions/TripActions";

const initialState = {
  invitedTrips: [],
  ownedTrips: [],
  isLoading: false,
  isInvitedTripsLoaded: false,
  isOwnedTripsLoaded: false,
  error: null,
};

const TripReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TRIP: {
      let trips = state.ownedTrips;
      trips.push(action.trip);
      return Object.assign({}, state, {
        ownedTrips: trips,
      });
    }
    case UPDATE_TRIP: {
      let qs = state.ownedTrips.filter((trip) => trip.id !== action.id);
      qs.push(action.trip);
      return Object.assign({}, state, {
        ownedTrips: qs,
      });
    }
    case DELETE_TRIP: {
      let qs = state.ownedTrips.filter((trip) => trip.id !== action.id);
      return Object.assign({}, state, {
        ownedTrips: qs,
      });
    }
    // need to combine owned+invited?
    case SELECT_TRIP: {
      let select = state.ownedTrips.filter((trip) => trip.id === action.id);
      return Object.assign({}, state, {
        selected: !!select.length ? select[0] : {},
      });
    }

    case GET_INVITED_TRIPS: {
      return Object.assign({}, state, {
        invitedTrips: action.trips,
        isTripsLoading: false,
        isInvitedTripsLoaded: true,
      });
    }

    case GET_OWNED_TRIPS: {
      return Object.assign({}, state, {
        ownedTrips: action.trips,
        isTripsLoading: false,
        isOwnedTripsLoaded: true,
      });
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

export default TripReducer;
