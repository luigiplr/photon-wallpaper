import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Sidebar from './Sidebar.react'
import Settings from './Settings.react'


export default class Framework extends React.Component {

	componentWillMount() {
		injectTapEventPlugin()
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