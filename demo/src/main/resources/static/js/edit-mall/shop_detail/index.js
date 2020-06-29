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
            goods:[],
            base64:''
        }
        this.getAllGoods = this.getAllGoods.bind(this);
    }

    getAllGoods(){
        Axios.get("/goods/list?shopId=" + getParameterByName("id"))
        .then(response=>{
            this.setState({goods:[]});
            this.setState({goods: response.data});
        })

        Axios.get("/goods/getbanner?id=16").then(res=>{
            this.setState({base64: res.data});
        })
    }

    componentDidMount(){
        this.getAllGoods();
    }
    render() {


        // let goodsList = this.state.goods.map((item, index) => {
        //     return (
                 
                    
                        // <img src={"data:image/png;base64,/goods/getbanner?id=" + this.state.base64} />
                
             
        //     );
        // });


        return (
            <React.Fragment>
                <div>
                    <button className="btn btn-warning" onClick={() => { this.setState({ showEdit: !this.state.showEdit }) }}>{!this.state.showEdit ? 'to add product' : 'cancel'}</button>
                </div>
                
                {this.state.showEdit ? <EditProduct /> : ''}

                <img src={"data:image/png;base64," + this.state.base64} />
            </React.Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));