import React from 'react'
import DropDownList from '../../components/dropdownlist'


export default class EditProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }

        this.linkedChildDropChange = this.linkedChildDropChange.bind(this);
    }

    linkedChildDropChange(id){

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
                        <DropDownList menuCaption='一级分类' items={[{name:'yiyiyi', id:1}, {name: 'sdfsdf', id: 2}]} updateChild={this.linkedChildDropChange} />
                        <DropDownList menuCaption='二级分类' items={[{name:'yiyiyi', id:1}, {name: 'sdfsdf', id: 2}]} updateChild={this.linkedChildDropChange} />
                        <DropDownList menuCaption='三级分类' items={[{name:'yiyiyi', id:1}, {name: 'sdfsdf', id: 2}]} updateChild={this.linkedChildDropChange} />
                    </span>
                </div>
            </div>
        );
    }
}