import React from 'react'

export default class TreeNode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            readonly: this.props.readonly == undefined ? true : this.props.readonly,
            name: this.props.name,
            renameLabel: this.props.readonly == undefined ? 'rename' : 'cancel',
            showChildBtn: this.props.showChildBtn == undefined ? true : this.props.showChildBtn
        }
        this.onClickRename = this.onClickRename.bind(this);
        this.onClickAppendChild = this.onClickAppendChild.bind(this);
        this.AddOrUpdate = this.AddOrUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    onClickRename() {
        this.setState({ readonly: !this.state.readonly, renameLabel: !this.state.readonly ? 'rename' : 'cancel' });
        this.props.notifyEditing(this.props.id == 0);
    }
    onClickAppendChild() {
        this.props.addNode(this.props.id);
    }

    AddOrUpdate() {
        this.props.AddOrUpdate(this.props.id, this.props.pid, this.state.name);
        this.setState({ readonly: true, renameLabel: 'rename' })
    }

    onDelete() {
        if (confirm('Really to delete')) {
            this.props.deleteFromDB(this.props.id);
        }
    }

    render() {
        return (
            <div className="node alert alert-primary" role="alert">
                <span>{">"}</span>
                <input type="text" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} readOnly={this.state.readonly} />
                {!this.state.readonly ? <button className="btn btn-info" onClick={this.AddOrUpdate}>{this.props.id != 0 ? 'Update' : 'Create'}</button> : ''}
                {this.state.showChildBtn && this.state.readonly ? <button className="btn btn-primary" onClick={this.onClickAppendChild}>add child</button> : ''}
                <button className="btn btn-success" onClick={this.onClickRename}>{this.state.renameLabel}</button>
                {this.state.readonly ? <button className="btn btn-danger" onClick={this.onDelete}>delete</button> : ''}
            </div>
        )
    }
}