import React, {useEffect, useState} from 'react';
import "./CampsiteCardStyle.css"
import {Button, Card, Dropdown, DropdownItem, Grid} from "semantic-ui-react";
import ReactMapboxGl from "react-mapbox-gl";
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import Truncate from 'react-truncate';
import CreateCampsiteCard from "../TripEditor/TripEditor";
import {useAuth0} from "@auth0/auth0-react";


const Map = ReactMapboxGl({
    minZoom: 2,
    accessToken: 'pk.eyJ1IjoicmlzbGV5Y2hyaXMiLCJhIjoiY2s5cHZwOHVuMGV5eDNqdHJjNm5ucGZxNyJ9.KJz2jkT1kFU_E1q2NQpQzA'
});

// TODO: Make this properly display campsite
// Let's use mapbox to showcase its location
function CampsiteCard({campsite, selectCampsite, deleteCampsite}) {

    const {getAccessTokenSilently, user} = useAuth0();
    const [token, setToken] = useState(undefined);

    useEffect(() => {
        getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH_AUDIENCE,
        }).then((token) => {
            setToken(token)
        });
    }, []);

    return (
        <Card className={'camps-card'} raised>
            <Map
                style="mapbox://styles/risleychris/ckaipv98m05sn1iplo9j0k47d"
                center={[-Math.abs(campsite.longitude), campsite.latitude]}
                pitch={[20]}
                zoom={[12]}
                containerStyle={{
                    height: '150px',
                }}
            />
            <Card.Header className={'camps-card-header'}>

                <Grid columns={2} centered style={{padding: '10px'}}>
                    <h3>
                        <Truncate lines={1} ellipsis={<span>...</span>}>
                            {campsite.name}
                        </Truncate>
                    </h3>

                </Grid>
            </Card.Header>
            <Card.Content>
                <Card.Meta>
                    <p style={{overflow: 'hidden'}}>{campsite.description}</p>
                </Card.Meta>
            </Card.Content>
            <Card.Content className={'camps-card-extra'} extra>
                <Grid columns={1}>
                    <Grid.Column>
                        <Button className={'campssecondary-button camps-start-btn'} as={Link}
                                to={`/campsite/${campsite.id}`}>See Details</Button>
                    </Grid.Column>
                </Grid>
            </Card.Content>
        </Card>

    );
};

const stateToProperty = (state) => ({});

const propertyToDispatchMapper = (dispatch) => ({});

export default connect
(stateToProperty, propertyToDispatchMapper)
(CampsiteCard)
