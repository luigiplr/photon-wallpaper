class bingSettings extends Component {
  static propTypes = {
    styles: React.PropTypes.object.isRequired,
    updateSettings: React.PropTypes.func.isRequired,
    region: React.PropTypes.string.isRequired,
  }

  render() {
    const { styles, region, updateSettings } = this.props
    return (
      <div >
        <SelectField
          value={region}
          onChange={(event, index, region) => updateSettings({'bing-region': region})}
          {...styles.feild}
          floatingLabelText='Region'
          fullWidth={true}
        >
          {
            Providers.bing.regionOptions.map(({code, text}, idx) => <MenuItem key={idx + 1} value={code} primaryText={text}/>)
          }
        </SelectField>
      </div>
    )
  }
}
