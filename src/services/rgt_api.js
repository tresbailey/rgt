import axios from "axios";

export default class RgtApi {
  constructor() {
  this.base_url = 'http://localhost:8000';
  }
    preload_users() {
      const res = axios(
        `${this.base_url}/golf/golfers`,
      );
      return res;
    }

  list_courses(year) {
    const res = axios.get(
      `${this.base_url}/golf/${year}/courses`
    );
    return res;
  }

  load_course(currentVisit, course) {
    const res = axios.get(
      `${this.base_url}/golf/${currentVisit.year}/courses/${course}`
    );
    return res;
  }

  save_course_setup(currentVisit) {
    const res = axios.put(
      `${this.base_url}/golf/${currentVisit.year}/courses/${currentVisit.course}`,
      {'year': currentVisit.year, 'course': currentVisit.course,
        visit_date: currentVisit.visit_date,
        team_round: currentVisit.team_round
      }
    );
    return res;
  }

  save_golfer_round(year, golfer) {
    const res = axios.put(
      `${this.base_url}/golf/${year}/golfers/${golfer}`);
    return res;
  }
}

