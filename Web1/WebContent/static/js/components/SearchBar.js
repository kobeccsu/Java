import React from 'react'

class SearchBar extends React.Component{
    constructor(e){
        super(e);
        this.state = {
            searchTxt : ''
        };
    }

    render(){
        return(
            <div className="searchbar">
                <div>
                    <label>search name</label>
                    <input type="text" value={this.state.searchTxt} onChange={(e)=> {this.setState({searchTxt:e.target.value})}} id="search_content" name="search_policyname" placeholder="input some info" />
                    <input type="button" value="search" 
                        onClick={()=>{
                            this.props.handleSearch(1, this.state.searchTxt)
                        }} id="search" />
                    <input type="button" value="add policy" onClick={ 
                        ()=>{    
                            this.props.handleParent({showEdit: true, isAdd: true});
                        } } />
                </div>
		    </div>
        );
    }
}

export default SearchBar;