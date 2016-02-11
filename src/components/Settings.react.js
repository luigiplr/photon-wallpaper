import React from 'react'
import {
	SelectField, MenuItem, RaisedButton
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
		const buttonStyle = {
			margin: 12,
			float: 'right'
		};

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
        		<div className="bottom">
        			<RaisedButton style={buttonStyle} label="Sync Now"/>
        		</div>
            </div>
		)
	}
}