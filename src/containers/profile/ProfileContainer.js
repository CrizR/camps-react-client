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
  Loader,
} from "semantic-ui-react";
import NavBarComponent from "../../components/navbar/NavBarComponent";
import { getOwnedTripsAction, getTripsAction } from "../../actions/TripActions";
import ProfileEditor from "../../components/profile/profileEditor";
import { TRIP_TYPES } from "./constants";
import TripsViewer from "../../components/profile/TripsViewer";
import { getUserByEmail } from "../../services/UserService";
import { getOwnedTrips, getTrips } from "../../services/TripsService";

const ProfileContainer = ({ isEditable, email }) => {
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

  const [
    isAllEmailUserTripsLoaded,
    setIsAllEmailUserTripsLoaded,
  ] = React.useState(false);

  const [
    isAllEmailUserTripsLoading,
    setIsAllEmailUserTripsLoading,
  ] = React.useState(false);

  const [emailUserTrips, setEmailUserTrips] = React.useState({
    owned: [],
    all: [],
  });

  const [emailUser, setEmailUser] = React.useState(null);
   
  // I know this is messy, I will refactor this later.
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
    if (email && !isAllEmailUserTripsLoaded && !isAllEmailUserTripsLoading) {
      setIsAllEmailUserTripsLoading(true);
      getUserByEmail(email)
        .then((eUser) => {
          const parsedUser = eUser.Items[0];
          setEmailUser(parsedUser);
          return parsedUser;
        })
        .then(async (eUser) => {
          const token = await getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH_AUDIENCE,
          });
          return {
            token,
            eUser,
          };
        })
        .then((res) => {
          return Promise.all([
            getTrips(res.eUser, res.token),
            getOwnedTrips(res.eUser, res.token),
          ]);
        })
        .then((res) => {
          setEmailUserTrips({
            all: res[0],
            owned: res[1],
          });
          setIsAllEmailUserTripsLoaded(true);
          setIsAllEmailUserTripsLoading(false);
        })
        .catch((e) => console.error(e));
    } else if (isAuthenticated && user && !isAllTripsLoaded) {
      getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH_AUDIENCE,
      }).then((token) => {
        getTripsAction(dispatch, user, token);
        getOwnedTripsAction(dispatch, user, token);
      });
    }
  }, [isAuthenticated, user, isAllTripsLoaded, email]);

  const userToDisplay = email ? emailUser : currentUser;



  return (
    userToDisplay && (
      <>
        <NavBarComponent />
        <div className="camps-profile row">
          <Container>
            <Grid>
              <Grid.Column width={5}>
                <Container>
                  <h1 className="camps-profile-banner-style">Profile</h1>
                  <Header as="h1">
                    <Image circular src={userToDisplay.picture} />
                    <Header.Content>
                      {userToDisplay.fName}
                      <Header.Subheader>{userToDisplay.email}</Header.Subheader>
                    </Header.Content>
                  </Header>
                  <p>{userToDisplay.about}</p>
                  {!editing && !email && (
                    <div>
                      <Button
                        fluid
                        content="Edit Profile"
                        icon="edit"
                        size="small"
                        onClick={() => setEditing(true)}
                      />
                    </div>
                  )}
                  {editing && currentUser && !email && (
                    <ProfileEditor
                      currentUser={currentUser}
                      setEditing={setEditing}
                    />
                  )}
                  <List>
                    <List.Item icon="tree" content="two trips" />
                    <List.Item
                      icon="map marker alternate"
                      content={userToDisplay.location}
                    />
                  </List>
                </Container>
              </Grid.Column>
              <Grid.Column width={11}>
                <div>
                  <Menu tabular attached="top">
                    <Menu.Item
                      name={"Owned Trips"}
                      active={activeItem === TRIP_TYPES.ownedTrips}
                      onClick={() => setActiveItem(TRIP_TYPES.ownedTrips)}
                    />
                    <Menu.Item
                      name="Invited Trips"
                      active={activeItem === TRIP_TYPES.allTrips}
                      onClick={() => setActiveItem(TRIP_TYPES.allTrips)}
                    />
                  </Menu>
                  <TripsViewer
                    trips={email ? emailUserTrips.all : trips}
                    owned_trips={email ? emailUserTrips.owned : owned_trips}
                    isLoading={email ? isAllEmailUserTripsLoading : isLoading}
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
