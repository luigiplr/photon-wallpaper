class unsplashSettings extends Component {
  static propTypes = {
    styles: React.PropTypes.object.isRequired,
    updateSettings: React.PropTypes.func.isRequired,
    grayscale: React.PropTypes.bool.isRequired,
    random: React.PropTypes.bool.isRequired,
  }

  updateSetting(settings) {
    const newSettings = {}
    Object.keys(settings).map(key => newSettings[`unsplash-${key}`] = settings[key])
    this.props.updateSettings(newSettings)
  }

  render() {
    const { styles, grayscale, random } = this.props
    return (
      <div >
        <Toggle
          label='Grayscale'
          defaultToggled={grayscale}
          style={styles.toggle}
          onToggle={(event, grayscale) => this.updateSetting({grayscale})}
        />
        <Toggle
          label='Random Image'
          defaultToggled={random}
          style={styles.toggle}
          onToggle={(event, random) => this.updateSetting({random})}
        />
      </div>
    )
  }
}
