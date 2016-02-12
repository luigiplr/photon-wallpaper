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

			request.get({
				url: `http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=${AppStore.getState().region}`,
				json: true
			}, (error, response, body) => {
				if (error || response.statusCode !== 200 || !body || !body.images || !body.images.length > 0) return

				const image = `http://www.bing.com/${body.images[0].urlbase}_${resolution.replace('_', 'x')}.jpg`

				const localPath = path.join(appUpdateDir, path.basename(image))

				if (!fs.existsSync(localPath))
					request
					.get(image)
					.pipe(fs.createWriteStream(localPath))
					.on('finish', () => wallpaper.set(localPath))
				else
					wallpaper.set(localPath)
			});

			break
	}
}


export default syncUp