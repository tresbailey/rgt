import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import RgtApi from "../../services/rgt_api.js";

import "./golfer_select.scss";


const SaveBox = props => {
  const [editable, setEditable] = useState(props.editable);
  const [golfer, setGolfer] = useState('');

  const saver = () => {
    props.callBack(golfer);
    setEditable(false);
  };

  return(
    <div className="golfer-choice" style={{fontSize: '2em'}}>
    { !editable &&
        <a onClick={() => setEditable(true)}>Add Golfer</a>
      ||
        <div className="flex-column">
          <input type="text" value={golfer} onChange={event => {setGolfer(event.target.value)}} />
          <div className="flex-row">
            <a className="course-save-btn" onClick={saver}>
            Save Golfer
            </a>
          </div>
      </div>
          
    }
    </div>

  )
}

export default SaveBox;

