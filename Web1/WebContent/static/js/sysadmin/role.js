import React from 'react'
import ReactDOM from 'react-dom'
import SearchBar from '../components/SearchBar'
import TableCom from '../components/TableCom'
import Pager from '../components/Pager'
import AddEdit from '../sysadmin/roleEdit'
import axios from 'axios';
import  '../../css/sysadmin/policy.css'
import {createStore} from 'redux'
import reducer from '../reducers/selectedItem'

const store = createStore(reducer);

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
	// renderTableData() {
		// return this.state.tbody.map((item, index) => {
		//    const { id, uid, rolename } = item //destructuring
		//    return (
		// 	  <tr key={id}>
		// 		 <td>{rolename}</td>
		// 		 <td><span className='edit' 
		// 			 onClick={()=>{this.setState({showEdit : true, isAdd: false, editname: rolename, id: id});}} 
		// 			 data-id={id}>Edit</span>|<span className='del' data-id={id} onClick={()=>this.deleteRow(id)}>Delete</span></td>
		// 	  </tr>
		//    )
		// })
	//  }
	//  toggleRowSelect(id){
	// 	if(this.state.selected.includes(id)){
	// 		this.setState(state=>{
	// 			const list = state.selected.filter((item, i) => item!=id);
	// 			return {selected:list};
	// 		});
	// 	}else{
	// 		this.setState(state=>{
	// 			const list = [...state.selected, id];
	// 			return {selected: list};
	// 		});
	// 	}
	//  }
	 renderPolicyTableData() {
		const _self=this;
		if(_self.TableRef.current){
			
			const trs =	this.TableRef.current.state.tabledata.map((item, index) => {
				const { policyname, uuid, id,  } = item; //destructuring
				return (
					<tr key={id} onClick={() => store.dispatch({type:'TOGGLE_SELECTED', id:id})}>
						<td>{policyname}</td>
						<td><input type="checkbox" checked={store.getState().selected.includes(item.id)} 
						onChange={()=>store.dispatch({type:'TOGGLE_SELECTED', id:id})} 
						className="form-check-input" value={id}/></td>
					</tr>
				);
			})
			return (
			<tbody>
			{trs}
			</tbody>) ;
		}
	 }
	 updateState(obj, func){
		 this.setState(obj, func);
	 }
	render(){
		return(
			<React.Fragment>
				<SearchBar searchTxt={this.props.searchTxt} handleSearch={this.loadData} updateState={this.updateState} showEdit={this.state.showEdit}/>
				{!this.state.showEdit ? <TableCom headers={['RoleName','Operation', 'Policies']} tbody={this.renderTableData}/> : ''}
				<Pager currentIndex={this.state.currentIndex} reload={this.loadData} updateParentState={this.updateState} 
					totalPageSize={this.state.pageCount} />
				{this.state.showEdit ? <AddEdit reloader={this.loadPolicyData} 
					updateState={this.updateState} isAdd={this.state.isAdd} 
					id={this.state.id} editname={this.state.editname} /> : ''}
				{this.state.showAttachPolicy ? 
					<TableCom headers={['PolicyName','Select']} ref={this.TableRef}  
					updateState={this.updateState} getDataUrl="../Policy" 
						afterDataChange={this.renderPolicyTableData} />
					: ''}
			</React.Fragment>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('topbar'));