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
			tabledata:[]
		}
		this.loaddata = this.loaddata.bind(this);
		this.updateState = this.updateState.bind(this);
	}

	generateTh(){
		return this.props.headers.map((item,index) =>{
				return <th key={index}>{item}</th>
			});
	}

	loaddata(){
		let self = this;
		axios.get(this.props.getDataUrl,{ params:{pageIndex : self.state.currentIndex, pageSize:10, queryText: self.state.searchTxt}})
			.then(response => {
				var json = eval(response);
				self.setState({tabledata: json.data.data, pageCount: json.data.totalCount}, ()=>{
					this.props.afterDataChange();
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
					<tbody id="tableBody">
						{this.state.tabledata}
					</tbody>
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