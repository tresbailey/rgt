import React from 'react';
import { Link } from 'react-router-dom';

import "./golfer_select.scss";

export default class GolferSelect extends React.Component {

    render() {
        return (
            <div className="flex-column" >
                <div className="golfer-choice">
                    <span><Link to="golfers/tres">Tres'</Link></span>
                </div>
                <div className="golfer-choice">
                    <span><Link to="golfers/joel">Joel</Link></span>
                </div>
                <div className="golfer-choice">
                    <span><Link to="golfers/mark">Mark</Link></span>
                </div>
                <div className="golfer-choice">
                    <span><Link to="golfers/chip">Chip</Link></span>
                </div>
                <div className="golfer-choice">
                    <span><Link to="golfers/john">John</Link></span>
                </div>
                <div className="golfer-choice">
                    <span><Link to="golfers/larry">Larry</Link></span>
                </div>
            </div>
        );
    }
}
