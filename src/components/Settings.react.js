import React from 'react'
import {
	ietfToOpenType
}
from 'lang-ietf-opentype'
import {
	SelectField, MenuItem, RaisedButton, Toggle
}
from 'material-ui'
import ThemeManager from 'material-ui/lib/styles/theme-manager'

import Theme from '../materialTheme'


const resolutionOptions = [{
	value: '1920_1080',
	text: '1080p (1920 × 1080)'
}, {
	value: '1280_720',
	text: '720p (1280 x 720)'
}];


const regions = [{
	code: 'en-US',
	text: 'North America',
}, {
	code: 'zh-CN',
	text: 'Europe'
}, {
	code: 'ja-JP',
	text: 'Asia'
}]


const syncOptions = ['Every Hour', 'Every Day', 'Bi-Daily', 'Every Week', 'Every Month'];

export default class Settings extends React.Component {

	state = {
		autoSync: true,
		syncOption: 1,
		resolution: resolutionOptions[0].value,
		region: regions[0].code,
		syncOptions,
		regions,
		resolutionOptions
	};

	static childContextTypes = {
		muiTheme: React.PropTypes.object
	};

	getChildContext() {
		return {
			muiTheme: ThemeManager.getMuiTheme(Theme),
		};
	}

	getStyle(el) {
		switch (el) {
			case 'feild':
				return {
					floatingLabelStyle: {
						fontWeight: 500
					},
					style: {
						fontWeight: 300
					}
				}
				break;
			case 'toggle':
				return {
					marginTop: 16,
				};
				break;
			case 'button':
				return {
					margin: 12,
					float: 'right'
				};
				break;
		}
	}


	render() {
		const feildStyles = this.getStyle('feild')
		const buttonStyle = this.getStyle('button')
		const toggleSTyle = this.getStyle('toggle');

		return (
			<div className="content">
			    <Toggle
      				label="Auto Syning Enabled"
      				defaultToggled={this.state.autoSync}
      				style={toggleSTyle}
    				/>
            	<SelectField
          			value={this.state.syncOption}
          			onChange={(event, index, value) => this.setState({syncOption:value})}
          			{...feildStyles}
          			fullWidth={true}
          			floatingLabelText="Sync Wallpaper"
        			>
        			{
        				this.state.syncOptions.map((option, idx) => {
        					idx++ // prevent value of 0
        					return <MenuItem key={idx} value={idx} primaryText={option}/>;
        				})
        			}
        		</SelectField>
            	<SelectField
          			value={this.state.resolution}
          			{...feildStyles}
          			onChange={(event, index, value) => this.setState({resolution:value})}
          			floatingLabelText="Wallpaper Resolution"
          			fullWidth={true}
        			>
        			{
        				this.state.resolutionOptions.map((option, idx) => {
        					idx++ // prevent value of 0
        					return <MenuItem key={idx} value={option.value} primaryText={option.text}/>;
        				})
        			}
        		</SelectField>
            	<SelectField
          			value={this.state.region}
          			onChange={(event, index, value) => this.setState({region:value})}
          			{...feildStyles}
          			floatingLabelText="Region"
          			fullWidth={true}
        			>
        			{
        				this.state.regions.map((option, idx) => {
        					idx++ // prevent value of 0
        					return <MenuItem key={idx} value={option.code} primaryText={option.text}/>;
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