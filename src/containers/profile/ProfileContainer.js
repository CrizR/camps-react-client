import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useAuth0} from "@auth0/auth0-react";
import "./ProfileContainerStyle.css";
import {Button, Container, Grid, Header, Menu,} from "semantic-ui-react";
import NavBarComponent from "../../components/navbar/NavBarComponent";
import {getOwnedTripsAction, getTripsAction} from "../../actions/TripActions";
import ProfileEditor from "../../components/profile/profileEditor";
import {TRIP_TYPES} from "./constants";
import TripsViewer from "../../components/profile/TripsViewer";

//TODO: SHOWCASE TRIPS
const ProfileContainer = () => {
  const {getAccessTokenSilently, user, logout, isAuthenticated} = useAuth0();
  const [activeItem, setActiveItem] = useState(TRIP_TYPES.allTrips);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.UserReducer.user);
  const trips = useSelector((state) => state.TripsReducer.trips);
  const owned_trips = useSelector((state) => state.TripsReducer.ownedTrips);
  const isAllTripsLoaded = useSelector(
      (state) =>
          state.TripsReducer.isAllTripsLoaded &&
          state.TripsReducer.isOwnedTripsLoaded
  );
  let isLoading = useSelector((state) => state.TripsReducer.isTripsLoading);
  const [editing, setEditing] = React.useState(false);

  useEffect(() => {
    if (isAuthenticated && user && !isAllTripsLoaded) {
      getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH_AUDIENCE,
      }).then((token) => {
        getTripsAction(dispatch, user, token);
        getOwnedTripsAction(dispatch, user, token);
      });
    }
  }, [isAuthenticated, user, isAllTripsLoaded]);

  return (
<<<<<<< HEAD
    currentUser && (
      <>
        <NavBarComponent />
        <div className="camps-profile row">
          <Container>
            <Grid>
              <Grid.Column width={5}>
                <Container>
                  <Header as="h1">
                    <Image circular src={currentUser.picture} />
                    <Header.Content>
                      {currentUser.fName}
                      <Header.Subheader>{currentUser.email}</Header.Subheader>
                    </Header.Content>
                  </Header>
                  {!editing && (
                    <Button
                      fluid
                      content="Edit Profile"
                      icon="edit"
                      size="small"
                      onClick={() => setEditing(true)}
                    />
                  )}
                  {editing && currentUser && (
                    <ProfileEditor
                      currentUser={currentUser}
                      setEditing={setEditing}
                    />
                  )}
                </Container>
              </Grid.Column>
              <Grid.Column width={11}>
                <div>
                  <Menu tabular attached="top">
                    <Menu.Item
                      name="Your Trips"
                      active={activeItem === TRIP_TYPES.ownedTrips}
                      onClick={() => setActiveItem(TRIP_TYPES.ownedTrips)}
                    />
                    <Menu.Item
                      name="Your Invites"
                      active={activeItem === TRIP_TYPES.allTrips}
                      onClick={() => setActiveItem(TRIP_TYPES.allTrips)}
                    />
                  </Menu>
                  <TripsViewer
                    trips={trips}
                    owned_trips={owned_trips}
                    isLoading={isLoading}
                    tripType={activeItem}
                  />
                </div>
              </Grid.Column>
            </Grid>
          </Container>
        </div>
      </>
    )
=======
      currentUser && (
          <>
            <NavBarComponent/>
            <div className="camps-profile row">
              <Container>
                <Grid>
                  <Grid.Column width={5}>
                    <Container>
                      <h1 className="camps-profile-banner-style">Profile</h1>
                      <Header as="h1">
                        {/*<Image circular src={currentUser.picture} />*/}
                        {/*{currentUser.fName}*/}
                        <div
                            className="camps-email-style">{currentUser.email}</div>
                        {
                          !editing &&
                          <div>
                            <div
                                className="camps-profile-subheader-style">About
                            </div>
                              <div className="camps-profile-subheader-body-style">{currentUser.about}</div>
                            <div
                                className="camps-profile-subheader-style">Location
                            </div>
                              <div className="camps-profile-subheader-body-style">{currentUser.location}</div>
                          </div>
                        }
                      </Header>
                      {!editing && (
                          <Button
                              fluid
                              content="Edit Profile"
                              icon="edit"
                              size="small"
                              onClick={() => setEditing(true)}
                          />
                      )}
                      {editing && currentUser && (
                          <ProfileEditor
                              currentUser={currentUser}
                              setEditing={setEditing}
                          />
                      )}
                    </Container>
                  </Grid.Column>
                  <Grid.Column width={11}>
                    <div>
                      <Menu tabular attached="top">
                        <Menu.Item
                            name="Your trips"
                            active={activeItem === TRIP_TYPES.allTrips}
                            onClick={() => setActiveItem(TRIP_TYPES.allTrips)}
                        />
                        <Menu.Item
                            name="Trip Invites"
                            active={activeItem === TRIP_TYPES.ownedTrips}
                            onClick={() => setActiveItem(TRIP_TYPES.ownedTrips)}
                        />
                      </Menu>
                      <TripsViewer
                          trips={trips}
                          owned_trips={owned_trips}
                          isLoading={isLoading}
                          tripType={activeItem}
                      />
                    </div>
                  </Grid.Column>
                </Grid>
              </Container>
            </div>
          </>
      )
>>>>>>> 33ca9c10c0708262d48cad528681382685059213
  );
};

export default ProfileContainer;
