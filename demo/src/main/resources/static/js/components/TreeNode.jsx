import React from 'react'

export default class TreeNode extends React.Component{
    constructor(props){
        super(props);
        this.state={
            readonly: this.props.readonly,
            name: this.props.name,
            renameLabel: this.props.readonly ? 'rename' : 'cancel',
            id: this.props.id,
            pid: this.props.pid,
            showChildBtn: this.props.showChildBtn == undefined ? true : this.props.showChildBtn
        }
        this.onClickRename = this.onClickRename.bind(this);
        this.onClickAppendChild = this.onClickAppendChild.bind(this);
        this.AddOrUpdate = this.AddOrUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onClickRename(){
        this.setState({readonly: !this.state.readonly, renameLabel: !this.state.readonly ? 'rename' : 'cancel'});
        this.props.notifyEditing();
    }
    onClickAppendChild(){
        this.props.addNode(this.state.id);
    }

    AddOrUpdate(){
        this.props.AddOrUpdate(this.state.id, this.state.pid, this.state.name);
    }

    onDelete(){
        if (confirm('Really to delete')){
			this.props.deleteFromDB(this.state.id);
		}
    }

    render(){
        return (
            <div className="node alert alert-primary" role="alert">
                <span>{">"}</span>
                <input type="text" value={this.state.name} onChange={(e)=>this.setState({name: e.target.value})} readOnly={this.state.readonly} />
                {!this.state.readonly ? <button className="btn btn-info" onClick={this.AddOrUpdate}>Update</button> : '' }
                {this.state.showChildBtn && this.state.readonly ? <button className="btn btn-primary" onClick={this.onClickAppendChild}>add child</button> : ''}
                <button className="btn btn-success" onClick={this.onClickRename}>{this.state.renameLabel}</button>
                {this.state.readonly ?<button className="btn btn-danger" onClick={this.onDelete}>delete</button> : ''}
            </div>
        )
    }
}