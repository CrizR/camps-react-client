import Campground from "../model/CampgroundModel";

const url = "https://developer.nps.gov/api/v1/campgrounds";
const api_key = "USBMWhZ9kdFYHUbocfzPv0yJ3gPdmYvU8barIf9M";

export const getCampgrounds = (parkCode, limit = 1000, start = 0, query = "") => {

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
        .then(campgrounds => {
            return campgrounds.data.map(campsite => Campground.fromStorage(campsite))
        });
};


// They have no endpoint to retrieve a single campground :(
export const getCampground = (id) => {
    return getCampgrounds("").then(cgs => {
        let filtered = cgs.filter(cg => cg.id === id);
        if (!!filtered.length) {
            return filtered[0]
        } else {
            return []
        }
    })
};
