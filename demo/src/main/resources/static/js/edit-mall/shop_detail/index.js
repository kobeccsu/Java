import React from 'react'
import ReactDOM from 'react-dom'
import '../../../css/sysadmin/policy.css'
import '../../../css/bootstrap.min.css'
import EditProduct from './edit'
import Popper from 'popper.js'
import bootstrap from 'bootstrap'
import Axios from 'axios'
import { getParameterByName } from '../../common/util'
import { timers } from 'jquery'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showEdit: false,
            goods: [],
            base64: ''
        }
        this.getAllGoods = this.getAllGoods.bind(this);
    }

    getAllGoods() {
        // Axios.get("/goods/list?shopId=" + getParameterByName("id"))
        //     .then(response => {
        //         this.setState({ goods: [] });
        //         this.setState({ goods: response.data });
        //     })

        // Axios.get('/goods/getbanner?shopId=' + getParameterByName("id")).then(res => {
        //     this.setState({ base64: res.data });
        // })

        const requestOne = Axios.get("/goods/list?shopId=" + getParameterByName("id"));
        const requestTwo = Axios.get('/goods/getbanner?shopId=' + getParameterByName("id"));

        Axios.all([requestOne, requestTwo]).then(Axios.spread((...responses) => {
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
            // react on errors.
        })
    }

    componentDidMount() {
        this.getAllGoods();
    }
    render() {


        let goodsList = this.state.goods.map((item, index) => {
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
                <div>
                    <button className="btn btn-warning" onClick={() => { this.setState({ showEdit: !this.state.showEdit }) }}>{!this.state.showEdit ? 'to add product' : 'cancel'}</button>
                </div>
                {this.state.showEdit ? <EditProduct /> : ''}
                {goodsList}
            </React.Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));