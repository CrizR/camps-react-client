import React, {useEffect, useState} from 'react';
import "./TripEditorStyle.css"
import {
    Modal,
} from "semantic-ui-react";
import {connect} from "react-redux";
import {useAuth0} from "@auth0/auth0-react";


// TODO Change this whole thing to not use JSON and to allow you to create a campsite
const TripEditor = ({triggerElement, isEdit}) => {


    const [open, setOpen] = React.useState(false);
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
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
                triggerElement
            }
        >
            <Modal.Header>

            </Modal.Header>
            <div className={'camps-json-input-comp'}>

            </div>
            <Modal.Actions className={'camps-create-campsite-card-actions'}>

            </Modal.Actions>
        </Modal>
    );
};

const stateToProperty = (state) => ({
    selectedCampsite: state.CampsiteReducer.selected
});

const propertyToDispatchMapper = (dispatch) => ({
});

export default connect
(stateToProperty, propertyToDispatchMapper)
(TripEditor)
