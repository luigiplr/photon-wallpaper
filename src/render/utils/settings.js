class Settings extends EventEmitter {
  constructor() {
    super()

    this._localforage = localforage.createInstance({ name: 'photon-wallpaper', version: 1.0 })

    this._setSettingsLoaded()
    this._loadSettings()
  }

  _loadSettings = () => _.forEach(this._defaultSettings(), (defaultValue, setting) => this._settingsLoader.push({ setting, defaultValue }))

  _setSettingsLoaded = () => this._settingsLoader.drain = () => {
    console.info('Settings initialized successfully')
    this.emit('initiated')
  }

  _settingsLoader = async.queue(({ setting, defaultValue }, next) => this._localforage.getItem(setting)
    .then(loadedSetting => {
      if (loadedSetting) {
        this[setting] = loadedSetting
        return Promise.resolve()
      } else {
        return this.setSetting(setting, defaultValue)
      }
    })
    .then(next)
    .catch(err => {
      console.error('Possible Database corruption, resetting to defaults')
      this._localforage.clear()
        .then(::this._settingsLoader.kill)
        .then(::this._setSettingsLoaded)
        .then(::this._loadSettings)
        .then(next)
    }))

  setSetting(setting, value) {
    this[setting] = value
    return this._localforage.setItem(setting, value)
  }

  get providerSettings() {
    const settings = {}
    _.forEach(this, (value, key) => {
      if (key.includes(`${this.provider}-`)) settings[key.replace(`${this.provider}-`, '')] = value
    })
    return settings
  }

  get settings() {
    const settings = {}
    _.forEach(this, (value, key) => {
      if (key.charAt(0) !== '_' && key !== 'domain')
        settings[key] = value
    })
    return settings
  }

  _defaultSettings() {
    const { bing, reddit, windows_spotlight } = Providers
    return {
      /* App */
      autoSync: true,
      autoSyncTimeout: 10000,
      resolution: '1920x1080',
      lastSync: moment().unix(),
      backupSet: false,
      provider: Object.keys(Providers)[0],
      analyticsID: uuid(),

      /* Bing */
      'bing-region': bing.regionOptions[0].code,

      /* Bing */
      'windows_spotlight-tag': windows_spotlight.tagOptions[0],

      /* Reddit */
      'reddit-score': 0,
      'reddit-sort': reddit.sortOptions[0],
      'reddit-from': 'day',
      'reddit-subreddit': 'r/wallpapers',
      'reddit-filterNSFW': true
    }
  }
}
