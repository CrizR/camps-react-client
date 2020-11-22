import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import "./ProfileContainerStyle.css";
import {
  Button,
  Grid,
  Segment,
  Container,
  Header,
  Image,
  Menu,
  Loader,
} from "semantic-ui-react";
import NavBarComponent from "../../components/navbar/NavBarComponent";
import { setCurrentUserAction } from "./../../actions/UserActions";
import {
  getTripsAction,
  getOwnedTripsAction,
} from "./../../actions/TripActions";

//TODO: SHOWCASE TRIPS
const ProfileContainer = () => {
  const { getAccessTokenSilently, user, logout, isAuthenticated } = useAuth0();
  const [activeItem, setActiveItem] = useState("trips");

  
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.UserReducer.user);
  const trips = useSelector((state) => state.TripsReducer.trips);
  const owned_trips = useSelector((state) => state.TripsReducer.ownedTrips);
  const isLoading = true
  //useSelector((state) => state.tripReducer.isTripsLoading);

  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(setCurrentUserAction(user));
      getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH_AUDIENCE,
      }).then((token) => {
        getTripsAction(dispatch, user, token);
        getOwnedTripsAction(dispatch, user, token);
      });
    }
  }, [isAuthenticated, user]);

  return (
    currentUser && (
      <>
        <NavBarComponent />
        <div className="camps-profile row">
          <Container>
            <Grid>
              <Grid.Column width={6}>
                <Container>
                  <Header as="h1">
                    <Image circular src={currentUser.picture} />
                    <Header.Content>
                      {currentUser.fName}
                      <Header.Subheader>{currentUser.email}</Header.Subheader>
                    </Header.Content>
                  </Header>
                  <Button
                    fluid
                    content="Logout"
                    icon="external square alternate"
                    size="small"
                    onClick={() => logout()}
                  />
                </Container>
              </Grid.Column>
              <Grid.Column width={10}>
                <div>
                  <Menu tabular attached="top">
                    <Menu.Item
                      name="Upcoming trips"
                      active={activeItem === "trips"}
                      onClick={() => setActiveItem("trips")}
                    />
                    <Menu.Item
                      name="manage trips"
                      active={activeItem === "manage"}
                      onClick={() => setActiveItem("manage")}
                    />
                  </Menu>
                  <Segment attached="bottom">
                    {isLoading ? (
                      <Loader active inline="centered">
                        Loading
                      </Loader>
                    ) : (
                      <div>
                        {activeItem === "trips" && <div></div>}
                        {activeItem === "manage" && <div></div>}
                      </div>
                    )}
                  </Segment>
                </div>
              </Grid.Column>
            </Grid>
          </Container>
        </div>
      </>
    )
  );
};

export default ProfileContainer;
