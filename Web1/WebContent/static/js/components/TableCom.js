import React from 'react'
import Pager from '../components/Pager'
import axios from 'axios';
import  '../../css/sysadmin/policy.css'
import SelectedCard from './SelectedCard';

class TableCom extends React.Component{
    constructor(props){
		super(props);
		this.state = {
			currentIndex:1,
			pageCount:0,
			searchTxt:'',
			tabledata:[],
			dom:null,
			selected:[]
		}
		this.loaddata = this.loaddata.bind(this);
		this.updateState = this.updateState.bind(this);
		this.toggleRowSelect = this.toggleRowSelect.bind(this);
	}

	generateTh(){
		return this.props.headers.map((item,index) =>{
				return <th key={index}>{item}</th>
			});
	}

	toggleRowSelect(id, name){
		if(this.state.selected.filter((item)=>item.id == id).length > 0){
			this.setState(state=>{
				const list = state.selected.filter((item, i) => item.id != id);
				
				return {selected:list};
			}, ()=>{
				const dom = this.props.afterDataChange(this.state.tabledata, this);
				this.setState({ dom: dom}) ;
			});
		}else{
			this.setState(state=>{
				const list = [...state.selected, {id:id, name:name}];
				
				return {selected: list};
			},()=>{
				const dom = this.props.afterDataChange(this.state.tabledata, this);
				this.setState({ dom: dom}) ;
			});
		}
	 }

	loaddata(){
		let self = this;
		axios.get(this.props.getDataUrl,{ params:{pageIndex : self.state.currentIndex, pageSize:10, queryText: self.state.searchTxt}})
			.then(response => {
				var json = eval(response);
				self.setState(state=>{
					const list=json.data.data;
					return {tabledata: list, pageCount: json.data.totalCount}
						}, ()=>{
							this.setState({dom: this.props.afterDataChange(this.state.tabledata, this)});
				});
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
    render(){
        return (
            <div className="table">
				<table>
					<thead className="thead-light">
						<tr>
							{this.generateTh()}
						</tr>
					</thead>
					{this.state.dom}
				</table>
				<hr/>
				<Pager currentIndex={this.state.currentIndex} reload={this.loaddata} 
					updateParentState={this.updateState} 
					totalPageSize={this.state.pageCount} />
				<hr/>
				<SelectedCard remove={this.toggleRowSelect} list={this.state.selected}/>
			</div>
        );
    }
}

export default TableCom;