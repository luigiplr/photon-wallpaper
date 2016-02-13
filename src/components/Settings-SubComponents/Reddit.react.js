import React from 'react'
import {
	SelectField, MenuItem, AutoComplete, Toggle
}
from 'material-ui'
import Redditjs from 'reddit.js'
import async from 'async'
import ThemeManager from 'material-ui/lib/styles/theme-manager'
import AppStore from '../../stores/appStore'
import AppActions from '../../actions/appActions'

class If extends React.Component {
	render() {
		return this.props.test ? this.props.children : null
	}
}

export default class Reddit extends React.Component {

	state = {
		subredditSuggestions: [],
		minimumScoreOptions: ['0', '50', '100', '200', '300', '400', '500', '1000'],
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

	updateSubredditSuggestions = async.queue((text, next) => {
		if (!text || text.length < 1) return next()

		reddit.searchSubreddits(text).fetch(res => {
			if (!res || !res.data || !res.data.children || res.data.children.length === 0) return next()
			const subredditSuggestions = res.data.children.map(child => {
				return `r/${child.data.display_name}`
			}).slice(0, 3)
			this.setState({
				subredditSuggestions
			})
			next()
		})
	});


	handleSubredditSelect(text) {
		AppActions.subredditChange((text && text.length > 0) ? text : null)
		this.setState({
			subredditSuggestions: []
		})
	}

	render() {
		const feildStyles = this.getStyle('feild')
		return (
			<div>
			    <AutoComplete
			    	floatingLabelText='Subreddit'
        			hintText='r/wallpapers'
        			filter={AutoComplete.noFilter}
        			dataSource={this.state.subredditSuggestions}
        			triggerUpdateOnFocus={true}
        			onNewRequest={subReddit => this.handleSubredditSelect(subReddit)}
        			searchText={this.state.subReddit}
        			fullWidth={true}
       				onUpdateInput={text => {
       					this.updateSubredditSuggestions.kill() 
       					this.updateSubredditSuggestions.push(text)
       				}}
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
        		<If test={this.state.sort === 'top'}>
            		<SelectField
          				value={this.state.from}
          				{...feildStyles}
          				onChange={(event, index, from) => AppActions.fromChange(from)}
          				floatingLabelText='From'
          				fullWidth={true}
        				>
        				{
        					this.state.fromOptions.map((sorter, idx) => {
        						return <MenuItem key={idx + 1} value={sorter} primaryText={sorter !== 'all' ? `Last ${sorter.charAt(0).toUpperCase() + sorter.slice(1)}` : 'All'}/>
        					})
        				}
        			</SelectField>
        		</If>
            	<SelectField
          			value={this.state.score}
          			{...feildStyles}
          			onChange={(event, index, score) => AppActions.scoreChange(score)}
          			floatingLabelText='Minimum Score'
          			fullWidth={true}
        			>
        			{
        				this.state.minimumScoreOptions.map((score, idx) => {
        					return <MenuItem key={idx + 1} value={score} primaryText={score}/>
        				})
        			}
        		</SelectField>
			    <Toggle
      				label='Filter NSFW Content'
      				defaultToggled={this.state.filterNSFW}
      				style={{fontWeight: 300, marginTop: 16}}
      				onToggle={(event, value) => AppActions.filterChange('filterNSFW', value)}
    				/>
            </div>
		)
	}
}