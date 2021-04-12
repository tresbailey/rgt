import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import CourseList from './course_list.js';
import RgtApi from "../../services/rgt_api.js";

import './course_setup.scss';

const initialGolfers = {
  golfers: [
  { id: 'tres', name: 'Tres Bailey' },
  { id: 'john', name: 'John Register' },
  { id: 'mark', name: 'Mark Register' },
  { id: 'chip', name: 'Chip Register' },
  { id: 'joel',  name: 'Joel Register' }
]};

const teamDefinition = {
  available: initialGolfers,
  team_one: [],
  team_two: []
}

const initialCourses = [
  { id: 'tidewater', name: 'TideWater'},
  { id: 'meadowlands', name: 'Meadowlands Country Club'}
];

const initialVisit = {
  course: '',
  year: 2021,
  visit_date: '',
  team_round: {
    team_one: {
      total_dots: 0,
      golfers: []
    },
    team_two: {
      total_dots: 0,
      golfers: []
    }
  },
    golfer_rounds: []
};


function CourseSetup(props) {

  const [course_list, setCourseList] = useState([]);
  const [teamAssignment, updateTeamAssignment] = useState(teamDefinition);
  const [availableGolfers, setAvailableGolfers] = useState({golfers: []});
  const [course, setCourse] = useState(props.course || '');
  const [visit_date, setVisitDate] = useState('');
  const [currentVisit, setCurrentVisit] = useState(initialVisit);

  useEffect(() => {
    const rgt_api = new RgtApi();
    const userFunction = async () => {
      const res = await rgt_api.preload_users();
      setAvailableGolfers({golfers: res.data});
    }
    userFunction();
  }, []);

  useEffect(() => {
    const rgt_api = new RgtApi();
    const courseLoad = async () => {
      const res = await rgt_api.list_courses(currentVisit.year);
      const new_list = res.data.map((crs, index) => {
        return {name: crs}
      });
      console.log(new_list);
      setCourseList(new_list);
    }
    courseLoad();
  }, [teamAssignment]);

  const saveCourse = () => {
    const rgt_api = new RgtApi();
    const saveCall = async () => {
      const teams = {team_one: {total_dots: 0, golfers: teamAssignment.team_one}, team_two: {total_dots: 0, golfers: teamAssignment.team_two}};
      currentVisit.course = course;
      currentVisit.visit_date = visit_date;
      const res = await rgt_api.save_course_setup(currentVisit);
    };
    saveCall();
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const source_list = (currentVisit.team_round[result.source.droppableId] || availableGolfers).golfers;
    const dest_list = (currentVisit.team_round[result.destination.droppableId] || availableGolfers).golfers;
    const teamAss = Object.fromEntries(Object.entries(teamAssignment));

    const [reorderedItem] = source_list.splice(result.source.index, 1);
    dest_list.splice(result.destination.index, 0, reorderedItem);

  }

  const loadSavedCourse = event => {
    const course = event.target.value;
    const rgt_api = new RgtApi();
    const courseLoad = async () => {
      const res = await rgt_api.load_course(currentVisit, course);
      console.log(res.data);
      setCurrentVisit(res.data);
      setCourse(res.data.course);
      setVisitDate(res.data.visit_date);
    }
    courseLoad();
  };
  console.log(currentVisit.course);
    return (
        <div className="main-tagline">
          <h2>Course Setup</h2>
          <div className="flex-row">
            <div>
            <span>Course Name</span>
            <span><input type="text" value={course} onChange={event => {setCourse(event.target.value)}} /></span>
            </div>
            <div>
            <span>Date</span>
            <span><input type="date" value={visit_date} onChange={event => {setVisitDate(event.target.value)}}  /></span>
            </div>
          </div>
          <div className="flex-row">
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="golfer-source">
              <h3>Available Golfers</h3>
                <Droppable droppableId="available">
            {(provided) => (
              <ul className="golfers" {...provided.droppableProps} ref={provided.innerRef}>
                {availableGolfers.golfers.map(({name}, index) => {
                  return (
                    <Draggable key={name} draggableId={name} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <p>
                            { name }
                          </p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
              </Droppable>
            </div>
            <div className="flex-column teams-container">
              <div className="team-container">
                <h3>Team 1</h3>
                <Droppable droppableId="team_one">
                  {(provided) => (
                  <ul className="golfers" {...provided.droppableProps} ref={provided.innerRef}>
                    {currentVisit.team_round.team_one.golfers.map(({id, name}, index) => {
                      return (
                        <Draggable key={id} draggableId={id} index={index}>
                          {(provided) => (
                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <p>
                                { name }
                              </p>
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                  {provided.placeholder}
                  </ul>
                  )}
                </Droppable>
              </div>
              <div className="team-container">  
                <h3>Team 2</h3>
                <Droppable droppableId="team_two">
                  {(provided) => (
                  <ul className="golfers" {...provided.droppableProps} ref={provided.innerRef}>
                    {currentVisit.team_round.team_two.golfers.map(({id, name}, index) => {
                      return (
                        <Draggable key={id} draggableId={id} index={index}>
                          {(provided) => (
                            <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <p>
                                { name }
                              </p>
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                  {provided.placeholder}
                  </ul>
                  )}
                </Droppable>
              </div>
            </div>
        </DragDropContext>
          </div>
          <div className="flex-row course-list min-courses">
          {course_list.map(course => {
            return (
            <div className="course-container min-course-button">
              <input type="button" value={course.name} onClick={loadSavedCourse} />
            </div>
            );
          })}
          </div>
          <div className="flex-row course-saver">
            <a className="course-save-btn" onClick={saveCourse}>
            Save Teams
            </a>
          </div>
        </div>
    )
}

export default CourseSetup;
