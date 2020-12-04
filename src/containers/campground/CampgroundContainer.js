import React, {useEffect, useState} from 'react';
import "./CampgroundContainerStyle.css"
import NavBarComponent from "../../components/navbar/NavBarComponent";
import {connect} from "react-redux";
import ReactMapboxGl, {Feature, Layer} from "react-mapbox-gl";
import {getCampground} from "../../services/CampgroundService";
import {Button, Dimmer, Loader, Segment} from "semantic-ui-react";

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
                    <Segment className={'camps-campground-details'}>
                        <h4>{campground.name}</h4>
                        <p className="camps-campground-description-style">
                            {campground.description}
                        </p>
                        <br/>
                        <Button>Create Trip Here!</Button>
                    </Segment>
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
