import * as React from "react";
import { Card, Segment, Loader } from "semantic-ui-react";
import { TRIP_TYPES } from "../../containers/profile/constants";
import TripCard from "../card/TripCard.js";
import {connect} from "react-redux";

const TripsViewer = ({
  invited_trips,
  owned_trips,
  isLoading,
  tripType,
  currentUser,
}) => {
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
      {
        invited_trips.length > 0 &&
        <Card.Group itemsPerRow={2}>
          {invited_trips.map((trip) => (
              <TripCard trip={trip} isEditable={false}/>
          ))}
        </Card.Group>
      }
      {
        invited_trips.length < 1 &&
            <span>No trip invites found</span>
      }
    </Segment>
  ) : (
    <Segment attached="bottom">
      <Card.Group itemsPerRow={2}>
        {owned_trips.map((trip) => (
          <TripCard
            trip={trip}
            isEditable={currentUser && currentUser.sub === trip.tripOwner}
          />
        ))}
      </Card.Group>
    </Segment>
  );
};

function stateToProperty() {

}

function propertyToDispatchMapper(dispatch) {

}

export default TripsViewer
