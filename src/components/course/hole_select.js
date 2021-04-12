import React from 'react';
import "./hole_select.scss";

const HoleSelect = props => {
  const range = n => {
      return Array.from(Array(n).keys());
  }

  const handleSelect = value => {
      props.onSelect(value);
  }

  const handleSave = () => {
      props.onSave();
  }

  const goBack = () => {
      props.onBack();
  }

  const selectable_hole = number => {
      return (<div className="hole-select"><span value={number+1} onClick={() => handleSelect(number+1)}>{number+1}</span></div>);
  }

  var hole_select = [];
  for (var i=0; i < 18; i++) {
      hole_select.push(selectable_hole(i));
  }
  return (
      <div className="flex-row holes-container">
          {hole_select}
              <div className="hole-select" onClick={goBack}>
                  <div className="fa fa-angle-left"></div>
                  <div>Back</div>
              </div>
              <div className="hole-select" onClick={handleSave}>
                  <div className="fa fa-angle-double-right"></div>
                  <div>Save</div>
              </div>
      </div>
  )
  
}

export default HoleSelect;
