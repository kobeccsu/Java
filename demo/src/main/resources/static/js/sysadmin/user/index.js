import React from 'react'
import ReactDOM from 'react-dom'

import TableCom from '../../components/TableCom'
import AddEdit from './adminUserEdit'
import axios from 'axios';
import  '../../../css/sysadmin/policy.css'
import '../../../css/bootstrap.min.css'
import SelectedCard from '../../components/SelectedCard'
import BreadCrumb from '../../components/breadcrumb.jsx'

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			tbody:[],
			pageCount : 0,
			showEdit: false,
			isAdd: true,
			id: '',
			editname:'',
			currentIndex: 1,
			searchTxt:'',
			showAttachPolicy: false,
			policyData:[],
			roleTableData: [],
			policiesTableData: [],
			selected: [],
			showCard:false,
			levelPath: [
				{text:'Admin', url: '#'},
				{text:'User Management', url: '#'}
			]
		}
		this.updateState = this.updateState.bind(this);
		// this.loadData = this.loadData.bind(this);
		this.loadPolicyData = this.loadPolicyData.bind(this);
		this.toggleRowSelect = this.toggleRowSelect.bind(this);
		this.renderPolicyTableData = this.renderPolicyTableData.bind(this);
		this.TableRef = React.createRef();
		this.showPolicies = this.showPolicies.bind(this);
		this.updateRoleTable = this.updateRoleTable.bind(this);
		this.updatePolicyTable = this.updatePolicyTable.bind(this);
		this.updateEditState = this.updateEditState.bind(this);
		this.showAddView = this.showAddView.bind(this);
		this.updateEditname =this.updateEditname.bind(this)
	}

	showPolicies(id){
		axios.get('../RoleService/getall', { params : { userId : id} })
			.then(response=>{
				let list = [];
				response.data.data.map((item)=>{
					const { rolename, id } = item;
					list = [...list, { id: id, name: rolename}];
				});
				this.setState({selected: list});
			})
	}

	toggleRowSelect(id, name){
		if (this.state.selected.filter((item) => item.id == id).length > 0){
			this.setState(state=>{
				const list = state.selected.filter((item) => item.id != id);
				return {selected: list};
			});
		} else {
			this.setState(state=>{
				const list = [...state.selected, {id:id, name:name}];
				return {selected: list};
			});
		}
	 }

	loadPolicyData(){
		let self = this;
		axios.get('../RoleService',{ params:{pageIndex : self.state.currentIndex, pageSize:10, queryText: self.state.searchTxt}})
			.then(response => {
				var json = eval(response);
				self.setState({policyData: json.data.data, pageCount: json.data.totalCount});
				if(json.data.data.length == 0 && this.state.currentIndex != 1){
					self.setState({currentIndex : this.state.currentIndex - 1});
					this.loadPolicyData();
				}
			});
	}
	deleteRow(id){
		if (confirm('Really to delete')){
			axios.post('../RoleService/delete',
				{id: id})
			.then((response)=>{
				this.loadData();
			});
		}
	}
	componentDidMount(){
		// this.loadData();
	}

	renderRoleTableData() {
		var self = this;
		const trs =	this.state.roleTableData.map((item, index) => {
			const { username,  id, ownRolesCount } = item; //destructuring
			return (
				<tr key={id} >
					<td>{username}</td>
					<td>{ownRolesCount > 0 ? <span><span className='edit' onClick={()=>this.setState({showCard: !this.state.showCard, hideCardList:true}, () => {self.showPolicies(id)})}>{ (this.state.showCard ? 'Hide' : 'Show') + ' View Policies'}</span><span>|</span></span> : ''}<span className='edit' 
					 onClick={() => {  this.setState({showEdit : true, showCard: true, hideCardList:false, isAdd: false, editname: username, id:id, showAttachPolicy: true}, ()=>{self.showPolicies(id) })}} 
					 data-id={id}>Edit</span></td>
				</tr>
			);
		})

		return (
		<tbody>
		{trs}
		</tbody>);
	}

	renderPolicyTableData() {
		let conbineSelected = this.state.policiesTableData.map(item => {
			return {...item, selected : this.state.selected.filter(m => m.id == item.id).length > 0}
		})

		const trs =	conbineSelected.map((item, index) => {
			const { rolename, id, selected  } = item; //destructuring
			return (
				<tr key={id} onClick={() => {this.toggleRowSelect(id, rolename)} }>
					<td>{rolename}</td>
					<td><input type="checkbox" checked={selected} 
					onChange={() =>{ this.toggleRowSelect(id, rolename )} }
					className="form-check-input" value={id}/></td>
				</tr>
			);
		})

		return (
		<tbody>
		{trs}
		</tbody>);
	}

	updateState(obj, func){
		 this.setState(obj, func);
	}

	updateEditState(obj, func){
		this.setState({showEdit: false, showCard: false, isAdd: true});
	}

	updateRoleTable(data){
		this.setState({roleTableData: data})
	}

	updatePolicyTable(data){
		const listWithSelected = data.map(obj => {
			return { ...obj, selected: false }
		})
		this.setState({policiesTableData: listWithSelected});
	}

	updateEditname(name){
		this.setState({editname: name});
	}

	showAddView() {
		this.setState({showEdit: true, showCard: true, editname:'', selected:[], isAdd: true})
	}
	render(){
		const roleTable = this.renderRoleTableData();
		const policiesTable = this.renderPolicyTableData();
		
		return(
			<React.Fragment>
				<BreadCrumb level={this.state.levelPath} />
				{!this.state.showEdit ? <TableCom headers={['UserName','Operation']} showAddView={this.showAddView} hideButton={!this.state.showEdit}
				updateState={this.updateState} getDataUrl="../UserService" searchTxt={this.state.searchTxt}
				 tbody={roleTable} updateTable={this.updateRoleTable} showSearch={true} /> : ''}
				{this.state.showEdit ? <AddEdit reloader={this.loadPolicyData} 
					updateState={this.updateEditState} updateEditname={this.updateEditname} isAdd={this.state.isAdd} 
					id={this.state.id} editname={this.state.editname} policies={this.state.selected} /> : ''}
				{this.state.showEdit ? 
					<TableCom headers={['RoleName','Select']} 
					updateState={this.updateState} getDataUrl="../RoleService" 
						tbody={policiesTable} updateTable={this.updatePolicyTable} showSearch={false} />
					: ''}
				{ this.state.showCard ? <SelectedCard hideButton={this.state.hideCardList} list={this.state.selected} remove={this.toggleRowSelect} /> : ''}
			</React.Fragment>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));

	
  
  
  
