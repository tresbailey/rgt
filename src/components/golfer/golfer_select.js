import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import SaveBox from './save_golfer.js';
import RgtApi from "../../services/rgt_api.js";

import "./golfer_select.scss";

const GolferSelect = props => {
  const [golferList, updateGolferList] = useState([]); 
  const [reloader, setReloader] = useState(false);
  const [year, setYear] = useState(props.year || 2021);

  const saveGolfer = (golfer) => {
      console.log(golfer);
    const rgt_api = new RgtApi();
    const saveCall = async () => {
      const res = await rgt_api.save_golfer_round(year, golfer);
      const new_list = golferList.concat([golfer]);
    };
    saveCall();

  };

  useEffect(() => {
    const rgt_api = new RgtApi();
    const userFunction = async () => {
      const res = await rgt_api.preload_users();
      updateGolferList(res.data);
    }
    userFunction();
  }, []);

  return (
      <div className="golfer-container" >
        {golferList.map(({name}, index) => {
          return (
          <div className="golfer-choice">
              <span><Link to="golfers/{name}">{name}</Link></span>
          </div>
    );
      })}
        <SaveBox editable={false} callBack={saveGolfer}/>
      </div>
  );
}

export default GolferSelect;
