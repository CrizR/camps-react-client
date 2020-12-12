import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import "./ProfileContainerStyle.css";
import logo from "../../assets/logo.svg";
import {
  Button,
  Container,
  Grid,
  Divider,
  Header,
  Menu,
  Image,
  List,
  Segment,
  Icon,
} from "semantic-ui-react";
import NavBarComponent from "../../components/navbar/NavBarComponent";
import {
  getOwnedTripsAction,
  getInvitedTripsAction,
} from "../../actions/TripActions";
import ProfileEditor from "../../components/profile/ProfileEditor";
import { TRIP_TYPES } from "./constants";
import TripsViewer from "../../components/profile/TripsViewer";
import { getUserByEmail } from "../../services/UserService";
import { getOwnedTrips, getInvitedTrips } from "../../services/TripsService";

const ProfileContainer = ({ isEditable, email }) => {
  const {
    getAccessTokenSilently,
    user,
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.UserReducer.user);
  const invited_trips = useSelector((state) => state.TripsReducer.invitedTrips);
  const owned_trips = useSelector((state) => state.TripsReducer.ownedTrips);
  const isInvitedTripsLoaded = useSelector(
    (state) =>
      state.TripsReducer.isInvitedTripsLoaded &&
      state.TripsReducer.isOwnedTripsLoaded
  );
  let isLoading = useSelector((state) => state.TripsReducer.isTripsLoading);

  const [activeItem, setActiveItem] = useState(TRIP_TYPES.invitedTrips);
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

  useEffect(() => {
    if (!isAuthenticated) {
      //return;
      getUserByEmail(email).then((eUser) => {
        const parsedUser = eUser.Items[0];
        setEmailUser(parsedUser);
        console.log(parsedUser);
        return parsedUser;
      });
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
            getInvitedTrips(res.eUser, res.token),
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
    } else if (isAuthenticated && user && !isInvitedTripsLoaded) {
      getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH_AUDIENCE,
      }).then((token) => {
        getInvitedTripsAction(dispatch, user, token);
        getOwnedTripsAction(dispatch, user, token);
      });
    }
  }, [isAuthenticated, user, isInvitedTripsLoaded, email]);

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
                  <List>
                    <List.Item>
                      <p>{userToDisplay.about}</p>
                    </List.Item>
                    <List.Item
                      icon="map marker alternate"
                      content={userToDisplay.location}
                    />
                  </List>

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
                      active={activeItem === TRIP_TYPES.invitedTrips}
                      onClick={() => setActiveItem(TRIP_TYPES.invitedTrips)}
                    />
                  </Menu>
                  {isAuthenticated ? (
                    <TripsViewer
                      invited_trips={email ? emailUserTrips.all : invited_trips}
                      owned_trips={email ? emailUserTrips.owned : owned_trips}
                      isLoading={email ? isAllEmailUserTripsLoading : isLoading}
                      tripType={activeItem}
                    />
                  ) : (
                    <Segment attached="bottom" placeholder>
                      <Header icon>
                        <div>
                          <img width={200} alt={"logo"} src={logo} />
                        </div>
                        Login to see where other campers are going!
                        <Divider />
                      </Header>
                      <Button onClick={() => loginWithRedirect()}>Login</Button>
                    </Segment>
                  )}
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
