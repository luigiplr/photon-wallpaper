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


export default class Bing extends React.Component {

	state = {
		resolution: resolutionOptions[0].value,
		region: regions[0].code,
		regions,
		resolutionOptions
	};

	static childContextTypes = {
		muiTheme: React.PropTypes.object
	};

	getChildContext() {
		return {
			muiTheme: ThemeManager.getMuiTheme(this.props.theme)
		}
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
				break
			default:
				return {}
		}
	}

	render() {
		const feildStyles = this.getStyle('feild')

		return (
			<div>
            	<SelectField
          			value={this.state.resolution}
          			{...feildStyles}
          			onChange={(event, index, resolution) => this.setState({resolution})}
          			floatingLabelText="Wallpaper Resolution"
          			fullWidth={true}
        			>
        			{
        				this.state.resolutionOptions.map(({value, text}, idx) => {
        					idx++ // prevent value of 0
        					return <MenuItem key={idx} value={value} primaryText={text}/>;
        				})
        			}
        		</SelectField>
            	<SelectField
          			value={this.state.region}
          			onChange={(event, index, region) => this.setState({region})}
          			{...feildStyles}
          			floatingLabelText="Region"
          			fullWidth={true}
        			>
        			{
        				this.state.regions.map(({code, text}, idx) => {
        					idx++ // prevent value of 0 
        					return <MenuItem key={idx} value={code} primaryText={text}/>;
        				})
        			}
        		</SelectField>
            </div>
		)
	}
}