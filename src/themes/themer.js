import Bing from './Bing'
import Reddit from './Reddit'


export default {
	getTheme(theme) {
		switch (theme) {
			case 'bing':
				return Bing
				break
			case 'reddit':
				return Reddit
				break
		}
	}
}