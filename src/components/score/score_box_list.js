import React, {useState} from 'react';
import ScoreBox from "./score_box.js";
import Strokes from "./strokes.js";

const ScoreBoxList = props => {

  const [bonus, setBonus] = useState(props.bonus);
  const [hole, setHole] = useState(hole);
  const [achievements, setAchievements] = useState(achievements);
  const [score, setScore] = useState(score);
  const available_scores = [
          new Strokes('Eagle', bonus ? "Bounce Back Bonus" : "", 7, true),
          new Strokes('Birdie', bonus ? "Bounce Back Bonus" : "", 3, true),
          new Strokes('Par', bonus ? "Bounce Back Bonus" : "", 0, true),
          new Strokes('Bogey', null, 0, false),
          new Strokes('Double Bogey', null, 0, false)
  ];

  const handleAchievement = result => {
    setScore(result.score);
    setAchievements([...achievements, result]);

    props.onSave(hole, score);
  }

  const potentialScores = () =>  {
      var boxes = [];
      const set_score = score;
      available_scores.forEach((item) => {
          const value = item.isBonusable && bonus ? item.value + 1 : item.value;
          boxes.push(<ScoreBox name={item.name} value={value} description={item.description} onAchieved={handleAchievement} score={item} selected={set_score && set_score.name === item.name} />)
      });
      return boxes;
  }

  const handleBack = () => {
      props.onCancel();
  }

  const strokes = potentialScores();
  return (
          <div className="flex-row">
          Hole #{hole}
              <div className="flex-row holes-container">
                  <div className="hole-select" onClick={handleBack}>
                      <div className="fa fa-angle-left"></div>
                      <div>Back</div>
                  </div>
                  {strokes}
              </div>
          </div>
  );
}

export default ScoreBoxList;
