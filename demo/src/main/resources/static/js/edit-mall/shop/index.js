import React from 'react'
import ReactDOM from 'react-dom'

import TableCom from '../../components/TableCom'
import AddEdit from './edit'
import axios from 'axios';
import  '../../../css/sysadmin/policy.css'
import '../../../css/bootstrap.min.css'

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			policiesTableData:[],
			pageCount : 0,
			showEdit: false,
			isAdd: true,
			id: '',
			shopname:'',
			theme: '',
			is_closed: false,
			currentIndex: 1,
			searchTxt:''
		}
		this.updateState = this.updateState.bind(this);
		this.loadData = this.loadData.bind(this);
		this.showAddView = this.showAddView.bind(this);
		this.updatePolicyTable = this.updatePolicyTable.bind(this);
	}

	loadData(){
		let self = this;
		axios.get('/shop/list',{ params:{pageIndex : self.state.currentIndex, pageSize:10, queryText: self.state.searchTxt}})
			.then(response => {
				var json = eval(response);
				self.setState({tbody:json.data.data, pageCount: json.data.totalCount, showEdit:false, isAdd: true}) 
				if(json.data.data.length == 0 && this.state.currentIndex != 1){
					self.setState({currentIndex : this.state.currentIndex - 1});
					this.loadData();
				}
			});
	}
	deleteRow(id){
		if (confirm('Really to delete')){
			axios.post('/shop/delete',
				{id: id})
			.then((response)=>{
				this.loadData();
			});
		}
	}
	componentDidMount(){
		//this.loadData();
	}
	renderTableData() {
		const trs = this.state.policiesTableData.map((item, index) => {
		   const { id, name, theme, isClosed } = item //destructuring
		   return (
			  <tr key={id}>
				 <td>{name}</td>
				 <td>{theme}</td>
				 <td>{isClosed}</td>
				 <td><span className='edit' 
					 onClick={()=>{this.setState({showEdit : true, isAdd: false, is_closed: isClosed, shopname: name, theme:theme, id: id});}} 
					 data-id={id}>Edit</span>|<span className='del' data-id={id} onClick={()=>this.deleteRow(id)}>Delete</span></td>
			  </tr>
		   )
		})

		return (
			<tbody>
			{trs}
			</tbody>);
	 }
	 updateState(obj, func){
		 this.setState(obj, func);
	 }
	 updatePolicyTable(data){
		this.setState({policiesTableData: data});
	 }
	 showAddView(){
		this.setState({showEdit: true, showCard: true, editname:'', isAdd: true})
	 }
	render(){
		const policiesTable = this.renderTableData();
		return(
			<React.Fragment>
				{!this.state.showEdit ? <TableCom headers={['ShopName', 'Theme', 'IsClosed', 'Operation']} getDataUrl="/shop/list" 
				tbody={policiesTable }  updateTable={this.updatePolicyTable}
				showSearch={true} showAddView={this.showAddView}/> : ''}
				{this.state.showEdit ? <AddEdit reloader={this.loadData} 
					updateP={this.updateState} isAdd={this.state.isAdd} 
					id={this.state.id} shopname={this.state.shopname}  theme={this.state.theme} is_closed={this.state.is_closed} /> : ''}
			</React.Fragment>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));