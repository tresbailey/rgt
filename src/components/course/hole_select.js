import React from 'react';
import "./hole_select.scss";

export default class HoleSelect extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    range(n) {
        return Array.from(Array(n).keys());
    }

    handleSelect(value) {
        this.props.onSelect(value);
    }

    handleSave() {
        this.props.onSave();
    }

    goBack() {
        this.props.onBack();
    }

    selectable_hole(number) {
        return (<div className="hole-select"><span value={number+1} onClick={() => this.handleSelect(number+1)}>{number+1}</span></div>);
    }

    render() {
        var hole_select = [];
        var that = this;
        for (var i=0; i < 18; i++) {
            hole_select.push(this.selectable_hole(i));
        }
        return (
            <div className="flex-row holes-container">
                {hole_select}
                    <div className="hole-select" onClick={this.goBack}>
                        <div className="fa fa-angle-left"></div>
                        <div>Back</div>
                    </div>
                    <div className="hole-select" onClick={this.handleSave}>
                        <div className="fa fa-angle-double-right"></div>
                        <div>Save</div>
                    </div>
            </div>
        );
    }
}
