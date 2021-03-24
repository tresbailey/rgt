import React from 'react';
import "./score_box.scss";

export default class ScoreBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.selected
        };
        this.handleAchieved = this.handleAchieved.bind(this);
    }

    handleAchieved() {
        this.setState(prevState => ({
            selected: !prevState.selected
        }));
        this.props.onAchieved(
            {
                name: this.props.name,
                value: this.props.value,
                score: this.props.score
            }
        );
    }

    render() {
        const name = this.props.name;
        const description = this.props.description;
        const value = this.props.value;
        return (
            <div className={"score-select " + (this.state.selected? 'selected': '')} onClick={this.handleAchieved}>
                <span>{name}</span>
                { description &&
                <span className="description">{description}</span>
                }
                <span>${value}</span>
            </div>
        );
    }
}
