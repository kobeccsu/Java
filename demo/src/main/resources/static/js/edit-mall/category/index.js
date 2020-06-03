import React from 'react'
import ReactDOM from 'react-dom'
import TableCom from '../../components/TableCom'
import AddEdit from './edit'
import axios from 'axios';
import  '../../../css/sysadmin/policy.css'
import '../../../css/bootstrap.min.css'
import TreeNode from '../../components/TreeNode'
import '../../../css/edit-mall/category/index.css'

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			
		}
		this.iterateChild = this.iterateChild.bind(this);
	}

	iterateChild(item){
		let _self = this;
		return item.map(function(item, index){
			return (
				<div className="node" key={item.name + index}>
				<TreeNode name={item.name} />
				{ item.children.length > 0 ? _self.iterateChild(item.children) : ''}
				</div>
			)
		});
		
	}

	render(){
		const test = [
					{name:'item1', 
						children:[{name:'child1', 
							children:[{name: 'grandchild1', children:[]}
						]},
						{name:'child2', children:[]}
						]
					},{
						name:'root2',children:[]
					}
		];
		const dom = this.iterateChild(test);

		return(
			<React.Fragment>
				<div style={{marginBottom:'4rem'}}>Edit Category</div>
				<div className="root card border-info mb-3">
					{dom}		
				</div>
			</React.Fragment>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));