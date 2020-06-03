import React from 'react'

export default class TreeNode extends React.Component{
    constructor(props){
        super(props);
        this.state={
            readonly: true,
            name: this.props.name,
            renameLabel: 'rename'
        }
        this.onClickRename = this.onClickRename.bind(this);
    }

    onClickRename(){
        this.setState({readonly: !this.state.readonly, renameLabel: !this.state.readonly ? 'rename' : 'cancel'});
    }

    render(){
        return (
            <div className="node alert alert-primary" role="alert">
                <span>></span>
                <input type="text" value={this.state.name} onChange={(e)=>this.setState({name: e.target.value})} readOnly={this.state.readonly} />
                {!this.state.readonly ? <button className="btn btn-info">Update</button> : '' }
                {this.state.readonly ? <button className="btn btn-primary">add child</button> : ''}
                <button className="btn btn-success" onClick={this.onClickRename}>{this.state.renameLabel}</button>
                {this.state.readonly ?<button className="btn btn-danger">delete</button> : ''}
            </div>
        )
    }
}