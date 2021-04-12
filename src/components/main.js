import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import 'regenerator-runtime/runtime';
import Home from "./home.js";
import CourseSelect from "./course/course_select.js";
import ScoreEntry from "./score/score_entry.js";
import ResultsList from "./results/results_list.js";
import CourseSetup from "./course/course_setup.js";
import RgtApi from "../services/rgt_api.js";


const Main = props => {

  const [allGolfers, setAllGolfers] = useState(allGolfers);

  useEffect(() => {
    const rgt_api = new RgtApi();
    const userFunction = async () => {
      const res = await rgt_api.preload_users();
      console.log(res.data);
      setAllGolfers(res.data);
    }
    userFunction();
  }, []);

  return (
      <main>
          <div>
          <article>
          <div className="container-fluid primary-content window-height tagline-box">
          <div className="tagline-wrapper">
          <Switch>
              <Route exact path="/golfers" component={Home} />
              <Route exact path="/" component={Home} />
              <Route path="/golfers/:golfer/:course" component={ScoreEntry} />
              <Route path="/golfers/:golfer" component={CourseSelect} />
              <Route path="/courses" component={CourseSetup} />
              <Route path="/results" component={ResultsList} />
          </Switch>
      </div>
      </div>
      </article>
      </div>
      </main>
  )
};

export default Main

