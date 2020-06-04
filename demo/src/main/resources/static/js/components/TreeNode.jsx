import React from 'react'

export default class TreeNode extends React.Component{
    constructor(props){
        super(props);
        this.state={
            readonly: this.props.readonly,
            name: this.props.name,
            renameLabel: this.props.readonly ? 'rename' : 'cancel',
            id: this.props.id,
            pid: this.props.pid
        }
        this.onClickRename = this.onClickRename.bind(this);
        this.onClickAppendChild = this.onClickAppendChild.bind(this);
    }

    onClickRename(){
        this.setState({readonly: !this.state.readonly, renameLabel: !this.state.readonly ? 'rename' : 'cancel'});
    }
    onClickAppendChild(){
        this.props.addNode(this.state.id);
    }
    render(){
        return (
            <div className="node alert alert-primary" role="alert">
                <span>></span>
                <input type="text" value={this.state.name} onChange={(e)=>this.setState({name: e.target.value})} readOnly={this.state.readonly} />
                {!this.state.readonly ? <button className="btn btn-info">Update</button> : '' }
                {this.state.readonly ? <button className="btn btn-primary" onClick={this.onClickAppendChild}>add child</button> : ''}
                <button className="btn btn-success" onClick={this.onClickRename}>{this.state.renameLabel}</button>
                {this.state.readonly ?<button className="btn btn-danger">delete</button> : ''}
            </div>
        )
    }
}