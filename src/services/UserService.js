import {transformUser} from "../actions/CurrentUserActions";

const apiUrl = process.env.NODE_ENV === 'production' ? "https://camps-node-server.herokuapp.com/api" : "http://localhost:8080/api";


export const getUser = (user, token) => {
    // console.log(`${apiUrl}/user/${user.sub}`);
    return fetch(`${apiUrl}/user/${user.sub}`,
        {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(user => {
            return user
        });
};

export const createUserIfNotExist = async (user, token) => {

    let existingUser = await getUser(user, token);

    if (Object.keys(existingUser).length === 0) {
        // console.log(existingUser);
        return fetch(`${apiUrl}/user/`,
            {
                method: 'POST',
                body: JSON.stringify(transformUser(user)),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(user => user)
    } else {
        return existingUser.Item;
    }
};

export const deleteUser = (id, token) =>
    fetch(`${apiUrl}/user/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
    });

// Adding update function, just to avoid confusion 
export const updateUser = async (user, token) =>
    fetch(`${apiUrl}/user/${user.sub}`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then((response) => response.json());
