import React from 'react'

export default class MaintainTextbox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text: props.text,
            readonly : true
        }
    }

    render() {
        return (
            <React.Fragment>
                <span><input type="text" value={this.state.text} readOnly={this.state.readonly} /></span>
                <button className="btn btn-success">edit</button>
                <button className="btn btn-danger">delete</button>
            </React.Fragment>
        );
    }
}