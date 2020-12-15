import Trip from "../model/TripModel";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://camps-node-server.herokuapp.com/api"
    : "http://localhost:8080/api";

export const getInvitedTrips = (user, token) => {
  return fetch(`${apiUrl}/user/${user.email}/trips`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((trips) => {
      console.log(trips);
      return trips.map((trip) => Trip.fromStorage(trip));
    });
};

export const getTripsForCampground = (campgroundId) => {
    return fetch(`${apiUrl}/campground/${campgroundId}/trips`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((trips) => {
            return trips.map((trip) => Trip.fromStorage(trip));
        });
};

export const getOwnedTrips = (user, token) => {
  return fetch(`${apiUrl}/user/${user.sub}/trips/owned`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((trips) => {
      return trips.map((trip) => Trip.fromStorage(trip));
    });
};

export const inviteToTrip = (userId, email, tripId, token) => {
  return fetch(`${apiUrl}/user/${userId}/trips/${tripId}/invite`, {
    method: "POST",
    body: JSON.stringify({ email: email }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => response.json());
};

export const createTrip = (user, trip, token) =>
  fetch(`${apiUrl}/user/${user.sub}/trips`, {
    method: "POST",
    body: JSON.stringify(trip),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((trip) => Trip.fromStorage(trip));

export const updateTrip = (user, id, trip, token) =>
  fetch(`${apiUrl}/user/${user.sub}/trips/${id}`, {
    method: "PUT",
    body: JSON.stringify(trip),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((trip) => Trip.fromStorage(trip));

export const deleteTrip = (id, token) =>
  fetch(`${apiUrl}/trips/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
