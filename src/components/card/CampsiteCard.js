import React, {useEffect, useState} from 'react';
import "./CampsiteCardStyle.css"
import {Button, Card, Dropdown, DropdownItem, Grid} from "semantic-ui-react";
import ReactMapboxGl from "react-mapbox-gl";
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import {deleteCampsiteAction, selectCampsiteAction} from "../../actions/CampsiteActions";
import Truncate from 'react-truncate';
import CreateCampsiteCard from "../campsiteEditor/CampsiteEditor";
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
            <Card.Header className={'camps-card-header'}>
                {/*<Map*/}
                {/*    style="mapbox://styles/risleychris/ckaipv98m05sn1iplo9j0k47d"*/}
                {/*    center={[this.bounds[0][0], this.bounds[0][1]]}*/} Have center be the coordinates for campsite
                {/*    pitch={[20]}*/}
                {/*    zoom={[12]}*/}
                {/*    containerStyle={{*/}
                {/*        height: '170px',*/}
                {/*    }}*/}
                {/*/>*/}
                <Grid columns={2} centered>
                    <Grid.Column width={12}>
                        <h3>
                            <Truncate lines={1} ellipsis={<span>...</span>}>
                                {campsite.name}
                            </Truncate>
                        </h3>
                        <Card.Meta>
                            <Truncate lines={1} ellipsis={<span>...</span>}>

                            </Truncate>
                        </Card.Meta>
                    </Grid.Column>
                    <Grid.Column width={1}>
                        <Dropdown
                            pointing={'right'}
                            style={{background: 'none'}}
                            icon='ellipsis vertical'
                            floating
                            className={'camps-edit-btn'}
                            button>


                            <Dropdown.Menu>
                                <CreateCampsiteCard
                                    isEdit={true}
                                    triggerElement={
                                        <DropdownItem onClick={() => selectCampsite(campsite.id)}>
                                            Edit
                                        </DropdownItem>
                                    }
                                />
                                <DropdownItem onClick={() => deleteCampsite(user, campsite.id, token)}>
                                    Delete
                                </DropdownItem>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Grid.Column>
                </Grid>
            </Card.Header>
            <Card.Content className={'camps-card-extra'} extra>
                <Grid columns={1}>
                    <Grid.Column>
                        <Button className={'campssecondary-button camps-start-btn'} as={Link}
                                to={`/campsite/${campsite.id}`}>Start</Button>
                    </Grid.Column>
                </Grid>
            </Card.Content>
        </Card>

    );
};

const stateToProperty = (state) => ({});

const propertyToDispatchMapper = (dispatch) => ({
    deleteCampsite: (user, id, token) => deleteCampsiteAction(dispatch, user, id, token),
    selectCampsite: (id) => selectCampsiteAction(dispatch, id)
});

export default connect
(stateToProperty, propertyToDispatchMapper)
(CampsiteCard)
