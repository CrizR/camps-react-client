import React, {useEffect, useState} from 'react';
import "./CampgroundContainerStyle.css"
import NavBarComponent from "../../components/navbar/NavBarComponent";
import {connect} from "react-redux";

const CampgroundContainer = ({}) => {
    useEffect(() => {

    }, []);


    return (
        <>
            <NavBarComponent/>

        </>
    );

};

const stateToProperty = (state) => ({
    filtered: state.DashboardReducer.filtered,
    total: state.DashboardReducer.total,
    pageNumber: state.DashboardReducer.pageNumber
});

const propertyToDispatchMapper = (dispatch) => ({
});

export default connect
(stateToProperty, propertyToDispatchMapper)
(CampgroundContainer)
