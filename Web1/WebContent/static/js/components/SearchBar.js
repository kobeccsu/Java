import React from 'react'

class SearchBar extends React.Component{
    constructor(e){
        super(e);
    }

    render(){
        return(
            <div className="searchbar">
                <div>
                    <label>search name</label>
                    <input type="text" value={this.props.searchTxt} onChange={(e)=> {this.setState({searchTxt:e.target.value})}} 
                        placeholder="input some info" />
                    <input type="button" value="search" 
                        onClick={()=>{
                            this.props.handleSearch(1, this.props.searchTxt)
                        }} id="search" />
                    <input type="button" value="add policy" onClick={ 
                        ()=>{    
                            this.props.updateState({showEdit: true, policyname:'', isAdd: true});
                        } } />
                </div>
		    </div>
        );
    }
}

export default SearchBar;