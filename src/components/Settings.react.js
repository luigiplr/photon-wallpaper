import React from 'react'
import {
	SelectField, MenuItem, RaisedButton, Toggle
}
from 'material-ui'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import Themer from '../themes/themer'
import wallpaperUtil from '../utils/wallpaperUtil'

import BingSettings from './Settings-SubComponents/Bing.react'
import RedditSettings from './Settings-SubComponents/Reddit.react'

import AppStore from '../stores/appStore'
import AppActions from '../actions/appActions'

import config from '../conf'


const {
	syncOptions, providers
} = config

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
		AppStore.listen(this.onChange)
	}

	componentWillUnmount() {
		AppStore.unlisten(this.onChange)
	}

	onChange = () => this.setState(AppStore.getState());

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
			default:
				return {}
		}
	}

	getSettings(provider) {
		switch (provider) {
			case 'bing':
				return <BingSettings />
				break
			case 'reddit':
				return <RedditSettings />
				break
			default:
				return null
		}
	}

	handelProviderSwitch(newProvider, oldProvider) {
		if (newProvider === oldProvider) return

		AppActions.providerChange(newProvider)
		AppActions.resolutionChange('1920x1080')
	}

	render() {
		const feildStyles = this.getStyle('feild')
		const toggleSTyle = this.getStyle('toggle')

		return (
			<div className='content'>
			    <SelectField
          			value={this.state.provider}
          			onChange={(event, index, provider) => this.handelProviderSwitch(provider, this.state.provider)}
          			{...feildStyles}
          			fullWidth={true}
          			floatingLabelText='Wallpaper Provider'
        			>
        			{
        				Object.keys(providers).map((provider, idx) => {
        					if(providers[provider].disabled) return []
        					return <MenuItem key={idx + 1} value={provider} primaryText={(provider.charAt(0).toUpperCase() + provider.slice(1)).replace('_', ' ')}/>
        				})
        			}
        		</SelectField>

        		<SelectField
          			value={this.state.resolution}
          			{...feildStyles}
          			onChange={(event, index, resolution) => AppActions.resolutionChange(resolution)}
          			floatingLabelText='Wallpaper Resolution'
          			fullWidth={true}
        			>
        			{
        				providers[this.state.provider].resolutions.map(({value, text}, idx) => {
        					return <MenuItem key={idx + 1} value={value} primaryText={text}/>
        				})
        			}
        		</SelectField>

    			<If test={providers[this.state.provider].monitorOptions && providers[this.state.provider].monitorOptions.length > 1}>
            		<SelectField
          				value={this.state.monitors}
          				onChange={(event, index, monitors) => AppActions.monitorChange(monitors)}
          				{...feildStyles}
          				fullWidth={true}
          				floatingLabelText='Monitors'
        				>
        				{
        					providers[this.state.provider].monitorOptions.map((option, idx) => {
        						return <MenuItem key={idx + 1} value={option} primaryText={option}/>
        					})
        				}
        			</SelectField>
        		</If>

        		{this.getSettings.bind(this, this.state.provider)()}
        		
			    <Toggle
      				label='Auto Syncing Enabled'
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
          				floatingLabelText='Auto Sync Wallpaper'
        				>
        				{
        					syncOptions.map((option, idx) => {
        						return <MenuItem key={idx + 1} value={option.toLowerCase().replace(' ', '_')} primaryText={option}/>
        					})
        				}
        			</SelectField>
        		</If>

        		<div>
        			<RaisedButton onClick={wallpaperUtil.syncUp} style={{ margin: 12, float: 'right', marginLeft: 15}} label='Sync Now' />
        			<RaisedButton onClick={wallpaperUtil.restoreBackup} label='Revert' style={{ margin: 12, float: 'right', marginRight: 0}} disabled={!this.state.backupSet} />
        		</div>
            </div>
		)
	}
}