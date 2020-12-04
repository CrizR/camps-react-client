import React, {useEffect, useState} from 'react';
import "./CampgroundContainerStyle.css"
import NavBarComponent from "../../components/navbar/NavBarComponent";
import {connect} from "react-redux";
import ReactMapboxGl, {Feature, Layer} from "react-mapbox-gl";
import {getCampground} from "../../services/CampgroundService";
import {Button, Dimmer, Image, Loader, Segment} from "semantic-ui-react";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css"

const Map = ReactMapboxGl({
    minZoom: 2,
    accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
});


const CampgroundContainer = ({id}) => {
    const [campground, setCampground] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCampground(id, "").then(cg => {
            setCampground(cg);
            setLoading(false);
        })
    }, []);


    return (
        <>
            <NavBarComponent/>

            {loading ?
                <Dimmer className={'camps-campground-loader'} active inverted>
                    <Loader inverted>Loading</Loader>
                </Dimmer>
                :
                <div>
                    {!!campground &&
                    <Segment className={'camps-campground-details'}>
                        <h3>{campground.name}</h3>
                        <p className="camps-campground-description-style">
                            <h4>Description</h4>
                            {campground.description}
                        </p>
                        <p className="camps-campground-description-style">
                            <h4>Campsites</h4>
                            <p>Total: {campground.campsites.totalSites}</p>
                        </p>
                        <p className="camps-campground-description-style">
                            <h4>Fees</h4>
                            <p>{campground.fees[0].title}: {campground.fees[0].cost}</p>
                            <p>{campground.fees[0].description}</p>
                        </p>
                        <p className="camps-campground-description-style">
                            <h4>Contact</h4>
                            <p>Email: <a>{campground.contacts.emailAddresses[0].emailAddress}</a></p>
                            <p>Phone: <a>{campground.contacts.phoneNumbers[0].phoneNumber}</a></p>
                        </p>
                        {!!campground.images.length &&
                        <p className="camps-campground-description-style" style={{marginTop: '25px'}}>
                            <h4>Images</h4>
                            <ImageGallery items={campground.images.map(img => (
                                {"original": img.url, "thumbnail": img.url}
                            ))}/>
                        </p>
                        }

                        <br/>
                        <Button>Create Trip Here!</Button>
                    </Segment>
                    }
                    {!!campground.longitude && !!campground.latitude &&
                    <Map
                        style="mapbox://styles/risleychris/ckaipv98m05sn1iplo9j0k47d"
                        center={[-Math.abs(campground.longitude), campground.latitude]}
                        pitch={[20]}
                        zoom={[12]}
                        containerStyle={{
                            height: '100vh',
                            width: '100vw'
                        }}

                    >
                        <Layer type={'symbol'} paint={{"icon-color": '#f6e835'}}
                               layout={{'icon-image': 'marker-15', 'icon-size': 2}}>
                            <Feature coordinates={[-Math.abs(campground.longitude), campground.latitude]}/>
                        </Layer>
                    </Map>
                    }


                </div>
            }


        </>
    );

};

const stateToProperty = (state) => ({});

const propertyToDispatchMapper = (dispatch) => ({});

export default connect
(stateToProperty, propertyToDispatchMapper)
(CampgroundContainer)
