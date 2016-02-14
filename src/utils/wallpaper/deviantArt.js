import Promise from 'bluebird'
import request from 'request'
import rss from 'rss-parser'
import {
	BrowserWindow
}
from 'remote'

const syncUpDA = ({
	resolution
}) => {
	return new Promise((resolve, reject) => {

		const catagory = 'digitalart/drawings'
		const sort = 'popular'
		const from = 'all'
		const search = 'nature'
		const url = `http://backend.deviantart.com/rss.xml?type=deviation&q=boost:${sort}+meta:${from}+in:${catagory}+${search}`

		const requestWin = new BrowserWindow({
			show: false,
			skipTaskbar: true,
			webPreferences: {
				nodeIntegration: false
			}
		})
		requestWin.loadURL(url)

		requestWin.webContents.on('did-finish-load', () => {
			console.log('RSS loaded')
			console.log(requestWin)
		})

	})
}

export default syncUpDA