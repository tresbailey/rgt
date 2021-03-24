import React from 'react';
import { Link } from 'react-router-dom';

import GolferSelect from "./golfer/golfer_select.js";

export default class Home extends React.Component {
  
  render() {
    return (
      <div>
      <article>
      <div className="container-fluid primary-content window-height tagline-box">
        <div className="row">
          <div className="col-md-12">
            <div className="main-marquee">
              <div className="jumbotron jumbotron-fluid">
                <div className="tagline-wrapper">
                  <div className="main-tagline">
                    Who Are You?
                    <GolferSelect />
                  </div>
                </div>
              </div>
            </div>
                  <Link to="/results">Results</Link>
          </div>
        </div>
      </div>
      </article>
      </div>
    );
  }
}

