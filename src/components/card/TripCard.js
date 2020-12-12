//import * as React from "react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  List,
  Card,
  Dropdown,
  DropdownItem,
  Form,
  Grid,
  Icon,
  Image,
  Input,
  Modal,
  TextArea,
} from "semantic-ui-react";
import { getCampground } from "../../services/CampgroundService";

const TripCard = ({ trip }) => {
  console.log(trip);
  const campgroundId = trip.campground;
  const [campground, setCampground] = useState({});
  const [loading, setLoading] = useState(true);
  const imageUrl = "/static/media/bg.306fe8e2.png";

  useEffect(() => {
    getCampground(campgroundId, "").then((cg) => {
      setCampground(cg);
      setLoading(false);
      console.log(cg);
    });
  }, []);

  return (
    <Card>
      <Image src={imageUrl} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{trip.name} </Card.Header>
        <Card.Meta>
          <Link to={`/campground/${campground.id}`}>{campground.name}</Link>
        </Card.Meta>
        <Card.Description>{trip.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <List>
          <List.Item>
            <List.Icon name="users" />
            <List.Content>Invite List</List.Content>
          </List.Item>
          {trip.inviteList.map((user) => (
            <List.Item>
              <a onClick={() => {window.location.href=`/profile/${user}`}}>{user}</a>
            </List.Item>
          ))}
        </List>
        <Link to={`/campground/${campground.id}`}>
          <Icon name="location arrow" />
          See Campsite Details
        </Link>
      </Card.Content>
    </Card>
  );
};

const stateToProperty = (state) => ({});

const propertyToDispatchMapper = (dispatch) => ({});

export default connect(stateToProperty, propertyToDispatchMapper)(TripCard);
