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
			tree: [
				// { name:'item1', id: 1, pid: 0,
				// 	children:[ {name:'child1', id:2, pid:1,
				// 		children:[{name: 'grandchild1', children:[] }
				// 	] },
				// 	{ name:'child2', id:3,pid: 1, children:[] }
				// 	]
				// },{
				// 	name:'root2', id: 4, pid: 0, children:[]
				// }
			],
			isAdd: false
		}
		this.load = this.load.bind(this);
		this.iterateChild = this.iterateChild.bind(this);
		this.appendChildNode = this.appendChildNode.bind(this);
		this.addChildNode = this.addChildNode.bind(this);
		this.AddOrUpdate = this.AddOrUpdate.bind(this);
		this.setEditing = this.setEditing.bind(this);
		this.deleteFromDB = this.deleteFromDB.bind(this);
	}

	componentDidMount(){
		this.load();
	}

	load(){
		axios.get('/category/list').then((result)=>{
			let data = result.data;
			this.setState({tree: [data]});
		});
	}

	AddOrUpdate(id, pid, name){
		axios.post('/category/' + (this.state.isAdd ? 'add' : 'update'),
			{id: id, pid: pid, name: name})
		.then((response)=>{
			this.load();
		});
	}

	appendChildNode(tree, nodeid){
		let _self = this;
		return tree.reduce(function(item, index){
			if (index.id == nodeid){
				index.children.push({name:'', id: -1, pid: nodeid, readonly: false, children:[]});
				return index;
			}
			if (index.children.length > 0){
				return _self.appendChildNode(index.children, nodeid);
			}
		}, []);
	}

	addChildNode(id){
		var newTree =this.state.tree;
		this.appendChildNode(newTree, id);
		this.setState({tree: newTree, isAdd: true});
	}

	setEditing(){
		this.setState({isAdd: false});
	}

	deleteFromDB(id){
		axios.post('/category/delete',
				{id: id})
			.then((response)=>{
				this.load();
			});
	}
	iterateChild(item){
		let _self = this;
		return item.map(function(item, index){
			return (
				<div className="node" key={item.name + index}>
					<TreeNode name={item.name} id={item.id} pid={item.pid} readonly={item.readonly == undefined} addNode={_self.addChildNode} 
						AddOrUpdate={_self.AddOrUpdate} notifyEditing={_self.setEditing} deleteFromDB={_self.deleteFromDB} />
					{ item.children.length > 0 ? _self.iterateChild(item.children) : ''}
				</div>
			)
		});
		
	}

	render(){
		const dom = this.iterateChild(this.state.tree);
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