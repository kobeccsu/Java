import React from 'react'

export default class DropDownList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            menuCaption: this.props.menuCaption
        }
    }

    changeLabel_child_category(id, name){

        this.props.updateChild(id);
    }

    render() {
        let _self = this;
        let items = this.props.items.map((item,index) =>{
            return (
                <a key={index} className="dropdown-item" href="#" onClick={()=>{_self.changeLabel_child_category(item.id, item.name)}}>{item.name}</a>
            );
        });

        return (
            <div className="dropdown show">
                <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.state.menuCaption}
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    {items}
                </div>
            </div>
        );
    }
}