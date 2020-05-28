
import React from 'react'
import axios from 'axios';
import  '../../../css/sysadmin/policy.css'

export default class AddEdit extends React.Component{
	constructor(props){
		super(props);
        this.addUpdateData = this.addUpdateData.bind(this);
	}

	addUpdateData(){
		axios.post('/shop/' + (this.props.isAdd ? 'add' : 'update'),
			{id: this.props.id, name: this.props.shopname, theme: this.props.theme, is_closed: this.props.is_closed})
		.then((response)=>{
			this.props.reloader();
		});
	}

	render(){
		let name = this.props.shopname;
		let theme = this.props.theme;
		let is_closed = this.props.is_closed
		return (
			<div className="addPolicy">
				<hr/>
                <button value="back to list" onClick={()=>{this.props.updateP({showEdit: false, isAdd: true});}} >back to list</button>
				<div>
					<span>Shop name</span>
                    <span><input type="text" name="shopname" value={name} 
                        onChange={(e)=>{ this.props.updateP({shopname: e.target.value}) }} /></span>
				</div>
				<div>
					<span>Theme</span>
                    <span><input type="text" name="theme" value={theme} 
                        onChange={(e)=>{ this.props.updateP({theme: e.target.value}) }} /></span>
				</div>
				<div>
					<span>Is Closed</span>
                    <span><input type="checkbox" name="is_closed" checked={is_closed} 
                        onChange={(e)=>{ this.props.updateP({is_closed: e.target.checked}) }} /></span>
				</div>
				<div>
					<input type="button" value={this.props.isAdd ? 'Create' : 'Update'} onClick={this.addUpdateData} />
				</div>
			</div>
		);
	}
}