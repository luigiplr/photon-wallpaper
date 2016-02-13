import ls from 'local-storage'
import alt from '../alt'
import fs from 'fs'
import Themer from '../themes/themer'
import AppActions from '../actions/appActions'



class AppStore {
	constructor() {
		this.bindActions(AppActions)


		/* Core Settings */

		this.error = {
			open: false,
			message: ''
		}

		this.backupSet = ls.get('backupSet') && fs.existsSync(ls.get('backupSet')) ? ls.get('backupSet') : false

		this.providers = ['bing', 'reddit']
		this.provider = ls.get('provider') || this.providers[0]

		this.theme = Themer.getTheme(this.provider)

		this.autoSync = true
		this.syncOptions = ['Every Hour', 'Every Day', 'Bi-Daily', 'Every Week', 'Every Month']
		this.sync = ls.get('sync') || this.syncOptions[0].toLowerCase().replace(' ', '_')

		this.resolutionOptions = {
			bing: [{
				value: '1920x1080',
				text: 'FHD (1920 × 1080)'
			}, {
				value: '1280x720',
				text: 'HD (1280 x 720)'
			}],
			reddit: [{
				value: '7680x4320',
				text: '8K UHD (7680 x 4320)'
			},{
				value: '5120x2880',
				text: '5K UHD+ (5120 x 2880)'
			}, {
				value: '3840x2160',
				text: '4K UHD+ (3840 x 2160)'
			}, {
				value: '3200x1800',
				text: 'WQXGA+ (3200 x 1800)'
			}, {
				value: '2560x1440',
				text: 'WQHD (2560 x 1440)'
			}, {
				value: '1920x1080',
				text: 'FHD (1920 × 1080)'
			}, {
				value: '1280x720',
				text: 'HD (1280 x 720)'
			}]

		}

		this.resolution = ls.get('resolution') || '1920x1080'

		this.filterNSFW = ls.get('filterNSFW') || true


		/* Reddit Options */

		this.subReddit = ls.get('subReddit') || null

		this.score = ls.get('score') || '0'

		this.sortOptions = ['top', 'hot', 'new', 'controversial']
		this.sort = ls.get('sort') || this.sortOptions[0]

		this.fromOptions = ['hour', 'day', 'week', 'month', 'all']
		this.from = ls.get('from') || 'day'


		/* Bing Options */

		this.regionOptions = [{
			code: 'en-US',
			text: 'North America',
		}, {
			code: 'zh-CN',
			text: 'Europe'
		}, {
			code: 'ja-JP',
			text: 'Asia'
		}]

		this.region = ls.get('region') || this.regionOptions[0].code
	}


	/* Core */

	onError(error) {
		if (!error)
			return this.error = {
				open: false,
				message: ''
			}
		this.error = error
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