import React from 'react'
import ReactDOM from 'react-dom'
import '../../static/css/index.css'
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryMenu: [],
            level1Dom: <React.Fragment></React.Fragment>,
            level23Dom: <React.Fragment></React.Fragment>,
            hover:[]
        }

        this.load = this.load.bind(this);
        this.iterateChild = this.iterateChild.bind(this);
        this.onHover = this.onHover.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
    }

    load() {
        axios.get('/category/list').then((result) => {
            let data = result.data;
            this.setState({ categoryMenu: [data] }, ()=>{   
                // let l1 = <div></div> , l2 = <div></div> ;     
                // let some = this.iterateChild(this.state.categoryMenu, 1, l1, l2);
                // this.setState({level1Dom : l1, level23Dom : l2})

                // let l1Dom = this.iterateChild(this.state.categoryMenu[0].children, 1, true);
                // let l2Dom = this.iterateChild(this.state.categoryMenu[0].children, 1, false);
                // this.setState({level1Dom : l1Dom, level23Dom : l2Dom})
                //this.resetHoverState(()=>{});
            });
        });
    }

    resetHoverState(func){
        let arr = new Array(this.state.categoryMenu[0].children.length).fill(false);
        this.setState({hover: arr}, ()=>func());
    }

    onHover(index, value){
        this.resetHoverState(()=>{
            const arr = this.state.hover.slice() //copy the array
            arr[index] = value //execute the manipulations
            this.setState({hover: arr});
        });
      
    }

    onMouseOut(e){
        // if (e.target.className != "left-menu" && e.target.className != "cate-hover-wrap"){
        //     console.log(e.target.className);
            this.resetHoverState(()=>{});
        // }
    }

    iterateChild(item, depth, onlyfirstLevel) {
        let _self = this;
        return item &&  item.map(function (item, index) {
            
            if (depth == 1) {

                return <React.Fragment> 
                {onlyfirstLevel ? <li key={index} onMouseEnter={() =>_self.onHover(index, true)} ><span>{item.name}</span></li> :''} 
                {!onlyfirstLevel && item.children.length > 0 ?
                    <div key={index} className="cate-submenu" onMouseEnter={() =>_self.onHover(index, true)} style={{display: _self.state.hover[index] ? "block" : "none"}}>
                            <dl key={index} className="cate-sub-list clearfix"> + {_self.iterateChild(item.children, 2, onlyfirstLevel)}
                            </dl>
                        </div>
                    : ''}
                </React.Fragment>
            }
            if (depth == 2) {
                return <React.Fragment><dt key={index} className="cate-sub-title">{item.name}</dt>{item.children.length > 0 ? _self.iterateChild(item.children, 3, onlyfirstLevel) : ''}</React.Fragment>
            }
            if (depth == 3)
                return <dd key={index} className="cate-sub-link">{item.name}</dd>



            // <div className="node" key={item.name + index}>
            // 	<TreeNode name={item.name} id={item.id} pid={item.pid} readonly={item.readonly == undefined} addNode={_self.addChildNode} 
            // 		AddOrUpdate={_self.AddOrUpdate} notifyEditing={_self.setEditing} deleteFromDB={_self.deleteFromDB} />
            // 	{ item.children.length > 0 ? _self.iterateChild(item.children) : ''}
            // </div>

        });

    }

    componentDidMount() {
        this.load();

    }

    render() {
        let toDeal = this.state.categoryMenu &&  this.state.categoryMenu[0] && this.state.categoryMenu[0].children ;
        let l1Dom = toDeal && this.iterateChild(this.state.categoryMenu[0].children, 1, true);
        let l2Dom = toDeal && this.iterateChild(this.state.categoryMenu[0].children, 1, false);

        return (
            <React.Fragment>
                <div style={{ background: '#08664B' }}>
                    <div className="w">
                        <a href="https://pro.jd.com/mall/active/2a11Wb3LP183K3RQNdBoBWXVXw2M/index.html" target="_blank" clstag="pageclick|keycount|hk|adtop_01">
                            <img alt="端午" width="1190" height="80" src="//img20.360buyimg.com/img/jfs/t1/122329/25/5277/95701/5eec849bE60e4ba93/8ea4efa9a0f88a18.png" />
                        </a>
                        <div id="top-banner-close"></div>
                    </div>
                </div>
                <div className="middle">
                    <div className="lc-col left-menu" onMouseLeave={this.onMouseOut}>
                        <div className="category" >
                            <ul className="cat-menu">
                                {/* <li>
                                    <span>家用电器</span>
                                </li>
                                <li>
                                    <span>家用电器1</span>
                                </li> */}
                                {/* {this.state.level1Dom} */}
                                {l1Dom}
                            </ul>
                        </div>
                        <div className="cate-hover-wrap" onMouseLeave={this.onMouseOut} style={{display: this.state.hover.filter(m=>m == true).length > 0 ? 'block' : 'none'}} >
                            {/* <div className="cate-submenu">
                                <dl className="cate-sub-list clearfix"> */}
                                    {/* <dt className="cate-sub-title">1111</dt>
                                    <dd className="cate-sub-link">1111-1</dd>
                                    <dd className="cate-sub-link">1111-2</dd> */}

                                    {/* {this.state.level23Dom} */}
                                    {l2Dom}
                                {/* </dl>
                            </div> */}
                        </div>
                    </div>
                    <div className="lc-col middle-roll">

                    </div>
                    <dir className="lc-col right">

                    </dir>
                </div>
            </React.Fragment>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));