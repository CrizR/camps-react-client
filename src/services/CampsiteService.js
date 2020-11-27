import Campsite from "../model/CampsiteModel";

const url = "https://developer.nps.gov/api/v1/campgrounds";
const api_key = "USBMWhZ9kdFYHUbocfzPv0yJ3gPdmYvU8barIf9M";

export const getCampsites = (parkCode, limit = 50, start = 0, query = "") => {

    let requestUrl = `${url}?parkCode=${parkCode}&parkCode=&limit=${limit}&start=${start}&api_key=${api_key}`;
    if (!!query) {
        requestUrl = `${url}?parkCode=${parkCode}&parkCode=&limit=${limit}&start=${start}&q=${query}&api_key=${api_key}`;
    }
    console.log("test");

    return fetch(requestUrl,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(campsites => {
            console.log(campsites);
            return campsites; //TODO: Use CampsiteModel
        });
};


export const getCampsite = async (campsiteId, parkCodes) => {
    let campsites = await this.getCampsites(parkCodes, 50);
    let filtered = campsites.filter(campsite => campsite.id = campsiteId);
    if (!!filtered.length) {
        return filtered[0]
    } else {
        return []
    }
};
