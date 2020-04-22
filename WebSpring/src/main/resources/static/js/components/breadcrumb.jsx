import React from 'react'

export default class BreadCrumb extends React.Component{
    render(){
        const list = this.props.level.map((item, index)=>{
            let isLast = index == this.props.level.length -1;
            return (
                <li key={index} className={"breadcrumb-item" + (isLast ? " active": "")} {...(isLast ? {'aria-current': "page"} : '')}><a href={item.url}>{item.text}</a></li>
            )           
        });
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    {list}
                </ol>
            </nav>
        )
    }
}