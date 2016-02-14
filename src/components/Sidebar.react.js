import React from 'react'
import {
	Toggle
}
from 'material-ui'
import AppStore from '../stores/appStore'


export default class Sidebar extends React.Component {
	state = AppStore.getState();

	componentDidMount() {
		AppStore.listen(this.onChange)
	}

	componentWillUnmount() {
		AppStore.unlisten(this.onChange)
	}

	onChange = () => this.setState(AppStore.getState());

	render() {
		return (
			<div className={`sidebar ${this.state.provider}`}>
            	<img className={`logo ${this.state.syncing ? 'fade' : void 0}`} src={`images/${this.state.provider}-logo-sidebar.png`}/>
            </div>
		)
	}
}