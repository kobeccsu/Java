
import React from 'react'
import axios from 'axios';
import  '../../css/sysadmin/policy.css'

export default class AddEdit extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			policyname : ''
        }
        this.addUpdateData = this.addUpdateData.bind(this);
	}

	addUpdateData(){
		axios.post('../Policy/' + (this.props.isAdd ? 'add' : 'update'),
			{id: this.props.id, 'policyname': this.props.policyname})
		.then((response)=>{
			this.props.reloader();
		});
	}

	render(){
        let name = this.props.policyname;
		return (
			<div className="addPolicy">
				<hr/>
                <button value="back to list" onClick={()=>{this.props.updateP({showEdit: false, isAdd: true});}} >back to list</button>
				<div>
					<span>policy</span>
                    <span><input type="text" name="policy" value={name} 
                        onChange={(e)=>{ this.props.updateP({policyname: e.target.value}) }} /></span>
				</div>
				<div>
					<input type="button" value={this.props.isAdd ? 'Create' : 'Update'} onClick={this.addUpdateData} />
				</div>
			</div>
		);
	}
}