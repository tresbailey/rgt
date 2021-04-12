import React, { useState, useEffect } from 'react';

const CourseContainer = props => {

  return (
    <div className="course-container">
      {props.course.name}
    </div>
  );
}

export default CourseContainer;

