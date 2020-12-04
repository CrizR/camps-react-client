import React, {useEffect, useState} from 'react';
import {
    Button,
} from "semantic-ui-react";
import NavBarComponent from "../../components/navbar/NavBarComponent";
import {connect} from "react-redux";
import {Link} from "react-router-dom";


const Home = ({}) => {


    return (
        <>
            <NavBarComponent/>
            <div style={{marginTop: '100px'}}>
                <h1>TODO Home Page</h1>
                <Button as={Link} to={"/dashboard"}>Dashboard</Button>
            </div>
        </>
    );

};

const stateToProperty = (state) => ({});

const propertyToDispatchMapper = (dispatch) => ({});

export default connect
(stateToProperty, propertyToDispatchMapper)
(Home)
