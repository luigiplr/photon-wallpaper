import Promise from 'bluebird'
import request from 'request'

const syncUpBing = ({resolution, region}) => {
	return new Promise((resolve, reject) => {
		request.get({
			url: `http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=${region}`,
			json: true
		}, (error, response, body) => {
			if (error || response.statusCode !== 200 || !body || !body.images || !body.images.length > 0)
				return reject({
					open: true,
					message: 'Error Contacting Bing',
					autoHideDuration: 5000
				})

			resolve(`http://www.bing.com/${body.images[0].urlbase}_${resolution}.jpg`)
		})
	})
}

export default syncUpBing