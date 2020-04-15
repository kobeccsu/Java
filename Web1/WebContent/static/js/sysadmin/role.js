import React from 'react'
import ReactDOM from 'react-dom'
import SearchBar from '../components/SearchBar'
import TableCom from '../components/TableCom'
import Pager from '../components/Pager'
import AddEdit from '../sysadmin/roleEdit'
import axios from 'axios';
import  '../../css/sysadmin/policy.css'
import '../../css/bootstrap.min.css'
import {createStore,applyMiddleware } from 'redux'
import reducer from '../reducers/selectedItem'
import { Provider} from 'react-redux'
import {toggleSelect} from '../actions/toggleSelect'
import {setSelect} from '../actions/setSelect'
import thunk from 'redux-thunk'

const store = createStore(reducer,applyMiddleware(
    thunk
  ));

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
			policiesTableData: []
		}
		this.updateState = this.updateState.bind(this);
		this.loadData = this.loadData.bind(this);
		this.loadPolicyData = this.loadPolicyData.bind(this);
		this.toggleRowSelect = this.toggleRowSelect.bind(this);
		this.renderPolicyTableData = this.renderPolicyTableData.bind(this);
		this.TableRef = React.createRef();
		this.showPolicies = this.showPolicies.bind(this);
		this.updateRoleTable = this.updateRoleTable.bind(this);
		this.updatePolicyTable = this.updatePolicyTable.bind(this);
	}

	loadData(){
		let self = this;
		axios.get('../RoleService',{ params:{pageIndex : self.state.currentIndex, pageSize:10, queryText: self.state.searchTxt}})
			.then(response => {
				var json = eval(response);
				self.setState({tbody:json.data.data, pageCount: json.data.totalCount, showEdit:false, isAdd: true}) 
				if(json.data.data.length == 0 && this.state.currentIndex != 1){
					self.setState({currentIndex : this.state.currentIndex - 1});
					this.loadData();
				}
			});
	}
	showPolicies(id){
		axios.get('../Policy', { params : { roleId : id} })
			.then(response=>{
				let list = [];
				response.data.data.map((item)=>{
					const { policyname, id } = item;
					list = [...list, {name: policyname, id: id}];
				});
				store.dispatch(setSelect(list));
			})
	}

	toggleRowSelect(id){
		const originalChecked = this.state.policiesTableData.filter((item)=>item.id == id)[0].selected;
		let list = this.state.policiesTableData;
		list.map(m=>{
			if(m.id==id){
				m.selected = !originalChecked;
			}
		})
		this.setState({policiesTableData:list});
	 }

	loadPolicyData(){
		let self = this;
		axios.get('../Policy',{ params:{pageIndex : self.state.currentIndex, pageSize:10, queryText: self.state.searchTxt}})
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
		this.loadData();
	}

	renderRoleTableData() {
		var self = this;
		const trs =	this.state.roleTableData.map((item, index) => {
			const { rolename,  id, ownPoliciesCount } = item; //destructuring
			return (
				<tr key={id} >
					<td>{rolename}</td>
					<td>{ownPoliciesCount > 0 ? <span><span className='edit' onClick={()=>self.showPolicies(id)}>View Policies</span><span>|</span></span> : ''}<span className='edit' 
					 onClick={() => { self.showPolicies(id) ; this.updateState({showEdit : true, isAdd: false, editname: rolename, id:id, showAttachPolicy: true});}} 
					 data-id={id}>Edit</span>|<span className='del' data-id={id} onClick={()=>this.deleteRow(id)}>Delete</span></td>
				</tr>
			);
		})

		return (
		<tbody>
		{trs}
		</tbody>);
	}

	renderPolicyTableData() {
		const trs =	this.state.policiesTableData.map((item, index) => {
			const { policyname, uuid, id, selected  } = item; //destructuring
			return (
				<tr key={id} onClick={() => {this.toggleRowSelect(id)} }>
					<td>{policyname}</td>
					<td><input type="checkbox" checked={selected} 
					onChange={() =>{ this.toggleRowSelect(id )} }
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

	updateRoleTable(data){
		this.setState({roleTableData: data})
	}

	updatePolicyTable(data){
		const listWithSelected = data.map(obj => {
			return { ...obj, selected: false }
		})
		this.setState({policiesTableData: listWithSelected});
	}

	render(){
		const roleTable = this.renderRoleTableData();
		const policiesTable = this.renderPolicyTableData();
		return(
			<React.Fragment>
				<SearchBar searchTxt={this.props.searchTxt} handleSearch={this.loadData} updateState={this.updateState} showEdit={this.state.showEdit}/>
				{!this.state.showEdit ? <TableCom headers={['RoleName','Operation']} hideButton={!this.state.showEdit}
				updateState={this.updateState} getDataUrl="../RoleService"
				 tbody={roleTable} updateTable={this.updateRoleTable} /> : ''}
				{this.state.showEdit ? <AddEdit reloader={this.loadPolicyData} 
					updateState={this.updateState} isAdd={this.state.isAdd} 
					id={this.state.id} editname={this.state.editname} policies={store.getState().selected} /> : ''}
				{this.state.showAttachPolicy ? 
					<TableCom headers={['PolicyName','Select']} 
					updateState={this.updateState} getDataUrl="../Policy" 
						tbody={policiesTable} updateTable={this.updatePolicyTable} />
					: ''}
			</React.Fragment>
		);
	}
}

ReactDOM.render(<Provider store={store}>
		<App />
	</Provider>, document.getElementById('topbar'));

	
  
  
  
