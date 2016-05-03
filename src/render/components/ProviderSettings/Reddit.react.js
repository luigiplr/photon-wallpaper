class redditSettings extends Component {
  static propTypes = {
    styles: React.PropTypes.object.isRequired,
    updateSettings: React.PropTypes.func.isRequired,
    score: React.PropTypes.number.isRequired,
    sort: React.PropTypes.string.isRequired,
    from: React.PropTypes.string.isRequired,
    subreddit: React.PropTypes.string.isRequired
  }

  updateSettings(settings) {
    const newSettings = {}
    Object.keys(settings).map(key => newSettings[`reddit-${key}`] = settings[key])
    this.props.updateSettings(newSettings)
  }

  render() {
    const { styles, score } = this.props
    const { feild } = styles
    return (
      <div >
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
      </div>
    )
  }
}
