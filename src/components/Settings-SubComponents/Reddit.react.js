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
			console.log(subredditSuggestions)
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
       				onUpdateInput={this.updateSubredditSuggestions}
       				{...feildStyles}
      				/>

            	<SelectField
          			value={this.state.sort}
          			{...feildStyles}
          			onChange={(event, index, sort) => this.setState({resolution})}
          			floatingLabelText='Sort By'
          			fullWidth={true}
        			>
        			{
        				this.state.sortOptions.map((sorter, idx) => {
        					return <MenuItem key={idx + 1} value={sorter} primaryText={sorter.charAt(0).toUpperCase() + sorter.slice(1)}/>;
        				})
        			}
        		</SelectField>
            	<SelectField
          			value={this.state.resolution}
          			{...feildStyles}
          			onChange={(event, index, resolution) => this.setState({resolution})}
          			floatingLabelText='Wallpaper Resolution'
          			fullWidth={true}
        			>
        			{
        				this.state.resolutionOptions.map(({value, text}, idx) => {
        					idx++ // prevent value of 0
        					return <MenuItem key={idx} value={value} primaryText={text}/>;
        				})
        			}
        		</SelectField>
            </div>
		)
	}
}