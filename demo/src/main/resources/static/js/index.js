import React from 'react'
import ReactDOM from 'react-dom'
import '../../static/css/index.css'
import axios from 'axios'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryMenu:[]
        }

        this.load = this.load.bind(this);
    }

    load(){
		axios.get('/category/list').then((result)=>{
			let data = result.data;
			this.setState({categoryMenu: [data]});
		});
    }
    
    componentDidMount(){
        this.load();
    }

    render() {
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
                    <div className="lc-col left-menu">
                         <div className="category">
                             <ul className="cat-menu">
                                <li>
                                    <span>家用电器</span>
                                </li>
                                <li>
                                    <span>家用电器1</span>
                                </li>
                             </ul>
                         </div>
                         <div className="cate-wrap">
                             <div className="cate-submenu">
                                <dl className="cate-sub-list clearfix">
                                    <dt className="cate-sub-title"></dt>
                                    <dd className="cate-sub-link"></dd>
                                    <dd className="cate-sub-link"></dd>
                                </dl>
                             </div>
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