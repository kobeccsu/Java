
import React from 'react'
import axios from 'axios';
import  '../../css/sysadmin/policy.css'

export default class AddEdit extends React.Component{
	constructor(props){
		super(props);
        this.addUpdateData = this.addUpdateData.bind(this);
	}

	addUpdateData(){
		if(this.props.editname.trim() == ''){
			alert('must input');
			return;
		}
		axios.post('../RoleService/' + (this.props.isAdd ? 'add' : 'update'),
			{id: this.props.id, 'rolename': this.props.editname, 'policies': this.props.policies})
		.then((response)=>{
			this.props.reloader();
		});
	}

	render(){
        let name = this.props.editname;
		return (
			<div className="addPolicy">
				<hr/>
                <button className="btn btn-link" value="back to list" onClick={this.props.updateState} >back to list</button>
				<div>
					<span>Role</span>
                    <span><input type="text" name="policy" value={name} 
                        onChange={(e)=>{ this.props.updateEditname( e.target.value ) }} /></span>
				</div>
				<div>
					<div><span className="btn btn-outline-primary"
					onClick={()=>{this.props.updateState({showAttachPolicy:true}, ()=>{this.props.reloader()} )}}>Attach policies</span></div>
					<div className="hasPolicy">

					</div>
				</div>
				<div>
					<input type="button" value={this.props.isAdd ? 'Create' : 'Update'} onClick={this.addUpdateData} />
				</div>
				
			</div>
		);
	}
}