import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import ProtectedRoute from "./auth/ProtectedRoute";
import DashboardContainer from "./containers/dashboard/DashboardContainer";
import ProfileContainer from "./containers/profile/ProfileContainer";
import CampgroundContainer from "./containers/campground/CampgroundContainer";
import Home from "./containers/home/Home";
import { createUserIfNotExist } from "./services/UserService";
import {
  selectCurrentUser,
  setCurrentUserAction,
} from "./actions/CurrentUserActions";
import AdminContainer from "./containers/admin/AdminContainer";

const AppRouter = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  if (isAuthenticated && !!user && !currentUser) {
    getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH_AUDIENCE,
    })
      .then((token) => {
        return createUserIfNotExist(user, token);
      })
      .then((user) => {
        dispatch(setCurrentUserAction(user));
      })
      .catch((e) => {
        debugger;
      });
  }

  console.log({ currentUser });

  return (
    <Router>
      {isAuthenticated ? (
        <>
          <Route exact path="/" component={DashboardContainer} />
          <ProtectedRoute
            path="/dashboard/"
            exact
            component={DashboardContainer}
          />
          <ProtectedRoute path="/profile" exact component={ProfileContainer} />
          <ProtectedRoute
            path="/campground/:id"
            exact
            component={(routerProps) => (
              <CampgroundContainer id={routerProps.match.params.id} />
            )}
          />
          <ProtectedRoute path='/admin' exact component={AdminContainer}/>
        </>
      ) : (
        <>
          <Route exact path="/" component={Home} />
          <Route path="/profile/:id" exact component={ProfileContainer} />
          <Route path="/dashboard/" exact component={DashboardContainer} />
          <Route
            path="/campground/:id"
            exact
            component={(routerProps) => (
              <CampgroundContainer id={routerProps.match.params.id} />
            )}
          />
        </>
      )}
    </Router>
  );
};

export default AppRouter;
