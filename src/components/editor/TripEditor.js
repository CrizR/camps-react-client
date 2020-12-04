import React, {useEffect, useState} from 'react';
import "./TripEditorStyle.css"
import {
    Button,
    Form, Input,
    Modal, TextArea,
} from "semantic-ui-react";
import {connect} from "react-redux";
import {useAuth0} from "@auth0/auth0-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


// TODO Change this whole thing to not use JSON and to allow you to create a campsite
const TripEditor = ({campsite, triggerElement, isEdit}) => {


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
                {isEdit ?
                    <h4>Edit Trip</h4>
                    :
                    <h4>Create Trip</h4>
                }
            </Modal.Header>
            <Modal.Content className={'camps-json-input-comp'}>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field
                            control={Input}
                            label='Trip Name'
                            placeholder='Default Trip'
                        />
                    </Form.Group>
                    <Form.Field
                        control={Input}
                        type={"email"}
                        label='Invite List'
                        placeholder='abc@gmail.com'
                    />
                    <Form.Field
                        control={TextArea}
                        label='Trip Description'
                        placeholder='...'
                    />
                    <Form.Field>
                        <label>Date</label>
                        <DatePicker/>
                    </Form.Field>

                </Form>
            </Modal.Content>
            <Modal.Actions className={'camps-create-campsite-card-actions'}>
                <Button>Save Trip</Button>
            </Modal.Actions>
        </Modal>
    );
};

const stateToProperty = (state) => ({
    selectedCampsite: state.DashboardReducer.selected
});

const propertyToDispatchMapper = (dispatch) => ({});

export default connect
(stateToProperty, propertyToDispatchMapper)
(TripEditor)
