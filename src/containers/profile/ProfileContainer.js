import React, {useEffect} from 'react';
import "./CampsiteContainerStyle.css"
import NavBarComponent from "../../components/navbar/NavBarComponent";
import {connect} from "react-redux";
import {useAuth0} from "@auth0/auth0-react";


//TODO: BUILD PAGE TO SHOWCASE PROFILE, SHOWS RESERVED CAMPSITES AND MANAGED CAMPSITES (Two separate components)
const ProfileContainer = ({id}) => {
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
(ProfileContainer)
