import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Table,
  Input,
  Modal,
  Icon,
  Label,
} from "semantic-ui-react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { searchUserEmailAdminAction } from "../../actions/AdminActions";

const InviteTag = ({ email, onDelete }) => (
  <Label>
    <Icon name="delete" onClick={() => onDelete(email)} />
    {email}
  </Label>
);

const InviteEditor = ({ inviteList, setInvitees }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [searchTerm, setSearchTerm] = React.useState("");
  const dispatch = useDispatch();
  const [isSearching, setIsSearching] = React.useState(false);

  return (
    <div>
      <div>
        <Input
          icon="users"
          iconPosition="left"
          type={"email"}
          placeholder="Search users..."
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <Button
          content="Invite"
          disabled={isSearching}
          onClick={() => {
            setIsSearching(true);
            getAccessTokenSilently({
              audience: process.env.REACT_APP_AUTH_AUDIENCE,
            })
              .then((token) =>
                searchUserEmailAdminAction(dispatch, searchTerm, token)
              )
              .then((reduxAction) => {
                if (reduxAction.users.length) {
                  setInvitees(inviteList.concat([searchTerm]));
                }
              })
              .catch((e) => console.error(e))
              .finally(() => setIsSearching(false));
          }}
        />
      </div>
      <div>
        {inviteList.map((userEmail) => (
          <InviteTag
            email={userEmail}
            onDelete={(email) => {
              setInvitees(inviteList.filter((invite) => invite !== email));
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default InviteEditor;
