import React from 'react'
import Pager from '../components/Pager'
import axios from 'axios';
import  '../../css/sysadmin/policy.css'

class TableCom extends React.Component{
    constructor(props){
		super(props);
		this.state = {
			currentIndex:1,
			pageCount:0,
			searchTxt:'',
			tabledata:[],
			dom:null,
			//selected:[]
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

	toggleRowSelect(id){
		if(this.state.selected.includes(id)){
			this.setState(state=>{
				const list = state.selected.filter((item, i) => item!=id);
				
				return {selected:list};
			}, ()=>{
				const dom = this.props.afterDataChange();
				this.setState({ dom: dom}) ;
			});
		}else{
			this.setState(state=>{
				const list = [...state.selected, id];
				
				return {selected: list};
			},()=>{
				const dom = this.props.afterDataChange();
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
							this.setState({dom: this.props.afterDataChange()});
					// this.props.updateState(
					// 	state=>{
					// 		const list = json.data.data;
					// 		return {policyData: list};
					// 	})
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
			</div>
        );
    }
}

export default TableCom;