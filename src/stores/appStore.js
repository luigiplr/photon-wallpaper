import ls from 'local-storage'
import {
	v4 as uuid
}
from 'uuid'
import alt from '../alt'
import moment from 'moment'
import fs from 'fs'
import Themer from '../themes/themer'
import AppActions from '../actions/appActions'
import syncScheduler from '../utils/syncSchedulerUtil'
import providers from '../providers'


const setAnalyticsID = (id = uuid()) => {
	ls.set('analyticsID', id)
	return id
}

class AppStore {
	constructor() {
		this.bindActions(AppActions)


		/* Core Settings */

		this.analiticsID = ls.get('analyticsID') || setAnalyticsID()

		this.info = {
			open: false,
			message: ''
		}

		this.backupSet = ls.get('backupSet') && fs.existsSync(ls.get('backupSet')) ? ls.get('backupSet') : false

		this.providers = Object.keys(providers)
		this.provider = ls.get('provider') || this.providers[0]

		this.theme = Themer.getTheme(this.provider)

		this.autoSync = true
		this.sync = ls.get('sync') || 'every_day'
		this.syncing = false
		this.lastSync = ls.get('lastSync') || moment()
		this.nextSync = new syncScheduler(this.sync, this.lastSync).next

		this.resolution = ls.get('resolution') || '1920x1080'

		this.monitors = ls.get('monitors') || 1

		this.filterNSFW = ls.get('filterNSFW') || true


		/* Reddit Options */

		this.subReddit = ls.get('subReddit') || null

		this.score = ls.get('score') || '0'

		this.sortOptions = ['top', 'hot', 'new', 'controversial']
		this.sort = ls.get('sort') || this.sortOptions[0]

		this.fromOptions = ['hour', 'day', 'week', 'month', 'all']
		this.from = ls.get('from') || 'day'


		/* Bing Options */

		this.region = ls.get('region') || providers['bing'].regionOptions[0].code
	}


	/* Core */

	onInfo(info) {
		if (!info)
			return this.info = {
				open: false,
				message: ''
			}
		this.info = info
	}

	onSyncing(syncing) {
		this.syncing = syncing
	}

	onSynced() {
		this.lastSync = moment()
		this.nextSync = new syncScheduler(this.sync, this.lastSync).next
		this.syncing = false
		ls.set('lastSync', this.lastSync)
		ls.set('nextSync', this.nextSync)
	}

	onProviderChange(provider) {
		this.provider = provider
		ls.set('provider', provider)
		this.theme = Themer.getTheme(provider)
	}

	onAutoSyncChange(autoSync) {
		ls.set('autoSync', autoSync)
		this.autoSync = autoSync
	}

	onSyncTimeoutChange(sync) {
		ls.set('sync', sync)
		this.sync = sync
	}

	onResolutionChange(resolution) {
		ls.set('resolution', resolution)
		this.resolution = resolution
	}

	onMonitorChange(monitors) {
		ls.set('monitors', monitors)
		this.monitors = monitors
	}

	onBackupSet(backupSet) {
		ls.set('backupSet', backupSet)
		this.backupSet = backupSet
	}

	onFilterChange({
		filter, value
	}) {
		ls.set(filter, value)
		this[filter] = value
	}


	/* Reddit */

	onFromChange(from) {
		ls.set('from', from)
		this.from = from
	}

	onScoreChange(score) {
		ls.set('score', score)
		this.score = score
	}

	onSortChange(sort) {
		ls.set('sort', sort)
		this.sort = sort
	}

	onSubredditChange(subReddit) {
		ls.set('subReddit', subReddit)
		this.subReddit = subReddit
	}


	/* Bing */

	onRegionChange(region) {
		ls.set('region', region)
		this.region = region
	}

}

export default alt.createStore(AppStore)