import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {useAuth0} from "@auth0/auth0-react";
import {useDispatch} from "react-redux";
import {
    Button,
    List,
    Card,
    Dropdown,
    DropdownItem,
    Header,
    Form,
    Grid,
    Icon,
    Image,
    Input,
    Modal,
    TextArea,
} from "semantic-ui-react";
import {deleteTripAction} from "../../actions/TripActions";
import {getCampground} from "../../services/CampgroundService";
import TripEditor from "../editor/TripEditor";

const TripCard = ({trip, isEditable, isPreview = false}) => {
    console.log(trip);
    const dispatch = useDispatch();
    const {getAccessTokenSilently} = useAuth0();
    const campgroundId = trip.campground;
    const [campground, setCampground] = useState({});
    const [loading, setLoading] = useState(true);
    const imageUrl = "/static/media/bg.306fe8e2.png";
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        getCampground(campgroundId, "").then((cg) => {
            setCampground(cg);
            setLoading(false);
        });
    }, []);

    return (
        <Card>
            <Image src={imageUrl} wrapped ui={false}/>
            <Card.Content header={trip.name}>
                <Card.Header>{trip.name} </Card.Header>
                <Card.Meta>
                    <Link to={`/campground/${campground.id}`}>{campground.name}</Link>
                </Card.Meta>
                <Card.Description>{trip.description}</Card.Description>
                <List>
                    <List.Item>
                        <List.Icon name="users"/>
                        <List.Content>Invite List</List.Content>
                    </List.Item>
                    {trip.inviteList.map((user) => (
                        <List.Item>
                            <a
                                onClick={() => {
                                    window.location.href = `/profile/${user}`;
                                }}
                            >
                                {user}
                            </a>
                        </List.Item>
                    ))}
                </List>

            </Card.Content>
            {isEditable ? (
                <Card.Content extra>
                    <div className="ui two buttons">
                        <TripEditor
                            campground={campground.id}
                            isEdit={true}
                            triggerElement={
                                <Button basic color="green">
                                    Edit
                                </Button>
                            }
                            existingTrip={trip}
                        />

                        <Modal
                            onClose={() => setOpen(false)}
                            onOpen={() => setOpen(true)}
                            open={open}
                            trigger={
                                <Button basic color="red">
                                    Delete
                                </Button>
                            }
                        >
                            <Modal.Header>Delete Trip</Modal.Header>
                            <Modal.Content>
                                <Modal.Description>
                                    <Header>
                                        Are you sure you want to delete {trip.name} trip?
                                    </Header>
                                    <p>Delete is permanent.</p>
                                    <p>You and invitees won't be able view this trip.</p>
                                </Modal.Description>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button
                                    color="black"
                                    onClick={() =>
                                        getAccessTokenSilently({
                                            audience: process.env.REACT_APP_AUTH_AUDIENCE,
                                        }).then((token) => {
                                                deleteTripAction(dispatch, trip.id, token);
                                                setOpen(false)
                                            }
                                        )
                                    }
                                >
                                    Delete
                                </Button>
                                <Button color="green" onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                            </Modal.Actions>
                        </Modal>
                    </div>
                </Card.Content>
            ) : (
                <>
                    {!isPreview &&

                    <Card.Content extra>
                        <Link to={`/campground/${campground.id}`}>
                            <Icon name="location arrow"/>
                            See Campsite Details
                        </Link>
                    </Card.Content>
                    }
                </>
            )}
        </Card>
    );
};

const stateToProperty = (state) => ({});

const propertyToDispatchMapper = (dispatch) => ({});

export default connect(stateToProperty, propertyToDispatchMapper)(TripCard);
