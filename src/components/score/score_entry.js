import React from 'react';
import { Link } from 'react-router-dom';
import HoleSelect from '../course/hole_select.js';
import ScoreBoxList from "./score_box_list.js";
import AchievementBoxList from "./achievement_box_list.js";
import "./score_entry.scss";
import CourseSaveService from "../course/course_save_service.js";


export default class ScoreEntry extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            golfer: this.props.match.params.golfer,
            course: this.props.match.params.course,
            screen: this.props.screen,
            holes: new Array(18),
            selected_hole: 0
        };
        this.handleHoleChoose = this.handleHoleChoose.bind(this);
        this.saveHole = this.saveHole.bind(this);
        this.saveStrokes = this.saveStrokes.bind(this);
        this.resetStrokes = this.resetStrokes.bind(this);
        this.resetHole = this.resetHole.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    range(n) {
        return Array.from(Array(n).keys());
    }

    mainContent() {
        switch(this.state.screen) {
            case 'strokes':
                var bonus = false;
                if (!this.state.holes[this.state.selected_hole]) {
                    this.state.holes[this.state.selected_hole] = {'strokes': null, 'achievements': []};
                }
                var ach = this.state.holes[this.state.selected_hole-1];
                if (ach && ach.strokes) {
                    if (ach.strokes.name === 'Double Bogey') {
                        bonus = true;
                    }
                }
                return <ScoreBoxList hole={this.state.selected_hole} bonus={bonus} onSave={this.saveStrokes} onCancel={this.resetHole} score={this.state.holes[this.state.selected_hole].strokes} />;
            case 'achievements':
                var par_bonus=false, bogie_bonus = false;
                var ach = this.state.holes[this.state.selected_hole];
                if (["Eagle", "Birdie", "Par", "Bogey"].includes(ach.strokes.name)) {
                    bogie_bonus = true;
                    if (["Eagle", "Birdie", "Par"].includes(ach.strokes.name)) {
                        par_bonus = true;
                    }
                }
                return <AchievementBoxList hole={this.state.selected_hole} par_bonus={par_bonus} bogie_bonus={bogie_bonus} onSave={this.saveHole} onCancel={this.resetStrokes}/>
            default:
                return <HoleSelect onSelect={this.handleHoleChoose} onSave={this.handleSave} onBack={this.goBack} />;
        }
    }

    handleHoleChoose(hole) {
        this.setState({selected_hole: hole, screen: 'strokes'});
    }

    saveStrokes(hole, value) {
        var holes = this.state.holes;
        holes[hole].strokes = value

        this.setState({
            holes: holes,
            screen: 'achievements'
        });
    }

    resetStrokes() {
        this.setState({
            screen: 'strokes'
        });
    }

    resetHole() {
        this.setState({
            screen: 'init'
        });
    }


    saveHole(hole, value) {
        var holes = this.state.holes;
        holes[hole].achievements = value;
        this.setState({
            holes: holes,
            screen: 'init'
        });
    }

    calculateMoney() {
        var total = 0;
        this.state.holes.forEach((hole) => {
            if (hole.strokes) {
                total += hole.strokes.value;
            }
            hole.achievements && hole.achievements.forEach((ach) => {
                total += ach.value;
            });
        });
        return total;
    }

    handleSave() {
        var service = new CourseSaveService();
        const course = {
            money: this.calculateMoney(),
            holes: this.state.holes,
            course: this.state.course,
            golfer: this.state.golfer,
            CourseGolfer: this.state.golfer +':'+ this.state.course
        };
        service.saveRound(this.state.course, this.state.golfer, course);
    }

    goBack(){
      this.props.history.goBack();
    }

    render() {
        const golfer = this.state.golfer;
        const course = this.state.course;
        const content = this.mainContent();
        const money = this.calculateMoney();
        return (
            <div>
            <article>
            <div className="container-fluid primary-content tagline-box">
            <div className="row">
            <div className="col-md-12">
            <div className="main-marquee">
            <div className="jumbotron jumbotron-fluid">
            <div className="tagline-wrapper">
            <div className="main-tagline">
            Enter Your Scores
            <div>Money Earned: {money}</div>
            <div className="flex-row holes-container">
            {content}
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </article>
            </div>
        );
    }




}



