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
            categoryId: 0
        }

        this.linkedChildDropChange = this.linkedChildDropChange.bind(this);
        this.getChild = this.getChild.bind(this);
    }

    getChild(id, func){
        axios.get('/category/getchild?id=' + id).then((response)=>{
            return func(response.data);
        });
    }

    linkedChildDropChange(id, key, k1, val1, updateSelfKey, updateSelfVal){
        if ( key != '') {
            this.getChild(id, (items) => this.setState({[key]: items, [k1]: val1, [updateSelfKey]: updateSelfVal}));
        }
        else {
            this.setState({[updateSelfKey]: updateSelfVal, categoryId: id});
        }
    }

    componentDidMount(){
        this.linkedChildDropChange(6, 'itemsL1');
    }

    render() {
        return (
            <div className="container">
                <div>
                    <span>name</span><span><input type="text" placeholder="goods name" value={this.state.name} /></span>
                </div>
                <div style={{display: 'flex'}}>
                    <span>category</span>
                    <span style={{display: 'flex'}}>
                        <DropDownList menuCaption={this.state.firstCategoryName} items={this.state.itemsL1} 
                            updateChild={(id,name) => this.linkedChildDropChange(id, 'itemsL2', 'secondCategoryName', 'Please Select', 'firstCategoryName', name)} />
                        <DropDownList menuCaption={this.state.secondCategoryName} items={this.state.itemsL2} 
                            updateChild={(id,name) => this.linkedChildDropChange(id, 'itemsL3', 'thirdCategoryName', 'Please Select', 'secondCategoryName', name)} />
                        <DropDownList menuCaption={this.state.thirdCategoryName} items={this.state.itemsL3} 
                            updateChild={(id,name) => this.linkedChildDropChange(id, '', '', '', 'thirdCategoryName', name)} />
                    </span>
                </div>
                <div>
                    <span>banner pic</span>
                    <span><input type="file" name="banner_pic" /></span>
                </div>
                <div>
                    <span>detail pic</span>
                    <span><input type="file" name="banner_pic" /></span>
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
                    <span><input type="text" name="price" /></span>
                </div>
                <div>
                    <span>promotional price</span>
                    <span><input type="text" name="promotional_price"/></span>
                </div>
                <div>
                    <span>is_agent</span>
                    <span><input type="checkbox" name="is_agent" /></span>
                </div>
                <div>
                    <span>is_promotion</span>
                    <span><input type="checkbox" name="is_promotion"/></span>
                </div>
                <div>
                    <span>is_market</span>
                    <span><input type="checkbox" name="is_market"/></span>
                </div>
                <div>
                    <span>is_hot</span>
                    <span><input type="checkbox" name="is_hot"/></span>
                </div>
                <div>
                    <span>is_new</span>
                    <span><input type="checkbox" name="is_new"/></span>
                </div>
                <div>
                    <span>is_index</span>
                    <span><input type="checkbox" name="is_index" /></span>
                </div>
                <div>
                    <span>group_buy_id</span>
                    <span><input type="text" name="group_buy_id"/></span>
                </div>
            </div>
        );
    }
}