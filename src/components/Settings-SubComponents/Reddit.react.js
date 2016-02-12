import React from 'react'
import {
	SelectField, MenuItem, AutoComplete
}
from 'material-ui'
import Redditjs from 'reddit.js'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import AppStore from '../../stores/appStore'
import AppActions from '../../actions/appActions'

export default class Reddit extends React.Component {

	state = {
		subredditSuggestions: [],
		...AppStore.getState()
	};

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
			default:
				return {}
		}
	}

	updateSubredditSuggestions = text => {
		reddit.searchSubreddits(text).fetch(res => {
			if (!res || !res.data || !res.data.children || res.data.children.length === 0) return
			const subredditSuggestions = res.data.children.map(child => {
				return `r/${child.data.display_name}`
			}).slice(0, 5)
			this.setState({subredditSuggestions})
		})
	};

	render() {
		const feildStyles = this.getStyle('feild')

		return (
			<div>
			    <AutoComplete
			    	floatingLabelText='Subreddit'
        			hintText='r/earthporn'
        			filter={AutoComplete.noFilter}
        			dataSource={this.state.subredditSuggestions}
        			triggerUpdateOnFocus={true}
        			defaultValue={this.state.subReddit}
        			fullWidth={true}
       				onUpdateInput={this.updateSubredditSuggestions}
       				{...feildStyles}
      				/>

            	<SelectField
          			value={this.state.sort}
          			{...feildStyles}
          			onChange={(event, index, sort) => AppActions.sortChange(sort)}
          			floatingLabelText='Sort By'
          			fullWidth={true}
        			>
        			{
        				this.state.sortOptions.map((sorter, idx) => {
        					return <MenuItem key={idx + 1} value={sorter} primaryText={sorter.charAt(0).toUpperCase() + sorter.slice(1)}/>
        				})
        			}
        		</SelectField>
            	<SelectField
          			value={this.state.from}
          			{...feildStyles}
          			onChange={(event, index, from) => AppActions.fromChange(from)}
          			floatingLabelText='From'
          			fullWidth={true}
        			>
        			{
        				this.state.fromOptions.map((sorter, idx) => {
        					return <MenuItem key={idx + 1} value={sorter} primaryText={sorter !== 'all' ? `Last ${sorter}` : 'All'}/>
        				})
        			}
        		</SelectField>
            </div>
		)
	}
}