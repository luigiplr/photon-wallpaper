import alt from '../alt';
import Themer from '../themes/themer'
import AppActions from '../actions/appActions';

class AppStore {
	constructor() {
		this.bindActions(AppActions)

		this.providers = ['bing', 'reddit']
		this.provider = this.providers[0]

		this.theme = Themer.getTheme(this.provider)

		this.autoSync = true
		this.syncOptions = ['Every Hour', 'Every Day', 'Bi-Daily', 'Every Week', 'Every Month']
		this.sync = this.syncOptions[0].toLowerCase().replace(' ', '_')
	}

	onProviderChange(provider) {
		this.provider = provider
	}

	onAutoSyncChange(autoSync) {
		this.autoSync = autoSync
	}

	onSyncTimeoutChange(timeout) {
		this.sync = timeout
	}

}

export default alt.createStore(AppStore)