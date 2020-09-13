import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import styles from  './homepage.css';
import Header from '../header/header.js';
import ProminentAppBar from '../header_ui/header_ui.js'
import Logo from '../logo/logo.js';

function Homepage() {
  
    return (
    <div>
      <ProminentAppBar/>
      <Logo className = {styles["Logo"]} />
    </div>
    );
  }
  export default Homepage;


