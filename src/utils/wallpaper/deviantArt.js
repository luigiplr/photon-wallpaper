import Promise from 'bluebird'
import request from 'request'

const tokens = ['4293', '254f7523f9a3983c16c843385e653ef8']

const syncUpDA = ({
	resolution
}) => {
	return new Promise((resolve, reject) => {
		return reject({
			open: true,
			message: 'Deviant Art Provider Not Created',
			autoHideDuration: 5000
		})
	})
}

export default syncUpDA