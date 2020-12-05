const apiUrl = process.env.NODE_ENV === 'production' ? "https://camps-node-server.herokuapp.com/api" : "http://localhost:8080/api";


export const getUser = (user, token) => {
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
        console.log(existingUser);
        return fetch(`${apiUrl}/user/`,
            {
                method: 'POST',
                body: JSON.stringify({"sub": user.sub, "email": user.email}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => response.json())
            .then(user => user)
    } else {
        return existingUser
    }
};


export const deleteUser = (id, token) =>
    fetch(`${apiUrl}/user/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    });
