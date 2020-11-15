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
        case CREATE_CAMPSITE: {
            let campsites = state.campsites;
            campsites.push(action.campsite);
            return Object.assign({}, state, {
                campsites: campsites,
                filtered: campsites
            })
        }
        case UPDATE_CAMPSITE: {
            let qs = state.campsites.filter(campsite => campsite.id !== action.id);
            qs.push(action.campsite);
            return Object.assign({}, state, {
                campsites: qs,
                filtered: qs,
            })
        }
        case DELETE_CAMPSITE: {
            let qs = state.campsites.filter(campsite => campsite.id !== action.id);
            return Object.assign({}, state, {
                campsites: qs,
                filtered: qs
            })
        }
        case SELECT_CAMPSITE: {
            let select = state.campsites.filter(campsite => campsite.id === action.id);
            return Object.assign({}, state, {
                selected: !!select.length ? select[0] : {}
            })
        }

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
