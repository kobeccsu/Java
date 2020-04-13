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
			policyData:[]
		}
		this.updateState = this.updateState.bind(this);
		this.loadData = this.loadData.bind(this);
		this.loadPolicyData = this.loadPolicyData.bind(this);
		// this.toggleRowSelect = this.toggleRowSelect.bind(this);
		this.renderPolicyTableData = this.renderPolicyTableData.bind(this);
		this.TableRef = React.createRef();
		this.showPolicies = this.showPolicies.bind(this);
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
		axios.get('../Policy', {params:{roleId:id}})
			.then(response=>{
				let list = [];
				response.data.data.map((item)=>{
					const {policyname, id} = item;
					list = [...list, {name: policyname, id: id}];
				});
				store.dispatch(setSelect(list));
			})
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

	renderRoleTableData(tabledata, $$child) {
		var self = this;
		if (tabledata == null) return;
		const trs =	tabledata.map((item, index) => {
			const { rolename,  id, ownPoliciesCount } = item; //destructuring
			return (
				<tr key={id} >
					<td>{rolename}</td>
					<td>{ownPoliciesCount > 0?<span className='edit' onClick={()=>self.showPolicies(id)}>View Policies|</span> : ''}<span className='edit' 
					 onClick={() => { this.setState({showEdit : true, isAdd: false, policyname: policyname, id:id});}} 
					 data-id={id}>Edit</span>|<span className='del' data-id={id} onClick={()=>this.deleteRow(id)}>Delete</span></td>
				</tr>
			);
		})

		return (
		<tbody>
		{trs}
		</tbody>);
	}

	renderPolicyTableData(tabledata, $$child) {
		if (tabledata == null) return;
		const trs =	tabledata.map((item, index) => {
			const { policyname, uuid, id,  } = item; //destructuring
			return (
				<tr key={id} onClick={() => {store.dispatch(toggleSelect(id, policyname));$$child.setState({dom: $$child.props.afterDataChange($$child.state.tabledata, $$child)})} }>
					<td>{policyname}</td>
					<td><input type="checkbox" checked={store.getState().selected.filter(m=> m.id == item.id).length > 0} 
					onChange={() =>{ store.dispatch(toggleSelect(id, policyname));$$child.setState({dom: $$child.props.afterDataChange($$child.state.tabledata, $$child)})} }
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
	render(){
		return(
			<React.Fragment>
				<SearchBar searchTxt={this.props.searchTxt} handleSearch={this.loadData} updateState={this.updateState} showEdit={this.state.showEdit}/>
				{!this.state.showEdit ? <TableCom headers={['RoleName','Operation']} hideButton={true}
				updateState={this.updateState} getDataUrl="../RoleService" showPolicies={this.showPolicies}
				afterDataChange={this.renderRoleTableData} /> : ''}
				{this.state.showEdit ? <AddEdit reloader={this.loadPolicyData} 
					updateState={this.updateState} isAdd={this.state.isAdd} 
					id={this.state.id} editname={this.state.editname} policies={store.getState().selected} /> : ''}
				{this.state.showAttachPolicy ? 
					<TableCom headers={['PolicyName','Select']} 
					updateState={this.updateState} getDataUrl="../Policy" 
						afterDataChange={this.renderPolicyTableData} />
					: ''}
				
			</React.Fragment>
		);
	}
}

ReactDOM.render(<Provider store={store}>
		<App />
	</Provider>, document.getElementById('topbar'));

	
  
  
  
