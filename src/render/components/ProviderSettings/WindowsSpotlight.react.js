class windows_spotlightSettings extends Component {
  static propTypes = {
    styles: React.PropTypes.object.isRequired,
    updateSettings: React.PropTypes.func.isRequired,
    tag: React.PropTypes.string.isRequired,
  }

  render() {
    const { styles, tag, updateSettings } = this.props
    return (
      <div >
        <SelectField
          value={tag}
          onChange={(event, index, tag) => updateSettings({'windows_spotlight-tag': tag})}
          {...styles.feild}
          floatingLabelText='Tag'
          fullWidth={true}
        >
          {
            Providers.windows_spotlight.tagOptions.map((tag, idx) => <MenuItem key={idx + 1} value={tag} primaryText={tag.replace(/_/g, ' ').split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}/>)
          }
        </SelectField>
      </div>
    )
  }
}
