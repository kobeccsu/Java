import React from 'react'

export default class SelectedCard extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const hasItem = this.props.list !== undefined && this.props.list.length > 0;
        const cards = hasItem ? this.props.list.map((item, index)=>{
            return (
            <div className="card" key={index}>				
                <div className="card-body">
                    <button type="button" className={this.props.hide_button ? 'invisible' : 'visible close'} aria-label="Close" onClick={()=>{this.props.remove(item.id)}}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <p>{item.name}</p>
                </div>
            </div>)
        }) : [];
        
        return (
            <div className="card container" style={{display: hasItem ? 'block' : 'none'}} >		
                {cards}
            </div>
        )
    }
}