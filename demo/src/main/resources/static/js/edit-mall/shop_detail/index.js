import React from 'react'
import ReactDOM from 'react-dom'
import '../../../css/sysadmin/policy.css'
import '../../../css/bootstrap.min.css'
import EditProduct from './edit'
import Popper from 'popper.js'
import bootstrap from 'bootstrap'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showEdit: false
        }
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <button className="btn btn-warning" onClick={() => { this.setState({ showEdit: !this.state.showEdit }) }}>{!this.state.showEdit ? 'to add product' : 'cancel'}</button>
                </div>
                
                {this.state.showEdit ? <EditProduct /> : ''}
            </React.Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));