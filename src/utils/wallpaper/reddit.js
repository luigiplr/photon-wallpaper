import Promise from 'bluebird'
import request from 'request'
import Redditjs from 'reddit.js'
import path from 'path'


const syncUpReddit = ({subReddit, sort, from, score, filterNSFW, resolution}) => {
	return new Promise((resolve, reject) => {

		if (!subReddit)
			return reject({
				open: true,
				message: 'SubReddit Not Set',
				autoHideDuration: 5000
			})

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

			if (!possibles.length > 0)
				return reject({
					open: true,
					message: 'No Images Found',
					autoHideDuration: 5000
				})


			let image = false;

			if (checkRes === 'override') {

				const regex = /(\d+)\s*(\W+|[A-Za-z]+)\s*(\d+)/i
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

			if (!image)
				return reject({
					open: true,
					message: 'No Images Found',
					autoHideDuration: 5000
				})

			resolve(image)
		}

		if (sort === 'top')
			reddit.top(subReddit.replace('r/', '')).t(from).limit(25).fetch(callback)
		else
			reddit[sort](subReddit.replace('r/', '')).limit(25).fetch(callback)
	})
}


export default syncUpReddit