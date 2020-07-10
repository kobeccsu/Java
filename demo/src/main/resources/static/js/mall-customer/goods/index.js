import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { getParameterByName } from '../../common/util'
 
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goods: null
        }
    }
    getGoods() {
        const ex = this.state.ex;
        const id = getParameterByName("id");
        const requestOne = axios.get("/goods/getOneGoods?goodsId=" + id);
        const requestTwo = axios.get('/goods/getOneBanner?goodsId=' + id);

        axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
            let arr1 = responses[0].data;

            delete arr1.bannerPic;
            delete arr1.detailPic;

            const arr2 = responses[1].data;

            this.setState({ goods: { ...arr1, ...arr2 } });

        })).catch(errors => {

        })
    }

    componentDidMount() {
        this.getGoods();
    }

    render() {
        return (
            <React.Fragment>
                <div className="top"></div>
                <div><h1>{this.state.goods ? this.state.goods.goodsname : ''}</h1></div>
                <div><button className="btn btn-danger">Add to Cart</button></div>
                <div>
                    <img src={"data:image/png;base64," + (this.state.goods && this.state.goods.banner_pic ? this.state.goods.banner_pic : '')} />
                </div>

                <hr />
                <div>
                    <img src={"data:image/png;base64," + (this.state.goods && this.state.goods.detail_pic ? this.state.goods.detail_pic : '')} />
                </div>
            </React.Fragment>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('app'));