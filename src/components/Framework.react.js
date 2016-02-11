import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import notifier from 'node-notifier'
import isOnline from 'is-online'
import path from 'path'
import Sidebar from './Sidebar.react'
import Settings from './Settings.react'


export default class Framework extends React.Component {
	componentWillMount() {
		injectTapEventPlugin()
	}
	componentDidMount() {
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
	render() {
		return (
			<div>
            	<Sidebar />
            	<Settings />
            </div>
		)
	}
}