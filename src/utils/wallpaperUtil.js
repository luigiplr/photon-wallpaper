import Promise from 'bluebird'
import wallpaper from 'wallpaper'
import request from 'request'
import fs from 'fs'
import path from 'path'
import {
	ipcRenderer
}
from 'electron'
import {
	app
}
from 'remote';

import AppStore from '../stores/appStore'
import AppActions from '../actions/appActions'
import BingWallpaperSync from './wallpaper/bing'
import RedditWallpaperSync from './wallpaper/reddit'


const wallpaperCacheDir = path.join(app.getPath('userData'), 'wallpaper_cache')
if (!fs.existsSync(wallpaperCacheDir)) fs.mkdirSync(wallpaperCacheDir)

const setAndBackup = newPath => {
	const setWall = () => {
		console.info(`Setting Wallpaper To: ${newPath}`)
		wallpaper.set(newPath)
			.then(() => {
				AppActions.info({
					open: true,
					message: 'Wallpaper Set',
					autoHideDuration: 3000
				})
				AppActions.syncing(false)
			})
	}

	wallpaper.get()
		.then(oldWallpaperPath => {
			const backUpPath = path.join(wallpaperCacheDir, `wallpaper_backup${path.extname(oldWallpaperPath)}`)

			if (fs.existsSync(oldWallpaperPath))
				fs.createReadStream(oldWallpaperPath)
				.pipe(fs.createWriteStream(backUpPath))
				.on('finish', () => {
					AppActions.backupSet(backUpPath)
					setWall()
				})
			else
				setWall()
		})
}


const restoreBackup = () => {
	wallpaper.set(AppStore.getState().backupSet)
		.then(() => AppActions.backupSet(false))
}

const checkAndGo = imageURL => {
	if (!imageURL) return console.error('No ImageURL given; Something has gone very wrong!')

	const localPath = path.join(wallpaperCacheDir, path.basename(imageURL))

	if (!fs.existsSync(localPath))
		request
		.get(imageURL)
		.pipe(fs.createWriteStream(localPath))
		.on('finish', () => setAndBackup(localPath))
	else
		setAndBackup(localPath)
}


const syncUp = () => {
	AppActions.syncing(true)

	const state = AppStore.getState()

	switch (state.provider) {
		case 'bing':
			BingWallpaperSync(state)
				.then(checkAndGo)
				.catch(err => {
					AppActions.info(err)
					AppActions.syncing(false)
				})

			break
		case 'reddit':
			RedditWallpaperSync(state)
				.then(checkAndGo)
				.catch(err => {
					AppActions.info(err)
					AppActions.syncing(false)
				})
			break
	}
}

ipcRenderer.on('sync_wallpaper', syncUp)

export default {
	restoreBackup,
	syncUp
}