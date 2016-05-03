class Framework extends Component {

  state = {
    initializing: {
      dots: '',
      message: 'Loading Settings'
    },
    settings: {},
    providerSettings: {}
  }

  componentWillMount() {
    injectTapEventPlugin()
    this._initSettings().then(() => {
      const { settings, providerSettings } = this.settings
      if (this.mounted) {
        this.setState({ initializing: false, settings, providerSettings })
      } else {
        this.state = {
          initializing: false,
          settings,
          providerSettings
        }
      }
    })
  }

  componentDidMount() {
    this.mounted = true
    if (this.state.initializing)
      this.addDaDots()
  }

  _initSettings = () => new Promise(resolve => {
    this.settings = new Settings()
    this.settings.once('initiated', resolve)
  })

  addDaDots() {
    const loadingDotsAdder = setInterval(() => {
      if (!this.state.initializing) return clearInterval(loadingDotsAdder)
      const { dots } = this.state.initializing

      let initializingDotsNew = dots

      if (dots.length === 3)
        initializingDotsNew = ''
      else
        initializingDotsNew = initializingDotsNew + '.'

      this.setState({ initializing: Object.assign(this.state.initializing, { dots: initializingDotsNew }) })
    }, 500)
  }

  _getLoadingContents() {
    const { message, dots } = this.state.initializing
    return (
      <div className="loading-spinner-wrapper">
        <h1 className="status-text">{message + dots}</h1>
      </div>
    )
  }

  _updateSettings = settings => Promise.all(Object.keys(settings).map(key => this.settings.setSetting(key, settings[key]))).then(() => {
    const { settings, providerSettings } = this.settings
    this.setState({ settings, providerSettings })
  })

  _getAppContents() {
    const { settings, providerSettings } = this.state
    return (
      <div>
        <Sidebar {...settings} syncing={false} />
        <SettingsPage updateSettings={::this._updateSettings} {...settings} providerSettings={providerSettings} syncing={false} />
      </div>
    )
  }

  render = () => (
    <div className='app-framework'>
      {this.state.initializing ? this._getLoadingContents() : this._getAppContents()}
    </div>
  )
}
