import {
    FILTER_CAMPSITES,
    GET_CAMPGROUNDS, SELECT_CAMPSITE,
    SET_PAGE_NUMBER,
} from "../actions/DashboardActions";
import {RESULTS_PER_PAGE} from "../containers/dashboard/DashboardContainer";

const initialState = {
    campgrounds: [],
    filtered: [],
    pageNumber: 1,
    total: 0,
    selected: {}
};

const DashboardReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_CAMPGROUNDS: {
            return Object.assign({}, state, {
                campgrounds: action.campgrounds,
                pageNumber: 1,
                pageResults: action.campgrounds.slice(0, RESULTS_PER_PAGE),
                filtered: action.campgrounds,
                total: action.campgrounds.total
            })
        }

        case FILTER_CAMPSITES: {
            let searchTerm = action.searchTerm.toUpperCase();
            let qs = state.campgrounds.filter(cg => cg.name.toUpperCase().includes(searchTerm));
            return Object.assign({}, state, {
                filtered: qs,
                pageNumber: 1,
                pageResults: qs.slice(0, RESULTS_PER_PAGE),
            })
        }

        case SET_PAGE_NUMBER: {
            return Object.assign({}, state, {
                pageResults: state.filtered.slice((Math.max(action.pageNumber - 1, 0)) * RESULTS_PER_PAGE, RESULTS_PER_PAGE * action.pageNumber),
                pageNumber: action.pageNumber
            })
        }

        default:
            return state;
    }
};


export default DashboardReducer
