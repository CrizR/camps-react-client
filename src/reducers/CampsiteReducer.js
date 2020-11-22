import {
    CREATE_CAMPSITE,
    DELETE_CAMPSITE,
    GET_CAMPSITES,
    SEARCH_CAMPSITES,
    SELECT_CAMPSITE,
    UPDATE_CAMPSITE
} from "../actions/CampsiteActions";


const initialState = {
    campsites: [],
    filtered: [],
    selected: {}
};


const CampsiteReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_CAMPSITES: {
            return Object.assign({}, state, {
                campsites: action.campsites,
                filtered: action.campsites
            })
        }
        case SEARCH_CAMPSITES: {
            let searchTerm = action.searchTerm.toUpperCase();
            let qs = state.campsites.filter(campsite => campsite.name.toUpperCase().includes(searchTerm));
            return Object.assign({}, state, {
                filtered: qs
            })
        }
        default:
            return state;
    }
};


export default CampsiteReducer
