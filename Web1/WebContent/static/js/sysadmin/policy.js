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
			policyname:''
		}
		this.showHideedit = this.showHideedit.bind(this);
		this.loadData = this.loadData.bind(this);
	}

	loadData(pageIndex, queryText){
		const self = this;
		axios.get('../Policy',{ params:{pageIndex : pageIndex, pageSize:10, queryText: queryText}})
			.then(response => {
			// console.log(response);
			var json = eval(response);
			self.setState({tbody:json.data.data, pageCount: json.data.totalCount, showEdit:false, isAdd: true}) 
			});
	}
	componentDidMount(){
		this.loadData(1,'');
	}
	renderTableData() {
		return this.state.tbody.map((item, index) => {
		   const { id, policyname } = item //destructuring
		   return (
			  <tr key={id}>
				 <td>{policyname}</td>
				 <td><span className='edit' 
					 onClick={()=>{this.setState({showEdit : true, isAdd: false, policyname: policyname, id:id});}} 
					 data-id={id}>Edit</span>|<span className='del' data-id={id}>Delete</span></td>
			  </tr>
		   )
		})
	 }
	 showHideedit(obj){
		 this.setState(obj);
	 }
	render(){
		return(
			<React.Fragment>
				<SearchBar handleSearch={this.loadData} handleParent={this.showHideedit} showEdit={this.state.showEdit}/>
				{!this.state.showEdit ? <TableCom headers={['PolicyName','Operation']} tbody={this.renderTableData()}/> : ''}
				<Pager currentIndex='1' totalPageSize={this.state.pageCount} />
				{this.state.showEdit ? <AddEdit reloader={this.loadData} 
					updateP={this.showHideedit} isAdd={this.state.isAdd} 
					id={this.state.id} policyname={this.state.policyname} /> : ''}
			</React.Fragment>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('topbar'));