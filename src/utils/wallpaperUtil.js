import Promise from 'bluebird'
import wallpaper from 'wallpaper'
import request from 'request'
import fs from 'fs'
import path from 'path'
import {
    app
}
from 'remote';

import AppStore from '../stores/appStore'

const appUpdateDir = path.join(app.getPath('userData'), 'wallpaper_cache');

if (!fs.existsSync(appUpdateDir))
    fs.mkdirSync(appUpdateDir);

const syncUp = () => {
	const {
		provider, resolution, resolutionOptions
	} = AppStore.getState();


	switch (provider) {
		case 'bing':

			const url `http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=${AppStore.getState().region}`

			bingWallpaper({
				locale: AppStore.getState().region
			})
			break
	}
}


export default syncUp