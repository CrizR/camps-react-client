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
import {createUserIfNotExist} from "./services/UserService";
import {setCurrentUserAction} from "./actions/UserActions";


const rootReducer = combineReducers({
    DashboardReducer,
    UserReducer,
    TripsReducer
});

const store = createStore(
    rootReducer,
);


function App() {
    const {isLoading, isAuthenticated, user, getAccessTokenSilently} = useAuth0();

    if (isLoading) {
        return <LoadingComponent/>
    }

    if (isAuthenticated && !!user) {
        getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH_AUDIENCE,
        }).then((token) => {
            createUserIfNotExist(user, token)
        })
    }

    return (
        <div className="App ap">
            <HttpsRedirect>
                <Provider store={store}>
                    <Router>
                        {isAuthenticated ?
                            <>
                                <Route exact path="/" component={DashboardContainer}/>
                                <ProtectedRoute path="/dashboard/" exact component={DashboardContainer}/>
                                <ProtectedRoute path='/profile' exact component={ProfileContainer}/>
                                <ProtectedRoute path='/campground/:id' exact component={(routerProps) =>
                                    <CampgroundContainer id={routerProps.match.params.id}/>}/>
                            </>
                            :
                            <>
                                <Route exact path="/" component={Home}/>
                                <Route path='/profile/:id' exact component={ProfileContainer}/>
                                <Route path="/dashboard/" exact component={DashboardContainer}/>
                                <Route path='/campground/:id' exact component={(routerProps) =>
                                    <CampgroundContainer id={routerProps.match.params.id}/>}/>
                            </>
                        }


                    </Router>
                </Provider>
            </HttpsRedirect>
        </div>
    );
}

export default App;
