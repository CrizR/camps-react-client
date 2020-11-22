import React, {useEffect} from "react";
import "./ProfileContainerStyle.css";
import {
    Button,
    Divider,
    Form,
    Grid,
    Segment,
    Container,
    Header,
    Image,
    Menu,
    Input,
} from "semantic-ui-react";
import NavBarComponent from "../../components/navbar/NavBarComponent";
import {connect} from "react-redux";
import {useAuth0} from "@auth0/auth0-react";

//TODO: BUILD PAGE TO SHOWCASE PROFILE, SHOWS RESERVED CAMPSITES AND MANAGED CAMPSITES (Two separate components)
const ProfileContainer = ({id}) => {
    const {getAccessTokenSilently, user, isAuthenticated} = useAuth0();
    const [activeItem, setActiveItem] = React.useState("saved");
    const [editing, setEditing] = React.useState(false);

    useEffect(() => {
        getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH_AUDIENCE,
        }).then((token) => {
        });
    }, []);

    return (
        <>
            <NavBarComponent/>
            <div className="camps-profile row">
                <Container>
                    <Grid>
                        <Grid.Column width={6}>
                            <Container>
                                <Header as="h1">
                                    <Image circular src={user.picture}/>
                                    <Header.Content>
                                        {user.name}
                                        <Header.Subheader>{user.email}</Header.Subheader>
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
                                {editing && (
                                    <Form>
                                        <Form.TextArea label='About'/>
                                        <Form.Field>
                                            <label>Location</label>
                                            <input placeholder='Location'/>
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Phone</label>
                                            <input placeholder='Phone'/>
                                        </Form.Field>
                                        <Form.Field>
                                            <label>First Name</label>
                                            <input placeholder='First Name'/>
                                        </Form.Field>
                                        <Form.Field>
                                            <label>Last Name</label>
                                            <input placeholder='Last Name'/>
                                        </Form.Field>


                                        <div>
                                            <Button floated="left"
                                                    onClick={() => setEditing(false)}>Cancel</Button>
                                            <Button floated="right" positive
                                                    onClick={() => setEditing(false)}>
                                                Save
                                            </Button>
                                        </div>
                                    </Form>

                                )}
                            </Container>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <div>
                                <Menu tabular attached="top">
                                    <Menu.Item
                                        name="saved"
                                        active={activeItem === "saved"}
                                        onClick={() => setActiveItem("saved")}
                                    />
                                    <Menu.Item
                                        name="manage"
                                        active={activeItem === "manage"}
                                        onClick={() => setActiveItem("manage")}
                                    />
                                </Menu>
                                <Segment attached="bottom">
                                    {activeItem === "saved" && <h1>list of liked campsite</h1>}
                                    {activeItem === "manage" && <h1>list of owned campsite</h1>}
                                </Segment>
                            </div>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        </>
    );
};

const stateToProperty = (state) => ({
    filtered: state.CampsiteReducer.filtered,
});

const propertyToDispatchMapper = (dispatch) => ({});

export default connect(
    stateToProperty,
    propertyToDispatchMapper
)(ProfileContainer);
