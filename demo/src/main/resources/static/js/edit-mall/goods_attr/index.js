import React from 'react'
import ReactDOM from 'react-dom'
import '../../../css/sysadmin/policy.css'
import '../../../css/bootstrap.min.css'
import Popper from 'popper.js'
import bootstrap from 'bootstrap'
import DropDownList from '../../components/dropdownlist'
import axios from 'axios'
import MaintainTextbox from '../../components/maintainTextbox'
import TreeNode from '../../components/TreeNode'
import {getParameterByName} from '../../common/util'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showEdit: false,
            itemsL1: [],
            itemsL2: [],
            itemsL3: [],
            firstCategoryName: 'LevelCategory',
            secondCategoryName: 'SecondCategory',
            thirdCategoryName: 'ThirdCategory',
            categoryId: 0,
        }

        this.linkedChildDropChange = this.linkedChildDropChange.bind(this);
        this.getChild = this.getChild.bind(this);
        this.addOrUpdate = this.addOrUpdate.bind(this);
    }

    linkedChildDropChange(id, key, k1, val1, updateSelfKey, updateSelfVal) {
        if (key != '') {
            this.getChild(id, (items) => this.setState({ [key]: items, [k1]: val1, [updateSelfKey]: updateSelfVal }));
        }
        else {
            this.setState({ [updateSelfKey]: updateSelfVal, categoryId: id });
        }
    }

    getChild(id, func) {
        axios.get('/category/getchild?id=' + id).then((response) => {
            return func(response.data);
        });
    }

    addOrUpdate(id, pid, name){
        if (this.state.categoryId == 0){
            alert('please select one category');
            return;
        }

        axios.post('/attr/add', {
            attrName: name,
            shopId: getParameterByName("shopid"),
            categoryId: this.state.categoryId
        })
        .then((response) => {
            return func(response.data);
        });
    }

    componentDidMount() {
        this.linkedChildDropChange(6, 'itemsL1');
    }

    render() {
        return (
            <React.Fragment>
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
                    <span>attribute name</span>
                    <span><input type="text" name="attr_name" /></span><span><button>add attribute</button></span>
                </div>
                <div>
                    <span>attribute value</span>
                    <span><input type="text" name="attr_value" /></span>
                    <span><button>add attribute value</button></span>
                </div>
                <hr />
                <div className="container">
                    <div className="row">
                        <div className="col fake-header">
                            Attribute name
                        </div>
                        <div className="col-9 fake-header">
                            Attribute value
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <TreeNode name="nihao" readonly={true} id={1} pid={0} showChildBtn={false} AddOrUpdate={this.addOrUpdate} />
                        </div>
                        <div className="col-9">
                            <div><button>Add Attribute Value</button></div>
                            <div><span>attr1</span><span>attr2</span></div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));