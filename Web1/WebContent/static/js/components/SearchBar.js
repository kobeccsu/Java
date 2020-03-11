import React from 'react'

class SearchBar extends React.Component{
    constructor(e){
        super(e);
    }

    render(){
        return(
            <div className="searchbar container">
                <div>
                    <label className="col-sm-2 col-form-label">search name</label>
                    <input type="text" className="form-control" value={this.props.searchTxt} onChange={(e)=> {this.props.updateState({searchTxt:e.target.value})}} 
                        placeholder="input some info" />
                    <input type="button" className="btn btn-primary" value="search" 
                        onClick={()=>{
                            this.props.handleSearch(1, this.props.searchTxt)
                        }} id="search" />
                    <input type="button" value="To Add" className="btn btn-info" onClick={ 
                        ()=>{    
                            this.props.updateState({showEdit: true, editname:'', isAdd: true});
                        } } />
                </div>
		    </div>
        );
    }
}

export default SearchBar;