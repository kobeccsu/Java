import React from 'react'

export default class MaintainTextbox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text: props.text,
            readonly : true,
            id: 0
        }
    }

    delete(){
        this.props.delete(this.state.id);
    }
    render() {
        return (
            <React.Fragment>
                <span><input type="text" value={this.state.text} readOnly={this.state.readonly} /></span>
                <button className="btn btn-warning">update</button>
                <button className="btn btn-success">edit</button>
                <button className="btn btn-danger" onClick={this.delete}>delete</button>
            </React.Fragment>
        );
    }
}