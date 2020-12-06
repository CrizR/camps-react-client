import React, {useEffect, useState} from 'react';
import "./CampgroundContainerStyle.css"
import NavBarComponent from "../../components/navbar/NavBarComponent";
import {connect} from "react-redux";
import ReactMapboxGl, {Feature, Layer} from "react-mapbox-gl";
import {getCampground} from "../../services/CampgroundService";
import {Button, Dimmer, Icon, Image, Loader, Segment} from "semantic-ui-react";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css"
import bg from "../../assets/bg.png"

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
                        <div className="camps-campground-description-style">
                            <h4><Icon name={'file'}/> Description</h4>
                            {campground.description}
                        </div>
                        <div className="camps-campground-description-style">
                            <h4><Icon name={'tree'}/> Campsites</h4>
                            <p>Total: {campground.campsites.totalSites}</p>
                        </div>
                        <div className="camps-campground-description-style">
                            <h4>Fees </h4>
                            <p>{campground.fees[0].title}: <Icon name={'dollar'}/>{campground.fees[0].cost}</p>
                            <p>{campground.fees[0].description}</p>
                        </div>
                        <div className="camps-campground-description-style">
                            <h4>Contact</h4>
                            <p><Icon name={'mail'}/><a>{campground.contacts.emailAddresses[0].emailAddress}</a></p>
                            <p><Icon name={'phone'}/> <a>{campground.contacts.phoneNumbers[0].phoneNumber}</a></p>
                        </div>
                        {!!campground.images.length &&
                        <div className="camps-campground-description-style" style={{marginTop: '25px'}}>
                            <h4><Icon name={'photo'}/> Images</h4>
                            <ImageGallery sizes={'small'} items={campground.images.map(img => (
                                {"original": img.url, "originalClass": "camps-gallery-style", "thumbnail": img.url}
                            ))}/>
                        </div>
                        }
                        <br/>
                        <Button>Create Trip Here!</Button>
                    </Segment>
                    }
                    {!!campground.longitude && !!campground.latitude ?
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
                        :

                        <Image style={{height:'100vh', width:'100%'}} src={bg}/>
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
