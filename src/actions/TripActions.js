import { getTripsForUser, getTripsOwnedByUser } from "../services/TripService";

export const GET_TRIPS_FOR_USER = "GET_TRIPS_FOR_USER";
export const GET_TRIPS_FOR_USER_PENDING = "GET_TRIPS_FOR_USER_PENDING";
export const GET_TRIPS_FOR_USER_FAILURE = "GET_TRIPS_FOR_USER_FAILURE";
export const GET_TRIPS_OWNED_BY_USER = "GET_TRIPS_OWNED_BY_USER";

// export const setTrips = (trips) => ({
//   type: GET_TRIPS_FOR_USER,
//   trips: trips,
// });

const setTripsPending = () => ({
  type: GET_TRIPS_FOR_USER_PENDING,
});

const setTripsSuccess = (trips) => ({
  type: GET_TRIPS_FOR_USER,
  trips: trips,
});

const setTripsFailure = (error) => ({
  type: GET_TRIPS_FOR_USER_FAILURE,
  error: error ? error.toString : "Problemo",
});


export const getTripsForUserAction = (uid, token, dispatch) => {
  try {
    dispatch(setTripsPending());
    getTripsForUser(uid, token).then((trips) => dispatch(setTripsSuccess(trips)));
  } catch (err) {
    setTripsFailure(err);
  }
};

export const getTripsOwnedByUserAction = (uid, token, dispatch) => {
    try {
      dispatch(setTripsPending());
      getTripsOwnedByUser(uid, token).then((trips) => dispatch(setTripsSuccess(trips)));
    } catch (err) {
      setTripsFailure(err);
    }
  };
