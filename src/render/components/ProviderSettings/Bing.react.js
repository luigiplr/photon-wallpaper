class BingSettings extends Component {

  static childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(Themes.bing)
    }
  }

  static propTypes = {
    styles: React.PropTypes.object.isRequired,
    updateSettings: React.PropTypes.func.isRequired
  }

  renderProviderSettings() {

  }

  render() {
    const { styles } = this.props
    return (
      <div className='content'>

      </div>
    )
  }
}
