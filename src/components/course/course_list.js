import React, { useState, useEffect } from 'react';

import CourseContainer from './course_container.js';

import './course_list.scss';

function CourseList(props) {

  const [course_list, setCourseList]  = useState(props.courses);
console.log(course_list);

  return (
            <div className="course-list">
    {course_list.map(course => {
      return (
        <CourseContainer course={course} />
      );
    })}
    </div>
  );
}

export default CourseList;
