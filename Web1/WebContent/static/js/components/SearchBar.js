import React from 'react'

class SearchBar extends React.Component{
    constructor(e){
        super(e);
    }

    render(){
        return(
            <div className="searchbar container">
                <div style={{display:'flex'}}>
                    <label className="col-sm-2 col-form-label">search name</label>
                    <input type="text" className="form-control" value={this.props.searchTxt} onChange={(e)=> {this.props.updateSearch(e.target.value)}} 
                        placeholder="input some info" />
                    <input type="button" className="btn btn-primary" value="search" 
                        onClick={ this.props.handleSearch } />
                    <input type="button" value="To Add" className="btn btn-info" onClick={this.props.showAddView} />
                </div>
		    </div>
        );
    }
}

export default SearchBar;