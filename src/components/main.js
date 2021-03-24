import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./home.js";
import CourseSelect from "./course/course_select.js";
import ScoreEntry from "./score/score_entry.js";
import ResultsList from "./results/results_list.js";

export default class Main extends React.Component {

    render() {
        return (
            <main>
                <Switch>
                    <Route exact path="/golfers" component={Home} />
                    <Route exact path="/" component={Home} />
                    <Route path="/golfers/:golfer/:course" component={ScoreEntry} />
                    <Route path="/golfers/:golfer" component={CourseSelect} />
                    <Route path="/results" component={ResultsList} />
                </Switch>
            </main>
        )
    }
};


