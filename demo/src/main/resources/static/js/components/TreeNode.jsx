import React from 'react'

export default class TreeNode extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
        <div className="node alert alert-primary" role="alert">
            <span>></span><span>{this.props.name}</span><button className="btn btn-primary">add child</button>
            <button className="btn btn-success">rename</button><button className="btn btn-danger">delete</button>
        </div>
        )
    }
}