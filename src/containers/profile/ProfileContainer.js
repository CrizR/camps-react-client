import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import "./ProfileContainerStyle.css";
import {
  Button,
  Container,
  Grid,
  Header,
  Menu,
  Image,
  List,
} from "semantic-ui-react";
import NavBarComponent from "../../components/navbar/NavBarComponent";
import { getOwnedTripsAction, getTripsAction } from "../../actions/TripActions";
import ProfileEditor from "../../components/profile/profileEditor";
import { TRIP_TYPES } from "./constants";
import TripsViewer from "../../components/profile/TripsViewer";

const ProfileContainer = () => {
  const { getAccessTokenSilently, user, logout, isAuthenticated } = useAuth0();
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
                  <p>{currentUser.about}</p>
                  {!editing && (
                    <div>
                      <Button
                        fluid
                        content="Edit Profile"
                        icon="edit"
                        size="small"
                        onClick={() => setEditing(true)}
                      />
                      <List>
                        <List.Item icon="tree" content="two trips" />
                        <List.Item
                          icon="map marker alternate"
                          content={currentUser.location}
                        />
                      </List>
                    </div>
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
  );
};

export default ProfileContainer;
