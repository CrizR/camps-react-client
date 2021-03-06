import React, {useEffect, useState} from 'react';
import "./CampgroundContainerStyle.css"
import NavBarComponent from "../../components/navbar/NavBarComponent";
import {connect} from "react-redux";
import ReactMapboxGl, {Feature, Layer} from "react-mapbox-gl";
import {getCampground} from "../../services/CampgroundService";
import {Button, Card, Dimmer, Grid, Icon, Image, Loader, Modal, Segment} from "semantic-ui-react";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css"
import bg from "../../assets/homepage2.jpg"
import NumberFormat from 'react-number-format';
import TripEditor from "../../components/editor/TripEditor";
import {useAuth0} from "@auth0/auth0-react";
import {Link} from "react-router-dom";
import {getTripsForCampground} from "../../services/TripsService";
import TripCard from "../../components/card/TripCard";

const Map = ReactMapboxGl({
    minZoom: 2,
    accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
});


const CampgroundContainer = ({id}) => {
    const {isAuthenticated, loginWithRedirect} = useAuth0();
    const [campground, setCampground] = useState({});
    const [associatedTrips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCampground(id, "").then(cg => {
            setCampground(cg);
            setLoading(false);
        });

        getTripsForCampground(id).then(trips => {
            setTrips(trips)
        })
    }, []);

    function updateTrips() {
        getTripsForCampground(id).then(trips => {
            setTrips(trips)
        })
    }


    return (
        <div className={'camps-campground-details-container'}>
            <NavBarComponent/>

            {loading ?
                <Dimmer className={'camps-campground-loader'} active inverted>
                    <Loader inverted>Loading</Loader>
                </Dimmer>
                :

                <div>
                    {!!campground &&
                    <Grid className={'camps-campground-grid'} columns={2} stackable={true}>
                        <Grid.Column width={4}>
                            <Card className={'camps-campground-details'}>
                                <Card.Header>
                                    <Button as={Link} to={'/dashboard'} icon={'left arrow'}/><h2
                                    style={{paddingBottom: '10px'}}>{campground.name}</h2>
                                </Card.Header>
                                <Card.Content>
                                    <div className="camps-campground-description-style-body">
                                        <p>{campground.description}</p>
                                    </div>
                                    <div className="camps-campground-description-style">
                                        <h3><Icon name={'tree'}/> Campsites</h3>
                                        <div className={'camps-campground-description-style-body'}>

                                            <p>Total: {campground.campsites.totalSites}</p>
                                        </div>
                                    </div>
                                    {
                                        !!campground.fees.length &&
                                        <div className="camps-campground-description-style">
                                            <h3><Icon name={'dollar'}/>Fees</h3>
                                            <div className={'camps-campground-description-style-body'}>

                                                <p>{campground.fees[0].title}: <Icon
                                                    name={'dollar'}/>{campground.fees[0].cost}
                                                </p>
                                                <p>{campground.fees[0].description}</p>
                                            </div>
                                        </div>
                                    }

                                    {
                                        !!campground.emailAddress && campground.phoneNumber &&
                                        <div className="camps-campground-description-style">
                                            <h3><Icon name={'mail'}/>Contact</h3>
                                            <div className={'camps-campground-description-style-body'}>
                                                <p><Icon name={'mail'}/><a>{campground.emailAddress}</a></p>
                                                <p><Icon name={'phone'}/> <a>
                                                    <NumberFormat format="+1 (###) ###-####"
                                                                  displayType={'text'}
                                                                  value={campground.phoneNumber}
                                                                  mask="_"/>
                                                </a></p>
                                            </div>
                                        </div>
                                    }
                                    {!!campground.images.length &&
                                    <div className="camps-campground-description-style" style={{marginTop: '25px'}}>
                                        <h3><Icon name={'photo'}/> Images</h3>
                                        <div className={'camps-campground-description-style-body'}>
                                            <ImageGallery sizes={'small'} items={campground.images.map(img => (
                                                {
                                                    "original": img.url,
                                                    "originalClass": "camps-gallery-style",
                                                    "thumbnail": img.url
                                                }
                                            ))}/>
                                        </div>
                                    </div>
                                    }
                                    <div className="camps-campground-description-style" style={{marginTop: '25px'}}>
                                        <h3><Icon name={'angle up'}/>Trips</h3>
                                        <div className={'camps-campground-description-style-body'}>
                                            <Modal
                                                size={"small"}
                                                trigger={
                                                    <div>
                                                        <p>Trips Here: {associatedTrips.length}</p>
                                                    <Button style={{width: '100%'}}>See Associated Trips</Button>
                                                    </div>
                                                }
                                            >
                                                <Modal.Header>Associated Trips</Modal.Header>
                                                <Modal.Content>
                                                    <Card.Group itemsPerRow={2}>
                                                        {associatedTrips.map((trip) => (
                                                            <TripCard trip={trip} isEditable={false} isPreview={true}/>
                                                        ))}
                                                    </Card.Group>
                                                </Modal.Content>
                                            </Modal>
                                        </div>
                                    </div>
                                </Card.Content>

                                <Card.Content extra>
                                    {isAuthenticated ?
                                        <TripEditor callback={updateTrips} campground={campground} triggerElement={<Button
                                            className={'create-trip-details-btn'}>Create Trip
                                            Here!</Button>}/>
                                        :
                                        <Modal
                                            size={"tiny"}
                                            style={{textAlign: "center"}}
                                            trigger={
                                                <Button className={"camps-start-btn"}>
                                                    Create Trip
                                                </Button>
                                            }
                                        >
                                            <Modal.Header>Login to Create a Trip</Modal.Header>
                                            <Modal.Content>
                                                <Button onClick={() => loginWithRedirect()}>Login</Button>
                                            </Modal.Content>
                                        </Modal>
                                    }
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column className={'mobile hidden'} width={12}>
                            {!!campground.longitude && !!campground.latitude ?
                                <Map
                                    style="mapbox://styles/risleychris/ckaipv98m05sn1iplo9j0k47d"
                                    center={[-Math.abs(campground.longitude), campground.latitude]}
                                    pitch={[20]}
                                    zoom={[16]}
                                    containerStyle={{
                                        height: '100%',
                                        width: '100%'
                                    }}
                                >
                                    <Layer type={'symbol'} paint={{"icon-color": '#f6e835'}}
                                           layout={{'icon-image': 'marker-15', 'icon-size': 2}}>
                                        <Feature coordinates={[-Math.abs(campground.longitude), campground.latitude]}/>
                                    </Layer>
                                </Map>
                                :

                                <Image style={{height: '100%', width: '100%'}} src={bg}/>
                            }

                        </Grid.Column>
                    </Grid>
                    }
                </div>
            }
        </div>
    );

};

const stateToProperty = (state) => ({});

const propertyToDispatchMapper = (dispatch) => ({});

export default connect
(stateToProperty, propertyToDispatchMapper)
(CampgroundContainer)
