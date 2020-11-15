import React, {useEffect} from 'react';
import "./DashboardStyle.css"
import {Button, Container, Grid, Icon, Input, Menu} from "semantic-ui-react";
import CampsiteCard from "../../components/card/CampsiteCard";
import NavBarComponent from "../../components/navbar/NavBarComponent";
import {connect} from "react-redux";
import {getCampsitesAction, searchCampsitesAction} from "../../actions/CampsiteActions";
import CreateCampsiteCard from "../../components/campsiteEditor/CampsiteEditor";
import {useAuth0} from "@auth0/auth0-react";

const DashboardContainer = ({getCampsites, searchCampsites, filtered}) => {
    const {getAccessTokenSilently, user} = useAuth0();

    useEffect(() => {
        getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH_AUDIENCE,
        }).then((token) => {
            getCampsites(user, token)
        });
    }, []);


    return (
        <>
            <NavBarComponent/>
            <div className={'camps-dashboard'}>
                <Container>
                    <Menu secondary className={'camps-menu'}>
                        <Menu.Item className="camps-dashboard-menu-item">
                            <h2>Campsites</h2>
                        </Menu.Item>
                        <Menu.Item
                            className="aligned camps-search-campsite">
                            <Input onChange={(e) => searchCampsites(e.target.value)} type='text' icon={'search'} placeholder='Search' action>
                                <input />
                                <Button icon={'filter'}/>
                                <Button type='submit'>Search</Button>
                            </Input>
                        </Menu.Item>
                    </Menu>
                    <Grid stackable>
                        {filtered.map((campsite, i) =>
                            <Grid.Column key={i} width={4}>
                                <CampsiteCard campsite={campsite}/>
                            </Grid.Column>
                        )}
                        <Grid.Column key={"add-campsite-id"} width={4}>
                            <CreateCampsiteCard
                                isEdit={false}
                                triggerElement={<Button className={'camps-secondary-button camps-create-campsite-card'}>
                                    <h2>Create Campsite</h2>
                                </Button>}/>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
        </>
    );

};

const stateToProperty = (state) => ({
    filtered: state.CampsiteReducer.filtered
});

const propertyToDispatchMapper = (dispatch) => ({
    getCampsites: (user, token) => getCampsitesAction(dispatch, user, token),
    searchCampsites: (term) => searchCampsitesAction(dispatch, term)
});

export default connect
(stateToProperty, propertyToDispatchMapper)
(DashboardContainer)
