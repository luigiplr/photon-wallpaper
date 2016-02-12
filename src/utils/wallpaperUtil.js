import Promise from 'bluebird'
import wallpaper from 'wallpaper'
import request from 'request'
import fs from 'fs'
import path from 'path'
import {
	app
}
from 'remote';

import RedditUtil from './redditUtil'
import AppStore from '../stores/appStore'
import AppActions from '../actions/appActions'



const wallpaperCacheDir = path.join(app.getPath('userData'), 'wallpaper_cache')

if (!fs.existsSync(wallpaperCacheDir))
	fs.mkdirSync(wallpaperCacheDir)


const setAndBackup = newPath => {
	wallpaper.get()
		.then(oldWallpaperPath => {
			const backUpPath = path.join(wallpaperCacheDir, `wallpaper_backup${path.extname(oldWallpaperPath)}`)

			fs.createReadStream(oldWallpaperPath)
				.pipe(fs.createWriteStream(backUpPath))
				.on('finish', () => {
					AppActions.backupSet(backUpPath)
					wallpaper.set(newPath)
				})
		})
}


const restoreBackup = () => {
	wallpaper.set(AppStore.getState().backupSet)
		.then(() => AppActions.backupSet(false))
}


const syncUp = () => {
	const state = AppStore.getState()

	const {
		provider, resolution, resolutionOptions
	} = state

	switch (provider) {
		case 'bing':
			request.get({
				url: `http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=${AppStore.getState().region}`,
				json: true
			}, (error, response, body) => {
				if (error || response.statusCode !== 200 || !body || !body.images || !body.images.length > 0) return

				const image = `http://www.bing.com/${body.images[0].urlbase}_${resolution}.jpg`
				const localPath = path.join(wallpaperCacheDir, path.basename(image))

				if (!fs.existsSync(localPath))
					request
					.get(image)
					.pipe(fs.createWriteStream(localPath))
					.on('finish', () => setAndBackup(localPath))
				else
					setAndBackup(localPath)
			});
			break
		case 'reddit':

			const options = {
				subreddits: [state.subReddit.replace('r/', '')],
				sort: state.sort,
				from: state.from,
				score: parseInt(state.score),
				domains: ['i.imgur.com', 'imgur.com'],
				types: ['png', 'jpg', 'jpeg'],
				shuffle: false,
				resolution: {
					width: resolution.split('x')[0],
					height: resolution.split('x')[1]
				}
			}

			RedditUtil(options)
				.then(link => {
					if(!link.url) return console.log('No Images Found')

					const image = link.url
					const localPath = path.join(wallpaperCacheDir, path.basename(image))

					if (!fs.existsSync(localPath))
						request
						.get(image)
						.pipe(fs.createWriteStream(localPath))
						.on('finish', () => setAndBackup(localPath))
					else
						setAndBackup(localPath)
				})
				.catch(e => console.error(e))
			break
	}
}


export default {
	restoreBackup,
	syncUp
}