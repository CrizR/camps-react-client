import * as React from "react";
import {
  Button,
  Grid,
  Card,
  Segment,
  Container,
  Header,
  Image,
  Menu,
  Loader,
  Form,
} from "semantic-ui-react";
import { TRIP_TYPES } from "../../containers/profile/constants";
import TripCard from "../card/TripCard.js";

const TripsViewer = ({ trips, owned_trips, isLoading, tripType }) => {
  if (isLoading) {
    return (
      <Segment attached="bottom">
        <Loader active inline="centered">
          Loading
        </Loader>
      </Segment>
    );
  }

  return tripType === TRIP_TYPES.allTrips ? (
    <Segment attached="bottom">
      <Card.Group itemsPerRow={2}>
        {trips.map((trip) => (
          <TripCard trip={trip}></TripCard>
        ))}
      </Card.Group>
    </Segment>
  ) : (
    <Segment attached="bottom">
      {owned_trips.map((trip) => (
        <Card.Group itemsPerRow={2}>
          <TripCard trip={trip}></TripCard>
        </Card.Group>
      ))}
    </Segment>
  );
};

export default TripsViewer;
