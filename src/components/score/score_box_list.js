import React from 'react';
import ScoreBox from "./score_box.js";
import Strokes from "./strokes.js";

export default class ScoreBoxList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bonus: props.bonus,
            hole: props.hole,
            achievements: [],
            score: props.score
        };
        this.available_scores = [
            new Strokes('Eagle', this.state.bonus ? "Bounce Back Bonus" : "", 7, true),
            new Strokes('Birdie', this.state.bonus ? "Bounce Back Bonus" : "", 3, true),
            new Strokes('Par', this.state.bonus ? "Bounce Back Bonus" : "", 0, true),
            new Strokes('Bogey', null, 0, false),
            new Strokes('Double Bogey', null, 0, false)
        ]
        this.handleAchievement = this.handleAchievement.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    handleAchievement(result) {
        this.setState({ 
            score: result.score,
            achievements: [...this.state.achievements, result] }, () => {
        this.props.onSave(this.state.hole, this.state.score);
        });
    }

    potentialScores() {
        var boxes = [];
        const set_score = this.state.score;
        this.available_scores.forEach((item) => {
            const value = item.isBonusable && this.state.bonus ? item.value + 1 : item.value;
            boxes.push(<ScoreBox name={item.name} value={value} description={item.description} onAchieved={this.handleAchievement} score={item} selected={set_score && set_score.name === item.name} />)
        });
        return boxes;
    }

    render() {
        const strokes = this.potentialScores();
        const hole = this.state.hole;
        return (
            <div>
            Hole #{hole}
                <div className="flex-row holes-container">
                    <div className="hole-select" onClick={this.handleBack}>
                        <div className="fa fa-angle-left"></div>
                        <div>Back</div>
                    </div>
                    {strokes}
                </div>
            </div>
        );
    }
    handleBack() {
        this.props.onCancel();
    }
}
