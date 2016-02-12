import React from 'react'
import {
	Toggle
}
from 'material-ui'
import AppStore from '../stores/appStore'

export default class Sidebar extends React.Component {

	state = {
		provider: AppStore.getState().provider
	};

	componentDidMount() {
		AppStore.listen(this.onChange);
	}

	componentWillUnmount() {
		AppStore.unlisten(this.onChange);
	}

	onChange = () => this.setState({
		provider: AppStore.getState().provider
	});

	render() {
		return (
			<div className={`sidebar ${this.state.provider}`}>
            	<img className={`${this.state.provider}-logo`} src={`images/${this.state.provider}-logo-sidebar.png`}/>
            </div>
		)
	}
}