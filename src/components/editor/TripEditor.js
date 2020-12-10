import React, { useEffect, useState } from "react";
import "./TripEditorStyle.css";
import { Button, Form, Input, Modal, TextArea } from "semantic-ui-react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createTripAction, updateTripAction } from "../../actions/TripActions";
import { selectCurrentUser } from "../../actions/CurrentUserActions";

// TODO Change this whole thing to not use JSON and to allow you to create a campsite
const TripEditor = ({ campsite, triggerElement, isEdit, existingTrip }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const currentUser = useSelector(selectCurrentUser);
  const [editStateTrip, setEditStateTrip] = useState(
    existingTrip || {
      name: "",
      inviteList: "",
      description: "",
      date: new Date().valueOf(),
      campsite,
    }
  );

  const updateField = (e, fieldName) =>
    setEditStateTrip({
      ...editStateTrip,
      [fieldName]: fieldName === "date" ? e : e.target.value,
    });

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={triggerElement}
    >
      <Modal.Header>
        {isEdit ? <h4>Edit Trip</h4> : <h4>Create Trip</h4>}
      </Modal.Header>
      <Modal.Content className={"camps-json-input-comp"}>
        <Form>
          <Form.Group widths="equal">
            <Form.Field
              control={Input}
              label="Trip Name"
              placeholder="Default Trip"
              onChange={(e) => updateField(e, "name")}
              value={editStateTrip.name}
            />
          </Form.Group>
          <Form.Field
            control={Input}
            type={"email"}
            label="Invite List"
            placeholder="abc@gmail.com"
            onChange={(e) => updateField(e, "inviteList")}
            value={editStateTrip.inviteList}
          />
          <Form.Field
            control={TextArea}
            label="Trip Description"
            placeholder="..."
            onChange={(e) => updateField(e, "description")}
            value={editStateTrip.description}
          />
          <Form.Field>
            <label>Date</label>
            <DatePicker
              value={new Date(editStateTrip.date).toDateString()}
              onChange={(e) => updateField(e.valueOf(), "date")}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions className={"camps-create-campsite-card-actions"}>
        <Button
          onClick={() => {
            if (!currentUser) return;
            getAccessTokenSilently({
              audience: process.env.REACT_APP_AUTH_AUDIENCE,
            }).then((token) => {
              isEdit
                ? updateTripAction(
                    dispatch,
                    currentUser,
                    existingTrip.id,
                    { trip: editStateTrip },
                    token
                  )
                : createTripAction(
                    dispatch,
                    currentUser,
                    { trip: editStateTrip },
                    token
                  );
            });
          }}
        >
          Save Trip
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const stateToProperty = (state) => ({
  selectedCampsite: state.DashboardReducer.selected,
});

const propertyToDispatchMapper = (dispatch) => ({});

export default connect(stateToProperty, propertyToDispatchMapper)(TripEditor);
