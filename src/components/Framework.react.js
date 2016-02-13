import React from 'react'
import {
	Snackbar
}
from 'material-ui'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import injectTapEventPlugin from 'react-tap-event-plugin'
import notifier from 'node-notifier'
import isOnline from 'is-online'
import path from 'path'

import Sidebar from './Sidebar.react'
import Settings from './Settings.react'

import AppStore from '../stores/appStore'
import AppActions from '../actions/appActions'


export default class Framework extends React.Component {
	state = AppStore.getState();

	static childContextTypes = {
		muiTheme: React.PropTypes.object
	};

	getChildContext() {
		return {
			muiTheme: ThemeManager.getMuiTheme(this.state.theme)
		}
	}

	componentWillMount() {
		injectTapEventPlugin()
	}

	componentDidMount() {
		AppStore.listen(this.onChange)

		isOnline((err, online) => {
			if (!err && online) return

			notifier.notify({
				title: 'No Internet Connection Detected',
				message: 'Wallpaper will be unable to sync while disconnected from the Internet',
				icon: path.join(__dirname, '../../', 'images', 'Bing-logo-blue.png'),
				sound: false,
			})
		})
	}

	componentWillUnmount() {
		AppStore.unlisten(this.onChange)
	}

	onChange = () => this.setState(AppStore.getState());

	render() {
		return (
			<div>
            	<Sidebar />
            	<Settings />
            	<Snackbar 
            		onRequestClose={() => AppActions.error(false)}
            		{...this.state.error} />
            </div>
		)
	}
}