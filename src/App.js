import React from 'react';
//import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Main from "./components/main.js";
import './App.css';
import logo from './resources/images/teed.png';

export default class App extends React.Component {

    render() {
        return (
            <div>
                <header className="app-header">
                  <span className="header-image">
                    <img src={logo} className="app-logo" alt="tee and ball" />
                  </span>
                <span className="header-title">
                    RGT X
                </span>
                </header>
                <Main />
            </div>
        )
    }
};
