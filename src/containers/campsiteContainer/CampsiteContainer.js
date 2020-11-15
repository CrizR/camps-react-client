import React, {useEffect} from 'react';
import "./CampsiteContainerStyle.css"
import NavBarComponent from "../../components/navbar/NavBarComponent";
import {connect} from "react-redux";
import {useAuth0} from "@auth0/auth0-react";
import {getCampsite} from "../../services/CampsiteService";


//TODO: BUILD PAGE TO SHOWCASE CAMPSITE AND SHARE CAMPSITE
const CampsiteContainer = ({id}) => {
    const {getAccessTokenSilently, user} = useAuth0();

    useEffect(() => {
        getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH_AUDIENCE,
        }).then((token) => {
            // getCampsite(user, token)
        });
    }, []);


    return (
        <>
            <NavBarComponent/>
        </>
    );

};

const stateToProperty = (state) => ({
    filtered: state.CampsiteReducer.filtered
});

const propertyToDispatchMapper = (dispatch) => ({});

export default connect
(stateToProperty, propertyToDispatchMapper)
(CampsiteContainer)
