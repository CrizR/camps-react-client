import React, {useState} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import {useAuth0} from "@auth0/auth0-react";
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
  Table,
} from "semantic-ui-react";
import NavBarComponent from "../../components/navbar/NavBarComponent";
import {searchUserEmailAdminAction} from "../../actions/AdminActions";
import {highlightModule} from "../../actions/DashboardActions";
import {updateUserActionByAdmin} from "../../actions/CurrentUserActions";
import {Link} from "react-router-dom";

//TODO: SHOWCASE TRIPS
const AdminContainer = (
    {
      users,
      searchUserEmail,
      highlightModule,
      highlightedModule,
      isLoading,
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
  // console.log("currentUser", currentUser)
  // console.log("AdminContainer u", users)
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

  if (currentUserChanged && users && users[0]) {
    users[0].admin = currentUserChanged.admin;
  }

  function updateAuthUser(bString) {
    if (bString.length < 2) {

    } else {
      user.admin = bString;
    }
  }

  const getUserStatus = (uString) =>
    getAccessTokenSilently({
      audience: process.env.REACT_APP_AUTH_AUDIENCE,
    }).then((token) => {
      // console.log(document.getElementById("adminSearchEmail").value)
      searchUserEmail(
          uString,
          token)
      highlightModule("")
    })

  function updateAuthUser(bString, tempUser) {
    if (bString.length < 2) {

    } else {
      user.admin = bString;
    }
    if (tempUser && currentUser.email === tempUser.email) {
      currentUser.admin = bString;
    }
  }

  return (
      currentUser && (
          <>
            <NavBarComponent/>
            <div className="camps-profile row">
              {
                (currentUser.admin === "true" || currentUser.admin === "owner") &&
                <Container>
                  <Grid stackable>
                    <Grid.Column width={5}>
                      <Container>
                        <h1 className="camps-admin-header-style">ADMIN
                          SEARCH</h1>
                        <Header as="h1">
                          <Image circular src={currentUser.picture}/>
                          <Header.Content>
                            {currentUser.fName}
                            <Header.Subheader>{currentUser.email}</Header.Subheader>
                          </Header.Content>
                        </Header>
                        <div className="camps-admin-tips-header">
                          <div style={{textAlign: "center"}}>
                            <b>Admin Guide</b><br/>
                          </div>
                          <i style={{color: "blue"}} className="user icon"/> User - normal member of the site <br/>
                          <i style={{color: "red"}}
                             className="user icon"/> Admin - special privileges<br/>
                             <i style={{color: "green"}}
                             className="user icon"/> Owner - admin that cannot be removed<br/>
                          <i className="arrow alternate circle up outline icon"/> Upgrade
                          User<br/>
                          <i className="arrow alternate circle down outline icon"/> Downgrade
                          User<br/>
                          <div style={{textAlign: "center"}}>
                            <br/>
                          <b>Examples</b><br/>
                          </div>
                          <span style={{color: "blue"}}>User:</span> cs4550.user@gmail.com<br/>
                          <span style={{color: "red"}}>Admin:</span> kerokeroarisa21@gmail.com<br/>
                          <span style={{color: "green"}}>Owner:</span> reply2zain@gmail.com<br/>

                        </div>
                      </Container>
                    </Grid.Column>
                    <Grid.Column width={11}>
                      <div>
                        <Menu tabular attached="top">
                          <Menu.Item
                              name="Find Users"
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
                                                  (!user.admin || user.admin
                                                      === "false")
                                                  &&
                                                  <Table.Cell>
                                                    <Link
                                                        to={`/profile/${user.email}`}>
                                                      <i
                                                          style={{color: "blue"}}
                                                          className="user icon"/>
                                                      User&nbsp;&nbsp;&nbsp;
                                                    </Link>
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
                                                        updateAuthUser("true",
                                                            user);
                                                      });
                                                    }} style={{float: "right"}}
                                                       className="arrow alternate circle up outline icon"/>
                                                  </Table.Cell>
                                                }
                                                {
                                                  user && (user.admin
                                                      === "true")
                                                  &&
                                                  <Table.Cell>
                                                    <Link
                                                        to={`/profile/${user.email}`}>
                                                      <i style={{color: "red"}}
                                                         className="user icon"/>
                                                      Admin
                                                    </Link>
                                                    {
                                                      currentUser.email
                                                      !== user.email &&
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
                                                          updateAuthUser(
                                                              "false",
                                                              user);
                                                        });
                                                      }}
                                                         style={{float: "right"}}
                                                         className="arrow alternate circle down outline icon"/>
                                                    }

                                                      {/*MAKE AN ADMIN AN OWNER - OPTION*/}
                                                      {/*<i onClick={() => {*/}
                                                      {/*  // switchAdmin()*/}
                                                      {/*  highlightModule("")*/}
                                                      {/*  getAccessTokenSilently({*/}
                                                      {/*    audience: process.env.REACT_APP_AUTH_AUDIENCE,*/}
                                                      {/*  }).then((token) => {*/}
                                                      {/*    updateUserActionByAdmin(*/}
                                                      {/*        dispatch,*/}
                                                      {/*        {*/}
                                                      {/*          ...user,*/}
                                                      {/*          admin: "owner"*/}
                                                      {/*        },*/}
                                                      {/*        token*/}
                                                      {/*    );*/}
                                                      {/*    updateAuthUser(*/}
                                                      {/*        "owner",*/}
                                                      {/*        user);*/}
                                                      {/*  });*/}
                                                      {/*}}*/}
                                                      {/*   style={{float: "right"}}*/}
                                                      {/*   className="arrow alternate circle up outline icon"/>*/}

                                                  </Table.Cell>
                                                }
                                                {
                                                  user && (user.admin
                                                      === "owner")
                                                  &&
                                                  <Table.Cell>
                                                    <Link
                                                        to={`/profile/${user.email}`}>
                                                      <i style={{color: "green"}}
                                                         className="user icon"/>
                                                      Owner
                                                    </Link>
                                                    {/*DOWNGRADE AN OWNER - OPTION*/}
                                                    {/*<i onClick={() => {*/}
                                                    {/*  // switchAdmin()*/}
                                                    {/*  highlightModule("")*/}
                                                    {/*  getAccessTokenSilently({*/}
                                                    {/*    audience: process.env.REACT_APP_AUTH_AUDIENCE,*/}
                                                    {/*  }).then((token) => {*/}
                                                    {/*    updateUserActionByAdmin(*/}
                                                    {/*        dispatch,*/}
                                                    {/*        {*/}
                                                    {/*          ...user,*/}
                                                    {/*          admin: "true"*/}
                                                    {/*        },*/}
                                                    {/*        token*/}
                                                    {/*    );*/}
                                                    {/*    updateAuthUser(*/}
                                                    {/*        "true",*/}
                                                    {/*        user);*/}
                                                    {/*  });*/}
                                                    {/*}}*/}
                                                    {/*   style={{float: "right", color: "red"}}*/}
                                                    {/*   className="arrow alternate circle down outline icon"/>*/}
                                                  </Table.Cell>
                                                }

                                                {
                                                  user.location
                                                  && user.location.length > 0 &&
                                                  <Table.Cell>{user.location}</Table.Cell>
                                                }
                                                {
                                                  (!user.location
                                                      || user.location.length
                                                      < 1) &&
                                                  <Table.Cell>N/A</Table.Cell>
                                                }
                                                <Table.Cell>{user.email}</Table.Cell>
                                              </Table.Row>
                                          )
                                        }
                                        {
                                          users && (users.length < 1) &&
                                          <Table.Row>
                                            <Table.Cell>No User
                                              Found</Table.Cell>
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
              }
              {
                currentUser.admin === "false" &&
                <Container>
                  <Grid>
                    <Grid.Column width={5}>
                      <Container>
                        <h1 className="camps-user-header-style">USER SEARCH</h1>
                        <Header as="h1">
                          <Image circular src={currentUser.picture}/>
                          <Header.Content>
                            {currentUser.fName}
                            <Header.Subheader>{currentUser.email}</Header.Subheader>
                          </Header.Content>
                        </Header>
                        <div className="camps-popular-users-header">
                          <b>Popular Users:</b> <br/>
                          risleychris@gmail.com<br/>
                          kerokeroarisa21@gmail.com<br/>
                          a.shiraishi.risa@gmail.com<br/>
                          reply2zain@gmail.com<br/>
                        </div>
                      </Container>
                    </Grid.Column>
                    <Grid.Column width={11}>
                      <div>
                        <Menu tabular attached="top">
                          <Menu.Item
                              name="Find Users"
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
                                              Profile:
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

                                                <Table.Cell>
                                                  <Link
                                                      to={`/profile/${user.email}`}>
                                                    <i
                                                        className="user icon"/>
                                                    Camper &nbsp;&nbsp;</Link>
                                                </Table.Cell>
                                                {
                                                  user.location.length > 0 &&
                                                  <Table.Cell>{user.location}</Table.Cell>
                                                }
                                                {
                                                  user.location.length < 1 &&
                                                  <Table.Cell>N/A</Table.Cell>
                                                }
                                                <Table.Cell>{user.email}</Table.Cell>
                                              </Table.Row>
                                          )

                                        }
                                        {
                                          users && (users.length < 1) &&
                                          <Table.Row>
                                            <Table.Cell>No User
                                              Found</Table.Cell>
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


                  {
                    <Container>
                      <div className="camps-nonAdmin-header">
                        {/*Only admins can use this page.*/}
                      </div>
                      <div className="">
                        <Button onClick={() => {
                          getAccessTokenSilently({
                            audience: process.env.REACT_APP_AUTH_AUDIENCE,
                          }).then((token) => {
                            updateUserActionByAdmin(
                                dispatch,
                                {
                                  ...currentUser,
                                  admin: "true"
                                },
                                token
                            );
                            updateAuthUser("true", currentUser);
                            searchUserEmail(
                                "",
                                token)
                            highlightModule("");
                          });
                        }}>
                          Become Admin (FOR TEST PURPOSES)
                        </Button>
                      </div>
                    </Container>
                  }
                </Container>
              }
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

