import React from 'react'
import DropDownList from '../../components/dropdownlist'
import axios from 'axios';

export default class EditProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            itemsL1: [],
            itemsL2: [],
            itemsL3: [],
            firstCategoryName: 'LevelCategory',
            secondCategoryName: 'SecondCategory',
            thirdCategoryName: 'ThirdCategory',
            categoryId: 0,
            banner_file: null,
            detail_file: null,
            price: 0,
            promotionalPrice: 0,
            goodsDes: '',
            isAgent: false,
            isPromotion: false,
            isMarket: false,
            isHot: false,
            isNew: false,
            isIndex: false,
            stock: 0,
        }

        this.linkedChildDropChange = this.linkedChildDropChange.bind(this);
        this.getChild = this.getChild.bind(this);
        this.addGoods = this.addGoods.bind(this);
        this.getParameterByName = this.getParameterByName.bind(this);
    }
    
    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    getChild(id, func) {
        axios.get('/category/getchild?id=' + id).then((response) => {
            return func(response.data);
        });
    }

    linkedChildDropChange(id, key, k1, val1, updateSelfKey, updateSelfVal) {
        if (key != '') {
            this.getChild(id, (items) => this.setState({ [key]: items, [k1]: val1, [updateSelfKey]: updateSelfVal }));
        }
        else {
            this.setState({ [updateSelfKey]: updateSelfVal, categoryId: id });
        }
    }

    componentDidMount() {
        this.linkedChildDropChange(6, 'itemsL1');
    }

    addGoods() {
        let formData = new FormData();
        formData.append('banner_file', this.state.banner_file);
        formData.append('detail_file', this.state.detail_file);
        formData.append('json', JSON.stringify({
            shopId: this.getParameterByName('id'),
            name: this.state.name,
            categoryId: this.state.categoryId,
            categoryName: this.state.firstCategoryName + ' ' + this.state.secondCategoryName + ' ' + this.state.thirdCategoryName,
            price: this.state.price,
            promotionalPrice: this.state.promotionalPrice,
            isAgent: this.state.isAgent,
            isPromotion: this.state.isPromotion,
            isMarket: this.state.isMarket,
            isHot: this.state.isHot,
            isNew: this.state.isNew,
            isIndex: this.state.isIndex,
            stock: this.state.stock,
            goodsDes: this.state.goodsDes,
        }));


        // You should have a server side REST API 
        axios.post('/goods/add',
            formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        ).then(function () {
            console.log('SUCCESS!!');
        }).catch(function () {
            console.log('FAILURE!!');
        });
    }

    render() {
        return (
            <div className="container">
                <div>
                    <span>name</span><span><input type="text" placeholder="goods name" value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} /></span>
                </div>
                <div style={{ display: 'flex' }}>
                    <span>category</span>
                    <span style={{ display: 'flex' }}>
                        <DropDownList menuCaption={this.state.firstCategoryName} items={this.state.itemsL1}
                            updateChild={(id, name) => this.linkedChildDropChange(id, 'itemsL2', 'secondCategoryName', 'Please Select', 'firstCategoryName', name)} />
                        <DropDownList menuCaption={this.state.secondCategoryName} items={this.state.itemsL2}
                            updateChild={(id, name) => this.linkedChildDropChange(id, 'itemsL3', 'thirdCategoryName', 'Please Select', 'secondCategoryName', name)} />
                        <DropDownList menuCaption={this.state.thirdCategoryName} items={this.state.itemsL3}
                            updateChild={(id, name) => this.linkedChildDropChange(id, '', '', '', 'thirdCategoryName', name)} />
                    </span>
                </div>
                <div>
                    <span>banner pic</span>
                    <span><input type="file" name="banner_pic" onChange={(e) => { this.setState({ banner_file: e.target.files[0] }) }} /></span>
                </div>
                <div>
                    <span>detail pic</span>
                    <span><input type="file" name="detail_pic" onChange={(e) => { this.setState({ detail_file: e.target.files[0] }) }} /></span>
                </div>
                <div>
                    <span>buy_count</span>
                    <span><input type="text" name="buy_count" /></span>
                </div>
                <div>
                    <span>buy_month_count</span>
                    <span><input type="text" name="buy_m_count" /></span>
                </div>
                <div>
                    <span>price</span>
                    <span><input type="text" name="price" value={this.state.price} onChange={(e) => this.setState({ price: e.target.value })} /></span>
                </div>
                <div>
                    <span>promotional price</span>
                    <span><input type="text" name="promotional_price" value={this.state.promotionalPrice} onChange={(e) => this.setState({ promotionalPrice: e.target.value })} /></span>
                </div>
                <div>
                    <span>is_agent</span>
                    <span><input type="checkbox" name="is_agent" checked={this.state.isAgent}
                        onChange={(e) => { this.setState({ isAgent: e.target.checked }) }} /></span>
                </div>
                <div>
                    <span>is_promotion</span>
                    <span><input type="checkbox" name="is_promotion" checked={this.state.isPromotion}
                        onChange={(e) => { this.setState({ isPromotion: e.target.checked }) }} /></span>
                </div>
                <div>
                    <span>is_market</span>
                    <span><input type="checkbox" name="is_market" checked={this.state.isMarket}
                        onChange={(e) => { this.setState({ isMarket: e.target.checked }) }} /></span>
                </div>
                <div>
                    <span>is_hot</span>
                    <span><input type="checkbox" name="is_hot" checked={this.state.isHot}
                        onChange={(e) => { this.setState({ isHot: e.target.checked }) }} /></span>
                </div>
                <div>
                    <span>is_new</span>
                    <span><input type="checkbox" name="is_new" checked={this.state.isNew}
                        onChange={(e) => { this.setState({ isNew: e.target.checked }) }} /></span>
                </div>
                <div>
                    <span>is_index</span>
                    <span><input type="checkbox" name="is_index" checked={this.state.isIndex}
                        onChange={(e) => { this.setState({ isIndex: e.target.checked }) }} /></span>
                </div>
                <div>
                    <span>group_buy_id</span>
                    <span><input type="text" name="group_buy_id" /></span>
                </div>
                <div>
                    <span>goods_des</span>
                    <span><textarea rows="10" cols="50" onChange={(e)=>this.setState({goodsDes: e.target.value})}>{this.state.goodsDes}</textarea></span>
                </div>
                <div>
                    <span>stock</span>
                    <span><input type="text" name="stock" placeholder="stock" value={this.state.stock} onChange={(e) => this.setState({ stock: e.target.value })} /></span>
                </div>
                <div>
                    <span>freight_tmlp_name</span>
                    <span><input type="text" name="freight_tmlp_name" /></span>
                </div>
                <div>
                    <button onClick={this.addGoods}>submit</button>
                </div>
            </div>
        );
    }
}