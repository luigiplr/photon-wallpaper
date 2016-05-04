class redditSettings extends Component {
  static propTypes = {
    styles: React.PropTypes.object.isRequired,
    updateSettings: React.PropTypes.func.isRequired,
    score: React.PropTypes.number.isRequired,
    sort: React.PropTypes.string.isRequired,
    from: React.PropTypes.string.isRequired,
    subreddit: React.PropTypes.string.isRequired
  }

  state = {
    subredditSuggestions: []
  }
  
  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  updateSettings(settings) {
    const newSettings = {}
    Object.keys(settings).map(key => newSettings[`reddit-${key}`] = settings[key])
    this.props.updateSettings(newSettings)
  }

  updateSubredditSuggestions = async.queue((text, next) => {
    if (!text || text.length < 1) return next()

    reddit.searchSubreddits(text).fetch(res => {
      if (!res || !res.data || !res.data.children || res.data.children.length === 0 || !this.mounted) return next()
      const subredditSuggestions = res.data.children.map(({ data }) => `r/${data.display_name}`).slice(0, 3)
      this.setState({ subredditSuggestions })
      next()
    })
  })

  handleSubredditSelect(subreddit = '') {
    if (!subreddit || !subreddit.length > 0) return
    this.setState({ subredditSuggestions: [] })
    this.updateSettings({ subreddit })
  }

  render() {
    const { styles, score, filterNSFW, subreddit } = this.props
    const { feild, toggle } = styles
    return (
      <div >
        <AutoComplete
          floatingLabelText='Subreddit'
          hintText='r/wallpapers'
          filter={AutoComplete.noFilter}
          dataSource={this.state.subredditSuggestions}
          openOnFocus={true}
          onNewRequest={::this.handleSubredditSelect}
          searchText={subreddit}
          fullWidth={true}
          onUpdateInput={text => {
            this.updateSubredditSuggestions.kill()
            this.updateSubredditSuggestions.push(text)
          }}
          {...feild}
        />
        <SelectField
          value={score}
          {...feild}
          onChange={(event, index, score) => this.updateSettings({score})}
          floatingLabelText='Minimum Score'
          fullWidth={true}
        >
          {
            Providers.reddit.minimumScoreOptions.map((score, idx) => <MenuItem key={idx + 1} value={score} primaryText={score.toString()}/>)
          }
        </SelectField>
        <Toggle
          label='Filter NSFW Content'
          defaultToggled={filterNSFW}
          style={toggle}
          onToggle={(event, filterNSFW) => this.updateSettings({filterNSFW})}
        />
      </div>
    )
  }
}
