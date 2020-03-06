import React from 'react'

class Pager extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const isCurIndexOverPrev = this.props.currentIndex - 5 > 0;
        const isCurIndexOverNext = this.props.totalPageSize - this.props.currentIndex > 5;
        var pages = [];
        for (var i = this.props.currentIndex - 5 > 0 ? this.props.currentIndex - 5 : 1 ; i <= this.props.totalPageSize; i++){
            pages.push(<span data-pageindex={i}>{i}</span>);
        }
        console.log('pages count' + this.props.totalPageSize);
        return (
            <div className='pager'>
                {isCurIndexOverPrev ? <><span>First</span><span>...</span></> : ''}
                {pages}
                {isCurIndexOverNext ? <><span>...</span><span>Last</span></> : ''}
            </div>
        );
    }
}

export default Pager;