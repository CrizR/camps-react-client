import React, {useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import {useAuth0} from "@auth0/auth0-react";
import "./AdminContainerStyle.css";
import {
  Container,
  Grid,
  Header,
  Image,
  Input,
  Loader,
  Menu,
  Segment,
  Table,
} from "semantic-ui-react";
import NavBarComponent from "../../components/navbar/NavBarComponent";
import {searchUserEmailAdminAction} from "../../actions/AdminActions";
import {highlightModule} from "../../actions/DashboardActions";
import {updateUserActionByAdmin} from "../../actions/CurrentUserActions";

//TODO: SHOWCASE TRIPS
const AdminContainer = (
    {
      users,
      searchUserEmail,
      highlightModule,
      highlightedModule,
      isLoading
    }
) => {
  const {getAccessTokenSilently, user, logout, isAuthenticated} = useAuth0();
  const [activeItem, setActiveItem] = useState("trips");
  const currentUser = useSelector((state) => state.UserReducer.user);
  const currentUserChanged = useSelector((state) => state.UserReducer.userA);
  const trips = useSelector((state) => state.TripsReducer.trips);
  const dispatch = useDispatch();
  // const usersFound = useSelector((state) => state.AdminReducer.user);
  // const [setUsersFound] = useState(false);
  console.log("currentUser", currentUser)
  console.log("AdminContainer u", users)
  // // console.log("AdminContainer uf", usersFound)
  // const isAllTripsLoaded = useSelector(
  //     (state) =>
  //         state.TripsReducer.isAllTripsLoaded &&
  //         state.TripsReducer.isOwnedTripsLoaded
  // );

  // useEffect(() => {
  //   if (isAuthenticated && user && !isAllTripsLoaded) {
  //     getAccessTokenSilently({
  //       audience: process.env.REACT_APP_AUTH_AUDIENCE,
  //     }).then((token) => {
  //     });
  //   }
  // }, [isAuthenticated, user, isAllTripsLoaded]);

  function switchAdmin() {
    if (!user.admin || user.admin === "false") {
      user.admin = "true"
    } else {
      user.admin = "false"
    }
    return("1");
  }

  if (currentUserChanged && users[0]) {
    users[0].admin = currentUserChanged.admin;
  }

  return (
      currentUser && (
          <>
            <NavBarComponent/>
            <div className="camps-profile row">
              <Container>
                <Grid>
                  <Grid.Column width={5}>
                    <Container>
                      <h1 className="camps-admin-header-style">ADMIN</h1>
                      <Header as="h1">
                        <Image circular src={currentUser.picture}/>
                        <Header.Content>
                          {currentUser.fName}
                          <Header.Subheader>{currentUser.email}</Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Container>
                  </Grid.Column>
                  <Grid.Column width={11}>
                    <div>
                      <Menu tabular attached="top">
                        <Menu.Item
                            name="all users"
                            active={activeItem === "trips"}
                            onClick={() => setActiveItem("trips")}
                        />
                        {/*<Menu.Item*/}
                        {/*    name="all trips"*/}
                        {/*    active={activeItem === "manage"}*/}
                        {/*    onClick={() => setActiveItem("manage")}*/}
                        {/*/>*/}
                      </Menu>
                      <Segment attached="bottom">
                        {isLoading ? (
                            <Loader active inline="centered">
                              Loading
                            </Loader>
                        ) : (

                            <div>
                              {
                                activeItem === "trips" &&
                                <div>
                                  <Table>
                                    <Table.Header>
                                      <Table.Row>
                                        <Table.HeaderCell>
                                          <Input
                                              className="camps-fill-width"
                                              type='text'
                                              // value={""}
                                              id="adminSearchEmail"
                                              onChange={() =>
                                                  getAccessTokenSilently({
                                                    audience: process.env.REACT_APP_AUTH_AUDIENCE,
                                                  }).then((token) => {
                                                    // console.log(document.getElementById("adminSearchEmail").value)
                                                    searchUserEmail(
                                                        document.getElementById(
                                                            "adminSearchEmail").value,
                                                        token)
                                                    highlightModule("")
                                                  })
                                              }
                                              placeholder='Search by email'/>
                                        </Table.HeaderCell>
                                      </Table.Row>
                                    </Table.Header>
                                  </Table>
                                  <Table>
                                    <Table.Header>
                                      {
                                        users && users.length > 0 &&
                                        <Table.Row>
                                          <Table.HeaderCell>
                                            Status:
                                          </Table.HeaderCell><Table.HeaderCell>
                                          Location:
                                        </Table.HeaderCell><Table.HeaderCell>
                                          Email:
                                        </Table.HeaderCell>
                                        </Table.Row>
                                      }
                                    </Table.Header>
                                    <Table.Body
                                        className="ui celled striped table">

                                      {
                                        users && users.length > 0 &&

                                        users.map(user =>
                                            <Table.Row key={user.email}>
                                              {
                                                (!user.admin || user.admin === "false")
                                                &&
                                                <Table.Cell>
                                                  <i onClick={() => {
                                                    // switchAdmin()
                                                    highlightModule("")
                                                    getAccessTokenSilently({
                                                      audience: process.env.REACT_APP_AUTH_AUDIENCE,
                                                    }).then((token) => {
                                                      updateUserActionByAdmin(
                                                          dispatch,
                                                          {
                                                            ...user,
                                                            admin: "true"
                                                          },
                                                          token
                                                      );
                                                    });
                                                  }}
                                                     className="user icon"/> User
                                                </Table.Cell>
                                              }
                                              {
                                                user && user.admin === "true" &&
                                                <Table.Cell>
                                                  <i onClick={() => {
                                                    // switchAdmin()
                                                    highlightModule("")
                                                    getAccessTokenSilently({
                                                      audience: process.env.REACT_APP_AUTH_AUDIENCE,
                                                    }).then((token) => {
                                                      updateUserActionByAdmin(
                                                          dispatch,
                                                          {
                                                            ...user,
                                                            admin: "false"
                                                          },
                                                          token
                                                      );
                                                    });
                                                  }} style={{color: "red"}}
                                                     className="user icon"/> Admin
                                                </Table.Cell>
                                              }

                                              <Table.Cell>{user.location}</Table.Cell>
                                              <Table.Cell>{user.email}</Table.Cell>
                                            </Table.Row>
                                        )

                                      }
                                      {
                                        users && (users.length < 1) &&
                                        <Table.Row>
                                          <Table.Cell>No User Found</Table.Cell>
                                        </Table.Row>
                                      }
                                      {
                                        !users &&
                                        <Table.Row>
                                          <Table.Cell>

                                          </Table.Cell>
                                        </Table.Row>
                                      }
                                    </Table.Body>
                                  </Table>
                                </div>

                              }
                              {
                                activeItem === "manage" && <div>
                                  testing
                                </div>
                              }
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

const stateToProperty = (state) => ({
  users: state.AdminReducer.users,
  highlightedModule: state.DashboardReducer.highlight,
  isLoading: state.TripsReducer.isTripsLoading,
});

const propertyToDispatchMapper = (dispatch) => ({
  searchUserEmail: (email, token) => searchUserEmailAdminAction(
      dispatch,
      email,
      token
  ),
  highlightModule: (module) => {
    highlightModule(dispatch, module)
  }
});

export default connect
(stateToProperty, propertyToDispatchMapper)
(AdminContainer)

