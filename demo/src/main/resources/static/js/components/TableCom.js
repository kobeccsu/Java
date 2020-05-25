import React from 'react'
import Pager from '../components/Pager'
import axios from 'axios';
import  '../../css/sysadmin/policy.css'
import SearchBar from '../components/SearchBar'

class TableCom extends React.Component{
    constructor(props){
		super(props);
		this.state = {
			currentIndex:1,
			pageCount:0,
			searchTxt:'',
			//tabledata:[],
			//dom:null,
			//selected:[]
		}
		this.loaddata = this.loaddata.bind(this);
		this.updateState = this.updateState.bind(this);
		this.updateSearch = this.updateSearch.bind(this);
		this.onSearch = this.onSearch.bind(this);
		// this.toggleRowSelect = this.toggleRowSelect.bind(this);
	}

	generateTh(){
		return this.props.headers.map((item,index) =>{
			return <th key={index}>{item}</th>
		});
	}

	updateTable(table){
		this.props.updateTable(table);
	}

	// toggleRowSelect(id, name){
	// 	if(this.state.selected.filter((item)=>item.id == id).length > 0){
	// 		this.setState(state=>{
	// 			const list = state.selected.filter((item, i) => item.id != id);
				
	// 			return {selected:list};
	// 		}, ()=>{
	// 			const dom = this.props.afterDataChange(this.state.tabledata, this);
	// 			this.setState({ dom: dom}) ;
	// 		});
	// 	}else{
	// 		this.setState(state=>{
	// 			const list = [...state.selected, {id:id, name:name}];
				
	// 			return {selected: list};
	// 		},()=>{
	// 			const dom = this.props.afterDataChange(this.state.tabledata, this);
	// 			this.setState({ dom: dom}) ;
	// 		});
	// 	}
	//  }

	loaddata(){
		let self = this;
		axios.get(this.props.getDataUrl,{ params:{pageIndex : self.state.currentIndex, pageSize:10, queryText: this.state.searchTxt}})
			.then(response => {
				var json = eval(response);
				const list = json.data.data != null ? json.data.data : json.data;
				self.setState({ pageCount: json.data.totalCount});		
				this.props.updateTable(list);

				if(json.data.data.length == 0 && this.state.currentIndex != 1){
					self.setState({currentIndex : this.state.currentIndex - 1});
					self.loaddata();
				}
				
			});
	}
	updateState(obj, cb){
		this.setState(obj, cb);
	}
	componentDidMount(){
		this.loaddata();
	}

	updateSearch(searchTxt){
		this.setState({searchTxt: searchTxt});
	}

	onSearch(){
		this.setState({ pageIndex: 1}, ()=>{
			this.loaddata();
		});
		
	}
    render(){
        return (
			<React.Fragment>
				{ this.props.showSearch ? <SearchBar updateSearch={this.updateSearch} searchTxt={this.state.searchTxt} handleSearch={this.onSearch} 
					showAddView={this.props.showAddView} showEdit={this.state.showEdit}/> : ''}
				<div className="table">
					<table>
						<thead className="thead-light">
							<tr>
								{this.generateTh()}
							</tr>
						</thead>
						{this.props.tbody}
					</table>
					<hr/>
					<Pager currentIndex={this.state.currentIndex} reload={this.loaddata} 
						updateParentState={this.updateState} 
						totalPageSize={this.state.pageCount} />
				</div>
			</React.Fragment>
        );
    }
}

export default TableCom;