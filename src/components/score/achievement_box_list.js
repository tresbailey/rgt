import React from 'react';
import ScoreBox from "./score_box.js";
import Achievement from "./achievements.js";

export default class AchievementBoxList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            par_bonus: props.par_bonus,
            bogie_bonus: props.bogie_bonus,
            hole: props.hole,
            achievements: [],
        };
        this.available_scores = [
            new Achievement('Arnie', 'Par or better without the ball hitting the fairway', this.state.par_bonus ? 1 : 0, true, false),
            new Achievement('Froggie', 'Bogey or better after a drop from a hazard', this.state.bogie_bonus? 1:0, true, true),
            new Achievement("Watson", "Chip in from off the green", this.state.par_bonus? 2:1, false, false),
            new Achievement("Sandie", "Up and down from sand", this.state.par_bonus?2:1, false),
            new Achievement("Greenie", "Closest to pin on Par 3", 2, false, false),
            new Achievement("Sniper", "Holing a shot from 50+ yards", 5, false, false)
        ];

        this.handleSave = this.handleSave.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleAchievement = this.handleAchievement.bind(this);
    }

    handleSave() {
        this.props.onSave(this.state.hole, this.state.achievements);
    }

    handleBack() {
        this.props.onCancel();
    }

    handleAchievement(result) {
        this.setState({ 
            score: result.score,
            achievements: [...this.state.achievements, result.score] });
    }

    potentialAchievements() {
        var boxes = [];
        const par_bonus = this.props.par_bonus;
        const bogie_bonus = this.props.bogie_bonus;
        this.available_scores.forEach((item) => {
            var box = <ScoreBox name={item.name} value={item.value} description={item.description} score={item} onAchieved={this.handleAchievement} />;
            if (!item.isParBonusable && !item.isBogieBonusable) {
                boxes.push(box);
            } else if (item.isParBonusable && par_bonus) {
                boxes.push(box);
            } else if (item.isBogieBonusable && bogie_bonus) {
                boxes.push(box);
            }
        });
        return boxes;
    }

    render() {
        const scores = this.potentialAchievements();
        const hole = this.state.hole;
        return (
            <div>
                Hole #{hole}
                <div className="flex-row holes-container">
                    <div className="hole-select" onClick={this.handleBack}>
                        <div className="fa fa-angle-left"></div>
                        <div>Back</div>
                    </div>
                    {scores}
                    <div className="hole-select" onClick={this.handleSave}>
                        <div className="fa fa-angle-double-right"></div>
                        <div>Save</div>
                    </div>
                </div>
            </div>
        );
    }
}

