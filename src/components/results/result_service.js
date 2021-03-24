import axios from "axios";

export default class ResultService {
    getRounds() {
        return axios.get('https://kygk3i6585.execute-api.us-east-1.amazonaws.com/default/rgt-api/rounds')
            .then(res => {
                return res.data.Items;
            });
    }
}
