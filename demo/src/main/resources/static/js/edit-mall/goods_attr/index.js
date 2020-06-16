import React from 'react'
import ReactDOM from 'react-dom'
import '../../../css/sysadmin/policy.css'
import '../../../css/bootstrap.min.css'
import Popper from 'popper.js'
import bootstrap from 'bootstrap'
import DropDownList from '../../components/dropdownlist'
import axios from 'axios'

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
                    <span><input type="text" name="attr_name" /></span>
                </div>
            </React.Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));