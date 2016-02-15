import React from 'react'
import {
	SelectField, MenuItem, RaisedButton, Toggle
}
from 'material-ui'
import isReachable from 'is-reachable'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import AppStore from '../../stores/appStore'
import AppActions from '../../actions/appActions'


export default class Bing extends React.Component {

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

		isReachable('bing.com', (err, reachable) => {
			if (!err && reachable) return
			AppActions.info({
				open: true,
				message: 'Bing unreachable',
				autoHideDuration: 5000
			})
		})
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
			default:
				return {}
		}
	}

	render() {
		const feildStyles = this.getStyle('feild')

		return (
			<div>
            	<SelectField
          			value={this.state.region}
          			onChange={(event, index, region) => AppActions.regionChange(region)}
          			{...feildStyles}
          			floatingLabelText='Region'
          			fullWidth={true}
        			>
        			{
        				this.state.regionOptions.map(({code, text}, idx) => {
        					return <MenuItem key={idx + 1} value={code} primaryText={text}/>
        				})
        			}
        		</SelectField>
            </div>
		)
	}
}