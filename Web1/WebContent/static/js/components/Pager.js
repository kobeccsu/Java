import React from 'react'

class Pager extends React.Component{
    constructor(props){
        super(props);
        this.turnPage = this.turnPage.bind(this);
    }

    turnPage(pageIndex){
        let self = this;
        this.props.updateParentState({currentIndex: pageIndex}, ()=>{
            self.props.reload();
        });
    }

    render(){
        const isCurIndexOverPrev = this.props.currentIndex - 5 > 0;
        const isCurIndexOverNext = this.props.totalPageSize - this.props.currentIndex > 5;
        var pages = [];
        for (let i = this.props.currentIndex - 5 > 0 ? this.props.currentIndex - 5 : 1 ; i <= this.props.totalPageSize; i++){
            pages.push(<span key={i} data-pageindex={i} className={this.props.currentIndex == i ? 'gray' : ''} 
                onClick={()=>{this.turnPage(i)}}>{i}</span>);
        }
        return (
            <div className='pager'>
                {isCurIndexOverPrev ? <><span onClick={()=>{this.turnPage(1)}}>First</span><span>...</span></> : ''}
                {pages}
                {isCurIndexOverNext ? <><span>...</span><span onClick={()=>this.turnPage(this.props.totalPageSize)}>Last</span></> : ''}
            </div>
        );
    }
}

export default Pager;