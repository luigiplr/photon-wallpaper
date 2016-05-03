class Sidebar extends Component {

  static propTypes = {
    provider: React.PropTypes.string,
    syncing: React.PropTypes.bool
  }

  render() {
    const {provider, syncing} = this.props
    return (
      <div className={`sidebar ${provider}`}>
        <img className={`logo ${syncing ? 'fade' : ''}`} src={`images/${provider}-logo-sidebar.png`}/>
      </div>
    )
  }
}
