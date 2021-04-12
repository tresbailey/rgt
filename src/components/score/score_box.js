import React, {useState} from 'react';
import "./score_box.scss";

const ScoreBox = props => {

    const [selected, setSelected] = useState(props.selected);

    const handleAchieved = () => {
        setSelected(!selected);
        props.onAchieved(
            {
                name: props.name,
                value: props.value,
                score: props.score
            }
        );
    }

    const name = props.name;
    const description = props.description;
    const value = props.value;
    return (
            <div className={"score-select " + (selected? 'selected': '')} onClick={handleAchieved}>
                <span>{name}</span>
                { description &&
                <span className="description">{description}</span>
                }
                <span>${value}</span>
            </div>
    );
}

export default ScoreBox;
