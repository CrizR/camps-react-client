import Campsite from "../model/CampsiteModel";
const apiUrl = process.env.NODE_ENV === 'production' ? "https://campscampsitelet-server.herokuapp.com/api" : "http://localhost:8080/api";


export const getCampsites = (user, token) => {

    return fetch(`${apiUrl}/user/${user.email}/campsite`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(campsites => {
            return campsites.map((campsite) => Campsite.fromStorage(campsite))
        });
};


export const getCampsite = (user, id, token) =>
    fetch(`${apiUrl}/user/${user.email}/campsite/${id}`,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        }
    )
        .then(response => response.json())
        .then(campsite => Campsite.fromStorage(campsite.Item));


export const createCampsite = (user, campsite, token) =>
    fetch(`${apiUrl}/user/${user.email}/campsite/`,
        {
            method: 'POST',
            body: JSON.stringify(campsite),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(campsite => Campsite.fromStorage(campsite));

export const updateCampsite = (user, id, campsite, token) =>
    fetch(`${apiUrl}/user/${user.email}/campsite/${id}`,
        {
            method: 'PUT',
            body: JSON.stringify(campsite),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(campsite => Campsite.fromStorage(campsite));


export const deleteCampsite = (user, id, token) =>
    fetch(`${apiUrl}/user/${user.email}/campsite/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    });
