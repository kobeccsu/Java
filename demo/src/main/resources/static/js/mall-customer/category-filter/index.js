
import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import '../../../css/mall-customer/category-filter.css'

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <div className="selector">
                    <div className="J_selectorLine s-line">
                        <div className="sl-wrap">
                            <div className="sl-key"><strong>适用面积:</strong></div>
                            <div className="sl-value">
                                <div className="sl-v-list">
                                    <ul className="J_valueList">
                                        <li>
                                            <a href="/list.html?cat=1620%2C1624%2C1661&amp;ev=exbrand_%E7%BB%BF%E4%B9%8B%E6%BA%90%5E3707_33710%5E&amp;cid3=1661" rel="nofollow" ><i></i>其它</a>
                                        </li>
                            
                                    </ul>
                                </div>
                                <div className="sl-btns">
                                    <a className="btn btn-primary J_btnsConfirm disabled" href="#">确定</a>
                                    <a className="btn btn-default J_btnsCancel" href="#">取消</a>
                                </div>
                            </div>
                            <div className="sl-ext">
                                <a className="sl-e-more J_extMore" href="#" style={{visibility: 'hidden'}}>更多<i></i></a>
                                <a className="sl-e-multiple J_extMultiple" href="#">多选<i></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));