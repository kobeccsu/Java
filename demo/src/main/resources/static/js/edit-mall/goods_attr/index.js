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
import { getParameterByName } from '../../common/util'

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
            attrList: [],
            isAdd: false
        }

        this.linkedChildDropChange = this.linkedChildDropChange.bind(this);
        this.getChild = this.getChild.bind(this);
        this.addOrUpdate = this.addOrUpdate.bind(this);
        this.loadAttrs = this.loadAttrs.bind(this);
        this.toAddAttribute = this.toAddAttribute.bind(this);
        this.toAddAttrValue = this.toAddAttrValue.bind(this);
        this.setEdit = this.setEdit.bind(this);
        this.addAttrValue = this.addAttrValue.bind(this);
        this.deleteAttr = this.deleteAttr.bind(this);
        this.deleteAttrVal = this.deleteAttrVal.bind(this);
    }

    linkedChildDropChange(id, key, k1, val1, updateSelfKey, updateSelfVal) {
        if (key != '') {
            this.getChild(id, (items) => this.setState({ [key]: items, [k1]: val1, [updateSelfKey]: updateSelfVal }));
        }
        else {
            this.setState({ [updateSelfKey]: updateSelfVal, categoryId: id }, () => {
                this.loadAttrs();
            });

        }
    }

    getChild(id, func) {
        axios.get('/category/getchild?id=' + id).then((response) => {
            return func(response.data);
        });
    }

    addOrUpdate(id, pid, name) {
        if (this.state.categoryId == 0) {
            alert('please select one category');
            return;
        }

        axios.post('/attr/' + (this.state.isAdd ? 'add' : 'update'), {
            id: id,
            attrName: name,
            shopId: getParameterByName("shopId"),
            categoryId: this.state.categoryId
        })
            .then((response) => {
                this.loadAttrs();
            });
    }

    addAttrValue(id, pid, name) {
        axios.post('/attrval/' + (this.state.isAdd ? 'add' : 'update'), {
            id: id,
            attrValue: name,
            shopId: getParameterByName("shopId"),
            attrId: pid
        })
            .then((response) => {
                this.loadAttrs();
            });
    }

    loadAttrs() {
        axios.get("/attr/list?categoryId=" + this.state.categoryId)
            .then((response) => {
                this.setState({ attrList: response.data });
            })
    }

    toAddAttribute() {
        this.setState(state => {
            let list = state.attrList.push({ attrName: '', id: 0, readonly: false, values: [] });
            return { list, isAdd: true };
        })
    }

    toAddAttrValue(nodeid) {
        let items = [...this.state.attrList];
        let item = items.find((i) => i.id == nodeid);
        item.values.push({ attrValue: '', id: 0, pid: nodeid, readonly: false });

        this.setState({ attrList: items, isAdd: true });
    }

    setEdit(isAddorUpdate) {
        this.setState({ isAdd: isAddorUpdate });
    }

    deleteAttr(id) {
        axios.post('/attr/delete',
            { id: id })
            .then((response) => {
                this.loadAttrs();
            });
    }

    deleteAttrVal(id) {
        axios.post('/attrval/delete',
            { id: id })
            .then((response) => {
                this.loadAttrs();
            });
    }

    componentDidMount() {
        this.linkedChildDropChange(6, 'itemsL1');
    }

    render() {
        let listdom = this.state.attrList.map((item, index) => {
            return (
                <div className="row" style={{ "borderBottom": "1px solid black" }} key={index}>
                    <div className="col">
                        <TreeNode name={item.attrName} readonly={item.readonly} id={item.id} pid={0} showChildBtn={false} AddOrUpdate={this.addOrUpdate} 
                            notifyEditing={this.setEdit} deleteFromDB={this.deleteAttr} />
                    </div>
                    <div className="col-9">
                        <div><button onClick={() => this.toAddAttrValue(item.id)}>Add Attribute Value</button></div>
                        {
                            item.values.map((item1, index1) => {
                                return (<div key={index1}><TreeNode name={item1.attrValue} readonly={item1.readonly} id={item1.id}
                                    pid={item.id} showChildBtn={false} AddOrUpdate={this.addAttrValue} notifyEditing={this.setEdit} deleteFromDB={this.deleteAttrVal} /></div>);
                            })
                        }

                    </div>
                </div>
            );
        });

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
                    <span><button onClick={this.toAddAttribute}>add attribute</button></span>
                </div>
                <hr />
                <div className="container">
                    <div className="row">
                        <div className="col fake-header">
                            Attribute name
                        </div>
                    </div>
                    {listdom}
                </div>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));