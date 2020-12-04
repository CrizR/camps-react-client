import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import {useAuth0} from "@auth0/auth0-react";
import DashboardReducer from "./reducers/DashboardReducer";
import UserReducer from "./reducers/UserReducer";
import ProtectedRoute from "./auth/ProtectedRoute";
import LoadingComponent from "./components/loading/LoadingComponent";
import HttpsRedirect from 'react-https-redirect';
import DashboardContainer from "./containers/dashboard/DashboardContainer";
import TripsReducer from "./reducers/TripsReducer";
import ProfileContainer from "./containers/profile/ProfileContainer";
import CampgroundContainer from "./containers/campground/CampgroundContainer";
import Home from "./containers/home/Home";


const rootReducer = combineReducers({
    DashboardReducer,
    UserReducer,
    TripsReducer
});

const store = createStore(
    rootReducer,
);


// TODO: Add a homepage that you login from
// TODO: add routing for profile page
// TODO: Make view of Campsite not a protected route
function App() {
    const {isLoading} = useAuth0();

    if (isLoading) {
        return <LoadingComponent/>
    }

    return (
        <div className="App ap">
            <HttpsRedirect>
                <Provider store={store}>
                    <Router>
                        <Route exact path="/" component={Home}/>
                        <ProtectedRoute path="/dashboard/" exact component={DashboardContainer}/>
                        <ProtectedRoute path='/profile' exact component={ProfileContainer}/>
                        <ProtectedRoute path='/campground/:id' exact component={(routerProps) =>
                            <CampgroundContainer id={routerProps.match.params.id}/>}/>
                    </Router>
                </Provider>
            </HttpsRedirect>
        </div>
    );
}

export default App;
