
import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import '../../../css/mall-customer/category-filter.css'
import { getParameterByName } from '../../common/util'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attrList: [],
            goods: [],
            ex: getParameterByName("ex") == null || getParameterByName("ex") == '' ? '' : getParameterByName("ex")
        }
    }

    getAllGoods() {
        const ex = this.state.ex;
        const categoryId = getParameterByName("categoryId");
        const requestOne = axios.get("/goods/listByCat?categoryId=" + categoryId + (ex == ''  ? '' : '&ex=' + encodeURIComponent(ex)));
        const requestTwo = axios.get('/goods/getbannerByCat?categoryId=' + categoryId + (ex == '' ? '' : '&ex=' + encodeURIComponent(ex)));

        axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
            let arr1 = responses[0].data;

            arr1.forEach(function (v) { delete v.bannerPic; delete v.detailPic; });

            const arr2 = responses[1].data;
            let merged = [];

            for (let i = 0; i < arr1.length; i++) {
                merged.push({
                    ...arr1[i],
                    ...(arr2.find((itmInner) => itmInner.id === arr1[i].id))
                });
            }

            this.setState({ goods: merged });

        })).catch(errors => {

        })
    }

    loadAttrs() {
        axios.get("/attr/list?categoryId=" + getParameterByName("categoryId"))
            .then((response) => {
                this.setState({ attrList: [] });
                this.setState({ attrList: response.data });
            })
    }

    componentDidMount() {
        this.loadAttrs();
        this.getAllGoods();
    }

    isExistAttr(attributeId) {
        return this.state.ex && this.state.ex.split("^").filter(item => attributeId == item.split('_')[0]).length > 0
    }

    render() {
        const ex = this.state.ex;

        const attrListDom = this.state.attrList.map((item, index) => {
            return (
                this.isExistAttr(item.id) ? '' :
                    <div className="J_selectorLine s-line" key={index}>
                        <div className="sl-wrap">
                            <div className="sl-key"><strong>{item.attrName}</strong></div>
                            <div className="sl-value">
                                <div className="sl-v-list">
                                    <ul className="J_valueList">
                                        {
                                            item.values.map((item1, index1) => {
                                                return (
                                                    <li key={index1}>
                                                        <a href={"cat?categoryId=" + getParameterByName("categoryId")
                                                            + "&ex=" + encodeURIComponent(item.id + '_' + item1.id + (ex ? '^' + ex : ''))} rel="nofollow" ><i></i>{item1.attrValue}</a>
                                                    </li>
                                                )
                                            })}
                                    </ul>
                                </div>
                                <div className="sl-btns">
                                    <a className="btn btn-primary J_btnsConfirm disabled" href="#">确定</a>
                                    <a className="btn btn-default J_btnsCancel" href="#">取消</a>
                                </div>
                            </div>
                            <div className="sl-ext">
                                <a className="sl-e-more J_extMore" href="#" style={{ visibility: 'hidden' }}>更多<i></i></a>
                                <a className="sl-e-multiple J_extMultiple" href="#">多选<i></i></a>
                            </div>
                        </div>
                    </div>
            )
        })

        const goodsList = this.state.goods.map((item, index) => {
            return (
                <div key={index}>
                    <div>
                        <img src={"data:image/png;base64," + item.banner_pic} />
                    </div>
                    <div className="goods-caption">
                        <a herf='/goods/detail'>{item.goodsname}</a>
                    </div>
                </div>
            )
        });

        return (
            <React.Fragment>
                <div className="selector">
                    {attrListDom}
                </div>
                <div>
                    {goodsList}
                </div>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));