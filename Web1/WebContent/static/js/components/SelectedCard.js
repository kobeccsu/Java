import React from 'react'

export default class SelectedCard extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const cards = this.props.list.map((item, index)=>{
            return (
            <div className="card" key={index}>				
                <div className="card-body">
                    <button type="button" className="close" aria-label="Close" onClick={()=>{this.props.remove(item.id)}}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <p>{item.name}</p>
                </div>
            </div>)
        });
        return (
        <div className="card container">				
            {cards}
        </div>
        )
    }
}