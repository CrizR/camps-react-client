import React, {useEffect} from 'react';
import "./DashboardStyle.css"
import {Button, Container, Grid, Icon, Input, Menu} from "semantic-ui-react";
import CampsiteCard from "../../components/card/CampsiteCard";
import NavBarComponent from "../../components/navbar/NavBarComponent";
import {connect} from "react-redux";
import {getCampsitesAction, searchCampsitesAction} from "../../actions/CampsiteActions";
import CreateCampsiteCard from "../../components/TripEditor/TripEditor";
import {useAuth0} from "@auth0/auth0-react";

const DashboardContainer = ({getCampsites, searchCampsites, filtered}) => {
    const {getAccessTokenSilently, user} = useAuth0();

    useEffect(() => {
        getCampsites("YOSE", 50, 0, "")
    }, []);


    return (
        <>
            <NavBarComponent/>
            <div className={'camps-dashboard'}>
                <Container>
                    <Menu secondary className={'camps-menu'}>
                        <Menu.Item className="camps-dashboard-menu-item">
                            <h2>Campgrounds</h2>
                        </Menu.Item>
                        <Menu.Item
                            className="aligned camps-search-campsite">
                            <Input onChange={(e) => searchCampsites("YOSE", 50, 0, e.target.value)} type='text'
                                   icon={'search'}
                                   placeholder='Search' action>
                                <input/>
                                <Button icon={'filter'}/>
                                <Button type='submit'>Search</Button>
                            </Input>
                        </Menu.Item>
                    </Menu>
                    <Grid stackable>
                        {filtered.map((campsite, i) =>
                            <Grid.Column key={i} width={5}>
                                <CampsiteCard campsite={campsite}/>
                            </Grid.Column>
                        )}
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
    getCampsites: (parkCode, limit, start, query) => getCampsitesAction(dispatch, parkCode, limit, start, query),
    searchCampsites: (term) => searchCampsitesAction(dispatch, term)
});

export default connect
(stateToProperty, propertyToDispatchMapper)
(DashboardContainer)
