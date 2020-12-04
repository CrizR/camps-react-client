import React, {useEffect, useState} from 'react';
import "./CampgroundCardStyle.css"
import {Button, Card, Dropdown, DropdownItem, Form, Grid, Image, Input, Modal, TextArea} from "semantic-ui-react";
import ReactMapboxGl, {Feature, Layer} from "react-mapbox-gl";
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import Truncate from 'react-truncate';
import {useAuth0} from "@auth0/auth0-react";
import TripEditor from "../editor/TripEditor"
import bg from "../../assets/bg.png"
import DatePicker from "react-datepicker";

const Map = ReactMapboxGl({
    minZoom: 2,
    dragPan: false,
    scrollZoom: false,
    touchZoomRotate: false,
    doubleClickZoom: false,
    dragRotate: false,
    accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
});

// TODO: Make this properly display campground
// Let's use mapbox to showcase its location
function CampgroundCard({campground}) {
    const {isAuthenticated, loginWithRedirect} = useAuth0();

    useEffect(() => {
    }, []);

    return (
        <Card className={'camps-card'} raised>
            {!!campground && !!campground.longitude && !!campground.latitude ?
                <Map
                    style="mapbox://styles/risleychris/ckaipv98m05sn1iplo9j0k47d"
                    center={[-Math.abs(campground.longitude), campground.latitude]}
                    pitch={[20]}
                    zoom={[12]}
                    containerStyle={{
                        height: '150px',
                    }}
                >
                    <Layer type={'symbol'} paint={{"icon-color": '#ffea46'}}
                           layout={{'icon-image': 'marker-15', 'icon-size': 1.2}}>
                        <Feature coordinates={[-Math.abs(campground.longitude), campground.latitude]}/>
                    </Layer>
                </Map>
                :
                <Image src={bg} style={{height: '150px', width: '100%'}}/>
            }

            <Card.Header className={'camps-card-header'}>
                <Grid columns={2} centered style={{padding: '10px'}}>
                    <h3>
                        <Truncate lines={1} ellipsis={<span>...</span>}>
                            {campground.name}
                        </Truncate>
                    </h3>

                </Grid>
            </Card.Header>
            <Card.Content className={'camps-card-content'}>
                <Card.Meta>
                    <p style={{overflow: 'hidden'}}>{campground.description}</p>
                </Card.Meta>
            </Card.Content>
            <Card.Content className={'camps-card-extra'} extra>
                {isAuthenticated ?
                    <Grid columns={2}>
                        <Grid.Column>
                            <Button className={'camps-secondary-button camps-start-btn'} as={Link}
                                    to={`/campground/${campground.id}`}>See Details</Button>

                        </Grid.Column>
                        <Grid.Column>
                            <TripEditor campground={campground}
                                        triggerElement={<Button className={'camps-primary-button camps-start-btn'}>
                                            Create Trip</Button>}/>
                        </Grid.Column>
                    </Grid>
                    :
                    <Grid columns={2}>
                        <Grid.Column>
                            <Button className={'camps-secondary-button camps-start-btn'} as={Link}
                                    to={`/campground/${campground.id}`}>See Details</Button>

                        </Grid.Column>
                        <Grid.Column>
                            <Modal
                                size={'tiny'}
                                style={{textAlign: 'center'}}
                                trigger={<Button className={'camps-primary-button camps-start-btn'}>
                                    Create Trip</Button>}
                            >
                                <Modal.Header>
                                    Login to Create a Trip
                                </Modal.Header>
                                <Modal.Content>
                                    <Button onClick={() => loginWithRedirect()}>Login</Button>
                                </Modal.Content>
                            </Modal>
                        </Grid.Column>
                    </Grid>
                }

            </Card.Content>
        </Card>

    );
}

const stateToProperty = (state) => ({});

const propertyToDispatchMapper = (dispatch) => ({});

export default connect
(stateToProperty, propertyToDispatchMapper)
(CampgroundCard)
