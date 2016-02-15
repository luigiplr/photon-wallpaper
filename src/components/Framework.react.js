import React from 'react'
import {
	Snackbar
}
from 'material-ui'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import injectTapEventPlugin from 'react-tap-event-plugin'
import notifier from 'node-notifier'
import analytics from 'universal-analytics'
import moment from 'moment'
import path from 'path'
import os from 'os'
import isOnline from 'is-online'
import packageJson from '../../package'

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
		setTimeout(this.checkSync, (60000 - moment().seconds() * 1000 + moment().milliseconds()) / 2) // Sync's the checking function with start of minute on users PC
	}

	componentDidMount() {
		AppStore.listen(this.onChange)

		analytics('UA-67206995-7', this.state.analiticsID, {
			https: true
		}).event(`APP_START_${(process.env.NODE_ENV === 'development' ? 'DEVELOPMENT' : 'RELEASE')}`, `v${packageJson.version}`, `${os.type()} : ${os.release()}`).send()

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

	checkSync = () => {

		if (moment().isSameOrAfter(this.state.nextSync) && this.state.autoSync) {

		}

		setTimeout(this.checkSync, (60000 - moment().seconds() * 1000 + moment().milliseconds()) / 2)
	};

	render() {
		return (
			<div>
            	<Sidebar />
            	<Settings />
            	<Snackbar 
            		onRequestClose={() => AppActions.info(false)}
            		{...this.state.info} />
            </div>
		)
	}
}