import React from 'react'

class TableCom extends React.Component{
    constructor(props){
        super(props);
	}
	generateTh(){
		return this.props.headers.map((item,index) =>{
				return <th>{item}</th>
			});
	}
    render(){
        return (
            <div className="table">
				<table>
					<thead>
						<tr>
							{this.generateTh()}
						</tr>
					</thead>
					<tbody id="tableBody">
						{this.props.tbody}
					</tbody>
				</table>
			</div>
        );
    }
}

export default TableCom;