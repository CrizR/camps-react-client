
const apiUrl = process.env.NODE_ENV === 'production' ? "https://camps-node-server.herokuapp.com/api" : "http://localhost:8080/api";


export const getUserFromEmail = (email, token) => {
  console.log("email", email)
  console.log(`${apiUrl}/user/email/${email}`);
  return fetch(`${apiUrl}/user/email/${email}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
  .then(response => response.json())
  .then(users => {
    // console.log("AdminService found user", users.Items)
    return users.Items
  });
};
