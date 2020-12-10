import Trip from "../model/TripModel";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://camps-node-server.herokuapp.com/api"
    : "http://localhost:8080/api";

export const getTrips = (user, token) => {
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

export const getOwnedTrips = (user, token) => {
  return fetch(`${apiUrl}/user/${user.email}/trips/owned`, {
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

export const inviteToTrip = (user, email, tripId, token) => {
  return fetch(`${apiUrl}/user/${user.sub}/trips/${tripId}/invite`, {
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
  fetch(`${apiUrl}/user/${user.sub}/trip/${id}`, {
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

export const deleteTrip = (user, id, token) =>
  fetch(`${apiUrl}/user/${user.sub}/trip/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
