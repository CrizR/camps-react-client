import React, {useEffect, useState} from 'react';
import "./HomeStyle.css"
import {
    Button, Grid, Image, Segment,
} from "semantic-ui-react";
import NavBarComponent from "../../components/navbar/NavBarComponent";
import {connect} from "react-redux";
import {useAuth0} from "@auth0/auth0-react";
import Masonry from "react-masonry-component";
import a1 from "../../assets/a1.svg"
import a2 from "../../assets/a2.svg"
import bg from "../../assets/landscape.svg"
import {Link} from "react-router-dom";

const masonryOptions = {
    transitionDuration: 0,
    fitWidth: true
};

const offers = [
    {
        "Header": "Find a Campground",
        "Description": "Using our search tool find a Campground you want to visit!",
        "Image": a1
    },
    {
        "Header": "Plan a Trip",
        "Description": "After choosing a campground, plan a trip and invite your friends!",
        "Image": a2
    },
];

export function Home() {

    function getOffers() {
        let offerObjects = [];

        offers.forEach(offer => {
            offerObjects.push(
                <Segment className={'offer-card'}>
                    <Image src={offer.Image}/>
                    <div className={'offer-content'}>
                        <h1 className={'offer-header'}>
                            {offer.Header}
                        </h1>
                        <h3 className={'offer-description'}>
                            {offer.Description}
                        </h3>
                    </div>
                </Segment>
            )
        });
        return offerObjects

    }


    return (
        <>
            <div className={'home'}>
                <NavBarComponent/>
                <div className={'home-body'}>
                    <div className={'cover-text'}>
                        <h1>Your camping trip planner</h1>
                        <h3>Find a trip in the wild!</h3>
                    </div>
                    <div className={'offer-content'}>
                        <Grid columns={2} centered>
                            {getOffers()}
                        </Grid>
                    </div>
                    <Button as={Link} to={'/dashboard'} className={'camps-secondary-button plan-trip-btn'}>Plan Trip</Button>
                </div>
                <Image className='camps-bg-home-image' src={bg} alt={"test"}/>
            </div>
        </>
    );

}

const stateToProperty = (state) => ({});

const propertyToDispatchMapper = (dispatch) => ({});

export default connect
(stateToProperty, propertyToDispatchMapper)
(Home)
