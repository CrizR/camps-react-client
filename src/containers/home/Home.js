import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import bg2 from "../../assets/homepage2.jpg"
import "./HomeStyle.css"
// import {
//     Button,
// } from "semantic-ui-react";
import Button from '@material-ui/core/Button'
import NavBarComponent from "../../components/navbar/NavBarComponent";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import styled from "@material-ui/core/styles/styled";


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + bg2})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

const Home = ({}) => {
  const classes = useStyles();
    return (
        <div>
            <NavBarComponent />
            <div className={classes.root} >
              <CssBaseline />
            <div style={{padding: '50px'}}>
            </div>
                <h1 className="camps-title">Welcome to Camps!</h1>
                <h2 className="camps-subtitle">A service that lets you camp with others</h2>
              <div style={{padding: '50px'}}>
              </div>
                <Button class="ui inverted button massive ui button" as={Link} to={"/dashboard"}>Dashboard</Button>
              </div>
        </div>
    );

};

const stateToProperty = (state) => ({});

const propertyToDispatchMapper = (dispatch) => ({});

export default connect
(stateToProperty, propertyToDispatchMapper)
(Home)
