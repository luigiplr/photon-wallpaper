import React from 'react'
import {
	SelectField, MenuItem, RaisedButton, Toggle
}
from 'material-ui'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import Themer from '../themes/themer'
import BingSettings from './Settings-SubComponents/Bing.react'
import AppStore from '../stores/appStore'
import AppActions from '../actions/appActions'


class If extends React.Component {
	render() {
		return this.props.test ? this.props.children : null
	}
}

export default class Settings extends React.Component {

	state = AppStore.getState();

	static childContextTypes = {
		muiTheme: React.PropTypes.object
	};

	getChildContext() {
		return {
			muiTheme: ThemeManager.getMuiTheme(this.state.theme)
		}
	}

	componentDidMount() {
		AppStore.listen(this.onChange);
	}

	componentWillUnmount() {
		AppStore.unlisten(this.onChange);
	}

	onChange = state => {
		this.setState(state)
	};

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
			case 'toggle':
				return {
					fontWeight: 300,
					marginTop: 16
				}
				break
			case 'button':
				return {
					margin: 12,
					float: 'right'
				}
				break
			default:
				return {}
		}
	}

	getSettings(provider) {
		switch (provider) {
			case 'bing':
				return <BingSettings theme={this.state.theme}/>
				break
			case 'reddit':
				break
		}
	}

	render() {
		const feildStyles = this.getStyle('feild')
		const buttonStyle = this.getStyle('button')
		const toggleSTyle = this.getStyle('toggle')

		return (
			<div className="content">
			    <SelectField
          			value={this.state.provider}
          			onChange={(event, index, provider) => AppActions.providerChange(provider)}
          			{...feildStyles}
          			fullWidth={true}
          			floatingLabelText="Wallpaper provider"
        			>
        			{
        				this.state.providers.map((provider, idx) => {
        					return <MenuItem key={idx + 1} value={provider} primaryText={provider.charAt(0).toUpperCase() + provider.slice(1)}/>;
        				})
        			}
        		</SelectField>
			    <Toggle
      				label="Auto Syning Enabled"
      				defaultToggled={this.state.autoSync}
      				style={toggleSTyle}
      				onToggle={(event, autoSync) => AppActions.autoSyncChange(autoSync)}
    				/>
    			<If test={this.state.autoSync}>
            		<SelectField
          				value={this.state.sync}
          				onChange={(event, index, timeout) => AppActions.syncTimeoutChange(timeout)}
          				{...feildStyles}
          				fullWidth={true}
          				floatingLabelText="Auto Sync Wallpaper"
        				>
        				{
        					this.state.syncOptions.map((option, idx) => {
        						return <MenuItem key={idx + 1} value={option.toLowerCase().replace(' ', '_')} primaryText={option}/>;
        					})
        				}
        			</SelectField>
        		</If>
            	{this.getSettings.bind(this, this.state.provider)()}
        		<div className="bottom">
        			<RaisedButton style={buttonStyle} label="Sync Now"/>
        		</div>
            </div>
		)
	}
}