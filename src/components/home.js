import React from 'react';
import { Link } from 'react-router-dom';

import GolferSelect from "./golfer/golfer_select.js";

export default class Home extends React.Component {

    render() {
        return (
            <div className="main-tagline">
            <h2>Who Are You?</h2>
            <GolferSelect />
            <Link to="/results">Results</Link>
            </div>
        );
    }
}

