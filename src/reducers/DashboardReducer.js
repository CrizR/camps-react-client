import {
    GET_CAMPSITES,
    SET_PAGE_NUMBER,
} from "../actions/DashboardActions";
import {RESULTS_PER_PAGE} from "../containers/dashboard/DashboardContainer";

const initialState = {
    campsites: [],
    filtered: [],
    pageNumber: 1,
    total: 0,
    selected: {}
};

const DashboardReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_CAMPSITES: {
            return Object.assign({}, state, {
                campsites: action.campsites.data,
                pageNumber: 1,
                filtered: action.campsites.data.slice(0, RESULTS_PER_PAGE),
                total: action.campsites.total
            })
        }

        case SET_PAGE_NUMBER: {
            return Object.assign({}, state, {
                filtered: state.campsites.slice((Math.max(action.pageNumber - 1, 0)) * RESULTS_PER_PAGE, RESULTS_PER_PAGE * action.pageNumber),
                pageNumber: action.pageNumber
            })
        }

        default:
            return state;
    }
};


export default DashboardReducer
