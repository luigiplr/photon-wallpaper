class SettingsPage extends Component {

  static childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  }

  static propTypes = {
    provider: React.PropTypes.string.isRequired,
    resolution: React.PropTypes.string.isRequired,
    syncing: React.PropTypes.bool,
    providerSettings: React.PropTypes.object.isRequired,
    updateSettings: React.PropTypes.func.isRequired
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(Themes[this.props.provider])
    }
  }

  styles = {
    feild: {
      floatingLabelStyle: {
        fontWeight: 500
      },
      style: {
        fontWeight: 300
      }
    },
    toggle: {
      fontWeight: 300,
      marginTop: 16
    }
  }

  _syncUp() {

  }

  _restoreBackup() {

  }

  renderProviderSettings() {
    const { updateSettings, provider, providerSettings } = this.props
    try {
      const ProviderSettings = eval(`${provider}Settings`)
      return <ProviderSettings updateSettings={updateSettings} {...providerSettings} styles={this.styles} />
    } catch (e) {
      return null
    }
  }

  render() {
    const { feild, toggle } = this.styles
    const { provider, resolution, autoSync, backupSet, updateSettings } = this.props
    return (
      <div className='content'>
        <SelectField
          value={provider}
          onChange={(event, index, provider) => updateSettings({provider})}
          {...feild}
          fullWidth={true}
          floatingLabelText='Wallpaper Provider'
        >
          {
            Object.keys(Providers).map((provider, idx) => {
              if(Providers[provider].disabled){
                return null
              }else{
                return <MenuItem key={idx + 1} value={provider} primaryText={provider.replace(/_/g, ' ').split(' ').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}/>
              }
            })
          }
        </SelectField>

        <SelectField
          value={resolution}
          {...feild}
          onChange={(event, index, resolution) => updateSettings({resolution})}
          floatingLabelText='Wallpaper Resolution'
          fullWidth={true}
        >
          {
            Providers[provider].resolutions.map(({value, text}, idx) => <MenuItem key={idx + 1} value={value} primaryText={text}/>)
          }
        </SelectField>

        {::this.renderProviderSettings()}

        <Toggle
          label='Auto Syncing Enabled'
          defaultToggled={autoSync}
          style={toggle}
          onToggle={(event, autoSync) => updateSettings({autoSync})}
        />
        <div>
          <RaisedButton onClick={::this._syncUp} style={{ margin: 12, float: 'right', marginLeft: 15}} label='Sync Now' />
          <RaisedButton onClick={::this._restoreBackup} label='Revert' style={{ margin: 12, float: 'right', marginRight: 0}} disabled={!backupSet} />
        </div>
      </div>
    )
  }
}
