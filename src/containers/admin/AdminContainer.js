import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import "./AdminContainerStyle.css";
import {
  Button,
  Container,
  Grid,
  Header,
  Image,
  Input,
  Loader,
  Menu,
  Segment,
} from "semantic-ui-react";
import NavBarComponent from "../../components/navbar/NavBarComponent";
import {
  getOwnedTripsAction,
  getInvitedTripsAction,
} from "../../actions/TripActions";
import { searchUserEmailAdminAction } from "../../actions/AdminActions";

//TODO: SHOWCASE TRIPS
const AdminContainer = () => {
  const { getAccessTokenSilently, user, logout, isAuthenticated } = useAuth0();
  const [activeItem, setActiveItem] = useState("trips");
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.UserReducer.user);
  const trips = useSelector((state) => state.TripsReducer.trips);
  const usersFound = useSelector((state) => state.AdminReducer.user);
  // const [setUsersFound] = useState(false);
  console.log("userFound", usersFound);
  const isAllTripsLoaded = useSelector(
    (state) =>
      state.TripsReducer.isAllTripsLoaded &&
      state.TripsReducer.isOwnedTripsLoaded
  );
  let isLoading = useSelector((state) => state.TripsReducer.isTripsLoading);
  const [editing, setEditing] = React.useState(false);
  let searchEmail = "";

  const updateEmail = (e) => {
    searchEmail = e;
  };

  useEffect(() => {
    if (isAuthenticated && user && !isAllTripsLoaded) {
      getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH_AUDIENCE,
      }).then((token) => {
        getInvitedTripsAction(dispatch, user, token);
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
                  <h1 className="camps-admin-header-style">ADMIN</h1>
                  <Header as="h1">
                    <Image circular src={currentUser.picture} />
                    <Header.Content>
                      {currentUser.fName}
                      <Header.Subheader>{currentUser.email}</Header.Subheader>
                    </Header.Content>
                  </Header>
                </Container>
              </Grid.Column>
              <Grid.Column width={10}>
                <div>
                  <Menu tabular attached="top">
                    <Menu.Item
                      name="all users"
                      active={activeItem === "trips"}
                      onClick={() => setActiveItem("trips")}
                    />
                    <Menu.Item
                      name="all trips"
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
                        {activeItem === "trips" && (
                          <div>
                            <Input
                              type="text"
                              // value={""}
                              id="adminSearchEmail"
                              placeholder="Search by email"
                            />
                            <Button
                              onClick={() => {
                                getAccessTokenSilently({
                                  audience: process.env.REACT_APP_AUTH_AUDIENCE,
                                }).then((token) => {
                                  // console.log(document.getElementById("adminSearchEmail").value)
                                  searchUserEmailAdminAction(
                                    dispatch,
                                    document.getElementById("adminSearchEmail")
                                      .value,
                                    token
                                  );
                                });
                              }}
                            >
                              Search
                            </Button>
                            <div>
                              {console.log(usersFound.length) &&
                                usersFound.length > 0 &&
                                usersFound.map((user) => (
                                  <span>{user.name}</span>
                                ))}
                              {usersFound.length < 1 && (
                                <div>
                                  <br />
                                  No users found
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        {activeItem === "manage" && <div>testing</div>}
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

export default AdminContainer;
