import React from 'react';
import ResultService from './result_service.js';
import axios from "axios";

export default class ResultsList extends React.Component {
    constructor(props) {
        super(props);
        this.service = new ResultService();
        this.state = {
            loaded: false
        };
    }
    componentDidMount () {

        axios.get('https://kygk3i6585.execute-api.us-east-1.amazonaws.com/default/rgt-api/rounds')
            .then(( res ) => {
                console.log(res);
                this.setState({
                    results: res.data.Items,
                    loaded: true
                });
            });
    }

    resultList() {
        var resultList = [];
        this.state.results && this.state.results.forEach((result) => {
            var holes = []
            result.holes.L.forEach((hole) => {
                console.log(hole);
                hole.M && holes.push(<div style={{marginLeft: '2rem'}}>
                    <div>{hole.M.strokes.M.name && hole.M.strokes.M.name.S}:${hole.M.strokes.M.value && hole.M.strokes.M.value.N}</div>
                </div>);
                hole.M && hole.M.achievements && hole.M.achievements.L.forEach((ach) => {
                    ach.M && holes.push(<div style={{marginLeft: '2rem'}}>
                        <div>{ach.M.name && ach.M.name.S}:${ach.M.value && ach.M.value.N}</div>
                    </div>);
                });
            });
            resultList.push(<div>
                <div><b>{result.golfer.S}</b></div>
                <div><i>{result.course.S}</i></div>
                <div style={{marginLeft: '2rem'}}>${result.money.N}</div>
                {holes}
                </div>
            );
        });
        return resultList;
    }

    render() {
        const resultList = this.resultList();
        const loaded = this.state.loaded;
        return (
            <div>
                {loaded && resultList}
            </div>
        );
    }
}
