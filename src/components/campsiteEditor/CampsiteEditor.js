import React, {useEffect, useState} from 'react';
import "./CampsiteEditorStyle.css"
import {
    Button,
    Grid,
    Modal,
} from "semantic-ui-react";
import {connect} from "react-redux";
import {createCampsiteAction, getCampsitesAction, updateCampsiteAction} from "../../actions/CampsiteActions";
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import {v4 as uuid} from "uuid";
import {useAuth0} from "@auth0/auth0-react";
import useEventListener from '@use-it/event-listener'

const REQUIRED_MAIN_FIELDS = ["name", "time", "questions"];
const REQUIRED_QUESTION_FIELDS = ["question", "answers", "correctAnswers", "timeLimit"];
const sampleCampsite = {};

// TODO Change this whole thing to not use JSON and to allow you to create a campsite
const CampsiteEditor = ({createCampsite, updateCampsite, selectedCampsite, getCampsites, triggerElement, isEdit}) => {


    const [campsite, setCampsite] = useState({});
    const [ready, setReady] = useState(true);
    const [open, setOpen] = React.useState(false);
    const {getAccessTokenSilently, user} = useAuth0();
    const [token, setToken] = useState(undefined);

    function handler({key}) {
        setReady(false)
    }

    useEventListener('keydown', handler);

    useEffect(() => {
        getAccessTokenSilently({
            audience: process.env.REACT_APP_AUTH_AUDIENCE,
        }).then((token) => {
            setToken(token)
        });
    }, []);


    useEffect(() => {
        setCampsite(isEdit ? setupCampsiteObject(selectedCampsite) : sampleCampsite)
    }, [selectedCampsite]);


    const handleChange = e => {
        let parsedCampsite = parseCampsite(e.json);
        if (!!parsedCampsite) {
            setCampsite(parsedCampsite);
            setReady(true)
        } else {
            setReady(false)
        }
    };

    const isProperCampsite = () => {

        let requiredFields = new Set(REQUIRED_MAIN_FIELDS);
        let requiredQuestionFields = new Set(REQUIRED_QUESTION_FIELDS);

        if (!ready || !campsite || !Object.keys(campsite).length || !campsite.questions || !Object.keys(campsite.questions).length) {
            return false
        }

        for (let i = 0; i < requiredFields.length; i++) {
            if (!campsite.hasOwnProperty(requiredFields[i])) {
                return false
            }
        }

        for (let i = 0; i < campsite.questions.length; i++) {
            for (let j = 0; j < requiredQuestionFields.length; j++) {
                if (!campsite.questions[i].hasOwnProperty(requiredQuestionFields[j])) {
                    return false
                }
            }
        }

        return true

    };


    function parseCampsite(str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return false
        }
    }

    function setupCampsiteObject(s) {
        if (s.hasOwnProperty('id')) {
            let copy = JSON.parse(JSON.stringify(s));
            delete copy['id'];
            return copy
        } else {
            return s
        }
    }

    function createOrUpdate() {
        if (isEdit) {
            updateCampsite(user, selectedCampsite.id, campsite, token)
        } else {
            createCampsite(user, campsite, token).then(() => {
                getCampsites(user, token);
            })
        }
        setOpen(false);
    }

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
                    <h2>{campsite.name}</h2>
                    :
                    <h2>Campsite Creator</h2>
                }
            </Modal.Header>
            <div className={'camps-json-input-comp'}>
                {/*<JSONInput*/}
                {/*    id={uuid()}*/}
                {/*    placeholder={campsite}*/}
                {/*    locale={locale}*/}
                {/*    height='600px'*/}
                {/*    width='100%'*/}
                {/*    waitAfterKeyPress={2000}*/}
                {/*    onChange={handleChange}*/}
                {/*/>*/}
            </div>
            <Modal.Actions className={'camps-create-campsite-card-actions'}>
                <Grid>
                    <Grid.Column>
                        <Button disabled={!isProperCampsite()}
                                onClick={() => isProperCampsite() && createOrUpdate()}
                                primary>
                            {isEdit ?
                                <span>Update Campsite</span>
                                :
                                <span>Save Campsite</span>
                            }
                        </Button>
                    </Grid.Column>
                </Grid>
            </Modal.Actions>
        </Modal>
    );
};

const stateToProperty = (state) => ({
    selectedCampsite: state.CampsiteReducer.selected
});

const propertyToDispatchMapper = (dispatch) => ({
    createCampsite: (user, campsiteObj, token) => createCampsiteAction(dispatch, user, campsiteObj, token),
    updateCampsite: (user, id, campsiteObj, token) => updateCampsiteAction(dispatch, user, id, campsiteObj, token),
    getCampsites: (user, token) => getCampsitesAction(dispatch, user, token)
});

export default connect
(stateToProperty, propertyToDispatchMapper)
(CampsiteEditor)
