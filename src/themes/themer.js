import Bing from './bing'
import Reddit from './reddit'
import DeviantArt from './deviantArt'


export default {
	getTheme(theme) {
		switch (theme) {
			case 'bing':
				return Bing
				break
			case 'reddit':
				return Reddit
				break
			case 'deviant_Art':
				return DeviantArt
				break
		}
	}
}