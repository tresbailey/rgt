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
          new Course('thistle', "Thistle Golf Club"),
          new Course('pearl west', 'Pearl West'),
          new Course('pearl east', 'Pearl East'),
          new Course('glen dornoch', 'Glen Dornoch Golf Course'),
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
      <div>
      <article>
      <div className="container-fluid primary-content tagline-box">
        <div className="row">
          <div className="col-md-12">
            <div className="main-marquee">
              <div className="jumbotron jumbotron-fluid">
                <div className="tagline-wrapper">
                  <div className="main-tagline">
                    Which Course Are You Playing?
                    <div className="flex-column course-container" >
                        {courseList}
                    <div className="golfer-choice" onClick={this.goBack}>
                        <span className="fa fa-angle-left"></span>
                        <span>Back</span>
                    </div>
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


