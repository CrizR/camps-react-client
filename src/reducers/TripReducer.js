import {
  GET_TRIPS_FOR_USER,
  GET_TRIPS_OWNED_BY_USER,
  GET_TRIPS_FOR_USER_PENDING,
  GET_TRIPS_FOR_USER_FAILURE,
} from "./../actions/TripActions";

const initialState = {
  // list of trips for a current user
  trips: [],
  // trips owned by a current user
  owned_trips: [],
  isTripsLoading: false,
  trip: null,
  error: null,
};

export const tripReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRIPS_FOR_USER: {
      return {
        ...state,
        trips: action.trips,
        isTripsLoading: false,
      };
    }
    case GET_TRIPS_OWNED_BY_USER: {
      return {
        ...state,
        owned_trips: action.trips,
        isTripsLoading: false,
      };
    }
    case GET_TRIPS_FOR_USER_PENDING: {
      return {
        ...state,
        isTripsLoading: true,
      };
    }
    case GET_TRIPS_FOR_USER_FAILURE: {
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

export default tripReducer;
