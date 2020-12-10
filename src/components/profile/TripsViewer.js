import * as React from "react";
import {
  Button,
  Grid,
  Segment,
  Container,
  Header,
  Image,
  Menu,
  Loader,
  Form,
} from "semantic-ui-react";
import { TRIP_TYPES } from "../../containers/profile/constants";

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
      {trips.map((trip) => (
        <div>hi</div>
      ))}
    </Segment>
  ) : (
    <Segment attached="bottom">
      {owned_trips.map((trip) => (
        <div>hi</div>
      ))}
    </Segment>
  );
};

export default TripsViewer;
