import * as React from "react";
import { Card, Segment, Loader } from "semantic-ui-react";
import { TRIP_TYPES } from "../../containers/profile/constants";
import TripCard from "../card/TripCard.js";

const TripsViewer = ({ invited_trips, owned_trips, isLoading, tripType }) => {
  // debugger;
  if (isLoading) {
    return (
      <Segment attached="bottom">
        <Loader active inline="centered">
          Loading
        </Loader>
      </Segment>
    );
  }

  return tripType === TRIP_TYPES.invitedTrips ? (
    <Segment attached="bottom">
      <Card.Group itemsPerRow={2}>
        {invited_trips.map((trip) => (
          <TripCard trip={trip} isEditable={false} />
        ))}
      </Card.Group>
    </Segment>
  ) : (
    <Segment attached="bottom">
      <Card.Group itemsPerRow={2}>
        {owned_trips.map((trip) => (
          <TripCard trip={trip} isEditable={true} />
        ))}
      </Card.Group>
    </Segment>
  );
};

export default TripsViewer;
