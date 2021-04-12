import React from 'react';
import { Link } from 'react-router-dom';
import "./course_select.scss";
import Course from "./course.js";


export default class CourseSelect extends React.Component {

  constructor(props) {
      super(props);
      const { golfer, course } = this.props.match.params;
      this.state = {golfer: golfer};
      this.goBack = this.goBack.bind(this);
      this.courses = [
          new Course('thistle', "Thistle"),
          new Course('pearl west', 'Pearl West'),
          new Course('pearl east', 'Pearl East'),
          new Course('glen dornoch', 'Glen Dornoch'),
          new Course('crow creek', 'Crow Creek')
      ];
  }

  componentDidMount () {
    const { golfer, course } = this.props.match.params;

    this.setState(() => ({golfer, course}));
  }

  goBack(){
    this.props.history.goBack();
  }

  courseList() {
    var course_list = [];
    const golfer = this.state.golfer;
    this.courses.forEach((course) => {
        course_list.push(<div className="golfer-choice">
        <span><Link to={"/golfers/" + golfer +"/"+ course.id}>{course.name}</Link></span>
    </div>);
    });
    return course_list;
  }

  render() {
    const { golfer } = this.state;
    const courseList = this.courseList();
    return (
                  <div className="main-tagline">
                    <h2>Which Course Are You Playing?</h2>
                    <div className="flex-row course-container" >
                        {courseList}
                    <div className="course-choice" onClick={this.goBack}>
                        <span className="fa fa-angle-left"></span>
                        <span>Back</span>
                    </div>
                    </div>
                  </div>
    );
  }
}


