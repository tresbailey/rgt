import axios from "axios";

//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
export default class CourseSaveService {

    saveRound(course, golfer, total) {
        axios.put('https://kygk3i6585.execute-api.us-east-1.amazonaws.com/default/rgt-api/rounds/'+ course +'/golfers/'+  golfer, total)
            .then(res => {
                true;
            });
    }

}
