import React from 'react'
import {
	SelectField, MenuItem
}
from 'material-ui'



export default class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			syncOptions: ['Every Hour', 'Every Day', 'Bi-Daily', 'Every Week', 'Every Month'],
			value: 1
		};
	}

	render() {
		return (
			<div className="content">
            	<SelectField
          			value={this.state.value}
          			onChange={(event, index, value) => this.setState({value})}
          			floatingLabelText="Sync Wallpaper"
        			>
        			{
        				this.state.syncOptions.map((option, idx) => {
        					idx++ // prevent value of 0
        					return <MenuItem key={idx} value={idx} primaryText={option}/>
        				})
        			}
        		</SelectField>
            </div>
		)
	}
}