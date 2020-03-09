import React from 'react'
import ReactDOM from 'react-dom'
import SearchBar from '../components/SearchBar'
import TableCom from '../components/TableCom'
import Pager from '../components/Pager'
import AddEdit from '../sysadmin/policyEdit'
import axios from 'axios';
import  '../../css/sysadmin/policy.css'


class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			tbody:[],
			pageCount : 0,
			showEdit: false,
			isAdd: true,
			id: '',
			policyname:'',
			currentIndex: 1,
			searchTxt:''
		}
		this.updateState = this.updateState.bind(this);
		this.loadData = this.loadData.bind(this);
	}

	loadData(){
		let self = this;
		axios.get('../Policy',{ params:{pageIndex : self.state.currentIndex, pageSize:10, queryText: self.state.searchTxt}})
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
			axios.post('../Policy/delete',
				{id: id})
			.then((response)=>{
				this.loadData();
			});
		}
	}
	componentDidMount(){
		this.loadData();
	}
	renderTableData() {
		return this.state.tbody.map((item, index) => {
		   const { id, policyname } = item //destructuring
		   return (
			  <tr key={id}>
				 <td>{policyname}</td>
				 <td><span className='edit' 
					 onClick={()=>{this.setState({showEdit : true, isAdd: false, policyname: policyname, id:id});}} 
					 data-id={id}>Edit</span>|<span className='del' data-id={id} onClick={()=>this.deleteRow(id)}>Delete</span></td>
			  </tr>
		   )
		})
	 }
	 updateState(obj, func){
		 this.setState(obj, func);
	 }
	render(){
		return(
			<React.Fragment>
				<SearchBar searchTxt={this.props.searchTxt} handleSearch={this.loadData} updateState={this.updateState} showEdit={this.state.showEdit}/>
				{!this.state.showEdit ? <TableCom headers={['PolicyName','Operation']} tbody={this.renderTableData()}/> : ''}
				<Pager currentIndex={this.state.currentIndex} reload={this.loadData} updateParentState={this.updateState} 
					totalPageSize={this.state.pageCount} />
				{this.state.showEdit ? <AddEdit reloader={this.loadData} 
					updateP={this.updateState} isAdd={this.state.isAdd} 
					id={this.state.id} policyname={this.state.policyname} /> : ''}
			</React.Fragment>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('topbar'));