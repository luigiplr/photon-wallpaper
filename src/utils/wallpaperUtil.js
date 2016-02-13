import Promise from 'bluebird'
import wallpaper from 'wallpaper'
import request from 'request'
import fs from 'fs'
import Redditjs from 'reddit.js'
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

const wallpaperCacheDir = path.join(app.getPath('userData'), 'wallpaper_cache')

if (!fs.existsSync(wallpaperCacheDir))
	fs.mkdirSync(wallpaperCacheDir)


const setAndBackup = newPath => {
	const setWall = () => {
		console.info(`Setting Wallpaper To: ${newPath}`)
		wallpaper.set(newPath)
			.then(() => {
				AppActions.error({
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


const syncUp = () => {
	AppActions.syncing(true)

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
				if (error || response.statusCode !== 200 || !body || !body.images || !body.images.length > 0) return AppActions.syncing(false)

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
			const {
				subReddit, sort, from, score, filterNSFW
			} = state

			if (!subReddit) {
				AppActions.error({
					open: true,
					message: 'SubReddit Not Set',
					autoHideDuration: 5000
				})
				return AppActions.syncing(false)
			}

			const checkRes = (resolution === 'highest' || resolution === 'lowest') ? 'override' : resolution.split('x')
			const supportedDomains = ['imgur.com']

			const supportedFileTypes = ['.png', '.jpg', '.jpeg']

			const callback = res => {
				const possibles = res.data.children.filter(({
					data
				}) => {
					if (!data) return false
					const okNSFW = !filterNSFW || filterNSFW !== data.over_18
					const passesScore = data.score >= score
					const supportedType = supportedFileTypes.includes(path.extname(data.url))
					const supportedResolution = resolution === 'override' ? true : (data.title.includes(checkRes[0]) && data.title.includes(checkRes[1]))
					return (supportedType && supportedResolution && passesScore && okNSFW)
				}).map(({
					data
				}) => data)

				if (!possibles.length > 0) {
					AppActions.error({
						open: true,
						message: 'No Images Found',
						autoHideDuration: 5000
					})
					return AppActions.syncing(false)
				}

				let image = false;

				if (checkRes === 'override') {

					const regex = /\[(\d+)\s*(x|×)\s*(\d+)\]/i
					let peak = [0, 0]

					possibles.forEach((possible, idx) => {
						if (!possible.title) return
						let test = regex.exec(possible.title)

						if (test && test[0]) {
							let num = parseInt(test[0].replace(/\D/g, ''))
							if (resolution === 'highest') {
								if (num > peak[1])
									peak = [idx, num]
							} else {
								if (peak[1] === 0 || num < peak[1])
									peak = [idx, num]
							}
						}
					})

					image = possibles[peak[0]].url
				} else {
					image = possibles[Math.floor(Math.random() * possibles.length)].url
				}

				if (!image) {
					AppActions.error({
						open: true,
						message: 'No Images Found',
						autoHideDuration: 5000
					})
					return AppActions.syncing(false)
				}

				const localPath = path.join(wallpaperCacheDir, path.basename(image))

				if (!fs.existsSync(localPath))
					request
					.get(image)
					.pipe(fs.createWriteStream(localPath))
					.on('finish', () => setAndBackup(localPath))
				else
					setAndBackup(localPath)
			}

			if (sort === 'top')
				reddit.top(subReddit.replace('r/', '')).t(from).limit(25).fetch(callback)
			else
				reddit[sort](subReddit.replace('r/', '')).limit(25).fetch(callback)
			break
	}
}

ipcRenderer.on('sync_wallpaper', syncUp)

export default {
	restoreBackup,
	syncUp
}