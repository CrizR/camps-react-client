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
  Form,
} from "semantic-ui-react";
import NavBarComponent from "../../components/navbar/NavBarComponent";
import {
  getTripsAction,
  getOwnedTripsAction,
} from "./../../actions/TripActions";
import ProfileEditor from "../../components/profile/profileEditor";

//TODO: SHOWCASE TRIPS
const ProfileContainer = () => {
  const { getAccessTokenSilently, user, logout, isAuthenticated } = useAuth0();
  const [activeItem, setActiveItem] = useState("trips");
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
              <Grid.Column width={6}>
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
