const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://camps-server.herokuapp.com/api"
    : "http://localhost:8080/api";

// NOT WORKING
export const getTripsForUser = (uid, token) =>
  fetch(`${apiUrl}/user/${uid}/trips`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`,
    },
  }).then((response) => response.json());

// NOT WORKING
export const getTripsOwnedByUser = (uid, token) =>
  fetch(`${apiUrl}/user/${uid}/trips/owned`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`,
    },
  }).then((response) => response.json());
