import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "semantic-ui-react";
import { updateUserAction } from "../../actions/CurrentUserActions";
import "../../containers/profile/ProfileContainerStyle.css";

//TODO: SHOWCASE TRIPS
const ProfileEditor = ({ currentUser, setEditing }) => {
  const { getAccessTokenSilently, user } = useAuth0();

  const dispatch = useDispatch();

  const [userAttr, setUserAttr] = React.useState({
    about: currentUser.about || "",
    phone: currentUser.phone || "",
    location: currentUser.location || "",
  });

  return (
    currentUser && (
      <Form>
        <Form.TextArea
          label="About"
          value={userAttr.about}
          onChange={(e) => setUserAttr({ ...userAttr, about: e.target.value })}
        />
        <Form.Field>
          <label>Location</label>
          <input
            placeholder="Location"
            value={userAttr.location}
            onChange={(e) =>
              setUserAttr({
                ...userAttr,
                location: e.target.value,
              })
            }
          />
        </Form.Field>
        <Form.Field>
          <label>Phone</label>
          <input
            placeholder="Phone"
            value={userAttr.phone}
            onChange={(e) =>
              setUserAttr({ ...userAttr, phone: e.target.value })
            }
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input value={currentUser.email} readOnly="readonly" disabled />
        </Form.Field>
        <Form.Field>
          <label>First Name</label>
          <input value={currentUser.fName} readOnly="readonly" disabled />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input value={currentUser.lName} readOnly="readonly" disabled />
        </Form.Field>

        <div>
          <Button floated="left" onClick={() => setEditing(false)}>
            Cancel
          </Button>
          <Button
            floated="right"
            positive
            onClick={() => {
              setEditing(false);
              getAccessTokenSilently({
                audience: process.env.REACT_APP_AUTH_AUDIENCE,
              }).then((token) => {
                updateUserAction(
                  dispatch,
                  {
                    ...currentUser,
                    ...userAttr,
                  },
                  token
                );
              });
            }}
          >
            Save
          </Button>
        </div>
      </Form>
    )
  );
};

export default ProfileEditor;
